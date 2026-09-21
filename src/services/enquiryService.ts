import {
  collection,
  doc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
} from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { Enquiry, EnquiryFormData, EnquiryStatus } from '../types/enquiry';

export interface IEnquiryService {
  submitEnquiry(data: EnquiryFormData): Promise<{ success: boolean; id: string; message: string }>;
  getEnquiries(): Promise<Enquiry[]>;
  updateEnquiryStatus(id: string, status: EnquiryStatus): Promise<boolean>;
  deleteEnquiry(id: string): Promise<boolean>;
}

class FirestoreEnquiryService implements IEnquiryService {
  private collectionName = 'enquiries';

  async submitEnquiry(data: EnquiryFormData): Promise<{ success: boolean; id: string; message: string }> {
    if (!data.name || !data.phone || !data.message) {
      throw new Error('Please fill in all required fields (Name, Phone, and Message).');
    }

    const id = `enq-${Date.now().toString().slice(-6)}`;
    const now = new Date().toISOString();

    const newEnquiry: Enquiry = {
      id,
      name: data.name.trim(),
      phone: data.phone.trim(),
      message: data.message.trim(),
      status: 'New',
      source: data.source || 'homepage_contact',
      createdAt: now,
      ...(data.email?.trim() ? { email: data.email.trim() } : {}),
      ...(data.propertyId ? { propertyId: data.propertyId } : {}),
      ...(data.propertyTitle ? { propertyTitle: data.propertyTitle } : {}),
    };

    try {
      const docRef = doc(db, this.collectionName, id);
      await setDoc(docRef, newEnquiry);

      return {
        success: true,
        id,
        message: 'Thank you! Your enquiry has been received. Our team will contact you shortly.',
      };
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, `${this.collectionName}/${id}`);
    }
  }

  async getEnquiries(): Promise<Enquiry[]> {
    try {
      const collRef = collection(db, this.collectionName);
      const q = query(collRef, orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q).catch(async () => {
        // Fallback without orderBy index requirement if just created
        return await getDocs(collRef);
      });

      const list: Enquiry[] = [];
      snapshot.forEach((d) => {
        list.push({ id: d.id, ...d.data() } as Enquiry);
      });

      // Ensure sorted newest first
      list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

      return list;
    } catch (error) {
      handleFirestoreError(error, OperationType.LIST, this.collectionName);
    }
  }

  async updateEnquiryStatus(id: string, status: EnquiryStatus): Promise<boolean> {
    const docPath = `${this.collectionName}/${id}`;
    try {
      const docRef = doc(db, this.collectionName, id);
      await updateDoc(docRef, { status });
      return true;
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, docPath);
    }
  }

  async deleteEnquiry(id: string): Promise<boolean> {
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

export const enquiryService: IEnquiryService = new FirestoreEnquiryService();
