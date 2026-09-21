import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  writeBatch,
} from 'firebase/firestore';
import { db, auth, handleFirestoreError, OperationType } from '../lib/firebase';
import { INITIAL_MOCK_PROPERTIES } from '../data/mockProperties';
import { Property, PropertyFilterCriteria } from '../types/property';
import { slugify } from '../utils/slugify';

export interface IPropertyService {
  getProperties(filters?: PropertyFilterCriteria): Promise<Property[]>;
  getPropertyById(id: string): Promise<Property | null>;
  getPropertyBySlug(slug: string): Promise<Property | null>;
  getFeaturedProperties(): Promise<Property[]>;
  createProperty(propertyData: Omit<Property, 'id' | 'slug' | 'createdAt' | 'updatedAt'>): Promise<Property>;
  updateProperty(id: string, propertyData: Partial<Property>): Promise<Property>;
  deleteProperty(id: string): Promise<boolean>;
  seedInitialDataIfEmpty(): Promise<void>;
}

class FirestorePropertyService implements IPropertyService {
  private collectionName = 'properties';
  private hasCheckedInitialSeed = false;

  async seedInitialDataIfEmpty(): Promise<void> {
    if (this.hasCheckedInitialSeed) return;
    if (!auth.currentUser) return; // Only authenticated admin can write to Firestore

    try {
      const collRef = collection(db, this.collectionName);
      const snapshot = await getDocs(collRef);

      if (snapshot.empty) {
        // Seed initial rich Ambala properties into Firestore
        const batch = writeBatch(db);
        for (const prop of INITIAL_MOCK_PROPERTIES) {
          const docRef = doc(db, this.collectionName, prop.id);
          batch.set(docRef, {
            ...prop,
            createdAt: prop.createdAt || new Date().toISOString(),
            updatedAt: prop.updatedAt || new Date().toISOString(),
          });
        }
        await batch.commit();
      }
      this.hasCheckedInitialSeed = true;
    } catch (error) {
      console.warn('Initial properties seed check skipped or handled:', error);
    }
  }

  async getProperties(filters?: PropertyFilterCriteria): Promise<Property[]> {
    try {
      const collRef = collection(db, this.collectionName);
      const snapshot = await getDocs(collRef);

      let list: Property[] = [];

      if (!snapshot.empty) {
        snapshot.forEach((d) => {
          list.push({ id: d.id, ...d.data() } as Property);
        });
      } else {
        // Fallback for public preview if Firestore was just provisioned and unseeded
        list = [...INITIAL_MOCK_PROPERTIES];
      }

      if (!filters) {
        list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        return list;
      }

      if (filters.searchQuery) {
        const q = filters.searchQuery.toLowerCase().trim();
        list = list.filter(
          (p) =>
            p.title.toLowerCase().includes(q) ||
            p.location.toLowerCase().includes(q) ||
            p.city.toLowerCase().includes(q) ||
            p.description.toLowerCase().includes(q) ||
            p.propertyType.toLowerCase().includes(q)
        );
      }

      if (filters.location && filters.location !== 'All' && filters.location.trim() !== '') {
        const loc = filters.location.toLowerCase().trim();
        list = list.filter(
          (p) =>
            p.location.toLowerCase().includes(loc) ||
            p.city.toLowerCase().includes(loc)
        );
      }

      if (filters.propertyType && (filters.propertyType as string) !== 'Any type' && (filters.propertyType as string) !== '') {
        list = list.filter((p) => p.propertyType === filters.propertyType);
      }

      if (filters.status && (filters.status as string) !== 'All' && (filters.status as string) !== '') {
        list = list.filter((p) => p.status === filters.status);
      }

      if (filters.minPrice !== undefined && filters.minPrice > 0) {
        list = list.filter((p) => p.price >= (filters.minPrice ?? 0));
      }

      if (filters.maxPrice !== undefined && filters.maxPrice > 0) {
        list = list.filter((p) => p.price <= (filters.maxPrice ?? Infinity));
      }

      if (filters.budgetRange && filters.budgetRange !== 'Any budget') {
        if (filters.budgetRange === 'under-50l') {
          list = list.filter((p) => p.price < 5000000);
        } else if (filters.budgetRange === '50l-1cr') {
          list = list.filter((p) => p.price >= 5000000 && p.price <= 10000000);
        } else if (filters.budgetRange === 'above-1cr') {
          list = list.filter((p) => p.price > 10000000);
        }
      }

      if (filters.minBedrooms && filters.minBedrooms > 0) {
        list = list.filter((p) => (p.bedrooms ?? 0) >= (filters.minBedrooms ?? 0));
      }

      if (filters.facing && (filters.facing as string) !== 'Any' && (filters.facing as string) !== '') {
        list = list.filter((p) => p.facing === filters.facing);
      }

      if (filters.sortBy) {
        switch (filters.sortBy) {
          case 'price-asc':
            list.sort((a, b) => a.price - b.price);
            break;
          case 'price-desc':
            list.sort((a, b) => b.price - a.price);
            break;
          case 'area-asc':
            list.sort((a, b) => a.areaSqFt - b.areaSqFt);
            break;
          case 'area-desc':
            list.sort((a, b) => b.areaSqFt - a.areaSqFt);
            break;
          case 'newest':
          default:
            list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
            break;
        }
      } else {
        list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      }

      return list;
    } catch (error) {
      handleFirestoreError(error, OperationType.LIST, this.collectionName);
    }
  }

