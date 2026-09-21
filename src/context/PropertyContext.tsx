import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react';
import { propertyService } from '../services/propertyService';
import { Property, PropertyFilterCriteria } from '../types/property';

interface PropertyContextValue {
  properties: Property[];
  filteredProperties: Property[];
  featuredProperties: Property[];
  isLoading: boolean;
  filters: PropertyFilterCriteria;
  setFilters: React.Dispatch<React.SetStateAction<PropertyFilterCriteria>>;
  updateFilter: <K extends keyof PropertyFilterCriteria>(key: K, value: PropertyFilterCriteria[K]) => void;
  resetFilters: () => void;
  refreshProperties: () => Promise<void>;
  getPropertyById: (id: string) => Promise<Property | null>;
  createProperty: (data: Omit<Property, 'id' | 'slug' | 'createdAt' | 'updatedAt'>) => Promise<Property>;
  addProperty: (data: Omit<Property, 'id' | 'slug' | 'createdAt' | 'updatedAt'>) => Promise<Property>;
  updateProperty: (id: string, data: Partial<Property>) => Promise<Property>;
  deleteProperty: (id: string) => Promise<boolean>;
}

const defaultFilters: PropertyFilterCriteria = {
  searchQuery: '',
  location: '',
  propertyType: '',
  budgetRange: 'Any budget',
  status: '',
  sortBy: 'newest'
};

function applyPropertyFilters(properties: Property[], filters: PropertyFilterCriteria): Property[] {
  let list = [...properties];

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
}

const PropertyContext = createContext<PropertyContextValue | undefined>(undefined);

export const PropertyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [allProperties, setAllProperties] = useState<Property[]>([]);
  const [featuredProperties, setFeaturedProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [filters, setFilters] = useState<PropertyFilterCriteria>(defaultFilters);

  const fetchProperties = useCallback(async () => {
    setIsLoading(true);
    try {
      const [allList, featList] = await Promise.all([
        propertyService.getProperties(),
        propertyService.getFeaturedProperties()
      ]);
      setAllProperties(allList || []);
      setFeaturedProperties(featList || []);
    } catch (err) {
      console.error('Failed to load properties', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  const filteredProperties = useMemo(() => {
    return applyPropertyFilters(allProperties, filters);
  }, [allProperties, filters]);

  const updateFilter = useCallback(<K extends keyof PropertyFilterCriteria>(key: K, value: PropertyFilterCriteria[K]) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value
    }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(defaultFilters);
  }, []);

  const refreshProperties = useCallback(async () => {
    await fetchProperties();
  }, [fetchProperties]);

  const getPropertyById = useCallback(async (id: string): Promise<Property | null> => {
    // Check in-memory cache first
    const cached = allProperties.find((p) => p.id === id);
    if (cached) return cached;
    return await propertyService.getPropertyById(id);
  }, [allProperties]);

  const createProperty = useCallback(async (data: Omit<Property, 'id' | 'slug' | 'createdAt' | 'updatedAt'>): Promise<Property> => {
    const created = await propertyService.createProperty(data);
    await fetchProperties();
    return created;
  }, [fetchProperties]);

  const updateProperty = useCallback(async (id: string, data: Partial<Property>): Promise<Property> => {
    const updated = await propertyService.updateProperty(id, data);
    await fetchProperties();
    return updated;
  }, [fetchProperties]);

  const deleteProperty = useCallback(async (id: string): Promise<boolean> => {
    const success = await propertyService.deleteProperty(id);
    if (success) {
      await fetchProperties();
    }
    return success;
  }, [fetchProperties]);

  return (
    <PropertyContext.Provider
      value={{
        properties: allProperties,
        filteredProperties,
        featuredProperties,
        isLoading,
        filters,
        setFilters,
        updateFilter,
        resetFilters,
        refreshProperties,
        getPropertyById,
        createProperty,
        addProperty: createProperty,
        updateProperty,
        deleteProperty
      }}
    >
      {children}
    </PropertyContext.Provider>
  );
};

export const useProperties = (): PropertyContextValue => {
  const context = useContext(PropertyContext);
  if (!context) {
    throw new Error('useProperties must be used within a PropertyProvider');
  }
  return context;
};
