import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
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

const PropertyContext = createContext<PropertyContextValue | undefined>(undefined);

export const PropertyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [allProperties, setAllProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [featuredProperties, setFeaturedProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [filters, setFilters] = useState<PropertyFilterCriteria>(defaultFilters);

  const fetchProperties = useCallback(async () => {
    setIsLoading(true);
    try {
      const [allList, filteredList, featList] = await Promise.all([
        propertyService.getProperties(),
        propertyService.getProperties(filters),
        propertyService.getFeaturedProperties()
      ]);
      setAllProperties(allList);
      setFilteredProperties(filteredList);
      setFeaturedProperties(featList);
    } catch (err) {
      console.error('Failed to load properties', err);
    } finally {
      setIsLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  const updateFilter = <K extends keyof PropertyFilterCriteria>(key: K, value: PropertyFilterCriteria[K]) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value
    }));
  };

  const resetFilters = () => {
    setFilters(defaultFilters);
  };

  const refreshProperties = async () => {
    await fetchProperties();
  };

  const getPropertyById = async (id: string): Promise<Property | null> => {
    // Check in-memory cache first
    const cached = allProperties.find((p) => p.id === id);
    if (cached) return cached;
    return await propertyService.getPropertyById(id);
  };

  const createProperty = async (data: Omit<Property, 'id' | 'slug' | 'createdAt' | 'updatedAt'>): Promise<Property> => {
    const created = await propertyService.createProperty(data);
    await fetchProperties();
    return created;
  };

  const updateProperty = async (id: string, data: Partial<Property>): Promise<Property> => {
    const updated = await propertyService.updateProperty(id, data);
    await fetchProperties();
    return updated;
  };

  const deleteProperty = async (id: string): Promise<boolean> => {
    const success = await propertyService.deleteProperty(id);
    if (success) {
      await fetchProperties();
    }
    return success;
  };

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