  async getPropertyById(id: string): Promise<Property | null> {
    const docPath = `${this.collectionName}/${id}`;
    try {
      const docRef = doc(db, this.collectionName, id);
      const snap = await getDoc(docRef);

      if (snap.exists()) {
        return { id: snap.id, ...snap.data() } as Property;
      }

      // Check fallback mock data for seamless experience
      const foundMock = INITIAL_MOCK_PROPERTIES.find((p) => p.id === id);
      return foundMock ? { ...foundMock } : null;
    } catch (error) {
      handleFirestoreError(error, OperationType.GET, docPath);
    }
  }

  async getPropertyBySlug(slug: string): Promise<Property | null> {
    try {
      const all = await this.getProperties();
      const found = all.find((p) => p.slug === slug);
      return found ? { ...found } : null;
    } catch (error) {
      handleFirestoreError(error, OperationType.GET, `${this.collectionName}?slug=${slug}`);
    }
  }

  async getFeaturedProperties(): Promise<Property[]> {
    try {
      const all = await this.getProperties();
      return all.filter((p) => p.featured);
    } catch (error) {
      handleFirestoreError(error, OperationType.LIST, `${this.collectionName}/featured`);
    }
  }

  async createProperty(
    propertyData: Omit<Property, 'id' | 'slug' | 'createdAt' | 'updatedAt'>
  ): Promise<Property> {
    const id = `fp-${Date.now().toString().slice(-6)}`;
    const slug = `${slugify(propertyData.title)}-${id}`;
    const now = new Date().toISOString();

    const newProperty: Property = {
      ...propertyData,
      id,
      slug,
      createdAt: now,
      updatedAt: now,
      createdById: auth.currentUser?.uid || 'admin',
    };

    const docPath = `${this.collectionName}/${id}`;
    try {
      const docRef = doc(db, this.collectionName, id);
      await setDoc(docRef, newProperty);
      return newProperty;
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, docPath);
    }
  }

  async updateProperty(id: string, propertyData: Partial<Property>): Promise<Property> {
    const docPath = `${this.collectionName}/${id}`;
    try {
      const current = await this.getPropertyById(id);
      if (!current) {
        throw new Error(`Property with id ${id} not found.`);
      }

      const updatedSlug =
        propertyData.title && propertyData.title !== current.title
          ? `${slugify(propertyData.title)}-${id}`
          : current.slug;

      const updated: Property = {
        ...current,
        ...propertyData,
        id,
        slug: updatedSlug,
        updatedAt: new Date().toISOString(),
      };

      const docRef = doc(db, this.collectionName, id);
      await updateDoc(docRef, {
        ...propertyData,
        slug: updatedSlug,
        updatedAt: updated.updatedAt,
      });

      return updated;
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, docPath);
    }
  }

  async deleteProperty(id: string): Promise<boolean> {
    const docPath = `${this.collectionName}/${id}`;
    try {
      const docRef = doc(db, this.collectionName, id);
      await deleteDoc(docRef);
      return true;
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, docPath);
    }
  }
}

export const propertyService: IPropertyService = new FirestorePropertyService();
