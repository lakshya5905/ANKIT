import React, { createContext, useContext, useEffect, useState } from 'react';
import { Property } from '../types/property';

interface CompareContextValue {
  compareList: Property[];
  addToCompare: (property: Property) => boolean;
  removeFromCompare: (id: string) => void;
  isInCompare: (id: string) => boolean;
  clearCompare: () => void;
  canAddMore: boolean;
}

const STORAGE_KEY = 'fauji_compare_list';
const MAX_COMPARE = 3;

const CompareContext = createContext<CompareContextValue | undefined>(undefined);

export const CompareProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [compareList, setCompareList] = useState<Property[]>(() => {
    try {
      const stored = sessionStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(compareList));
    } catch (e) {
      console.warn('Failed to persist compareList to sessionStorage', e);
    }
  }, [compareList]);

  const addToCompare = (property: Property): boolean => {
    if (compareList.some((p) => p.id === property.id)) {
      return true;
    }
    if (compareList.length >= MAX_COMPARE) {
      return false;
    }
    setCompareList((prev) => [...prev, property]);
    return true;
  };

  const removeFromCompare = (id: string) => {
    setCompareList((prev) => prev.filter((p) => p.id !== id));
  };

  const isInCompare = (id: string): boolean => {
    return compareList.some((p) => p.id === id);
  };

  const clearCompare = () => {
    setCompareList([]);
  };

  return (
    <CompareContext.Provider
      value={{
        compareList,
        addToCompare,
        removeFromCompare,
        isInCompare,
        clearCompare,
        canAddMore: compareList.length < MAX_COMPARE
      }}
    >
      {children}
    </CompareContext.Provider>
  );
};

export const useCompare = (): CompareContextValue => {
  const context = useContext(CompareContext);
  if (!context) {
    throw new Error('useCompare must be used within a CompareProvider');
  }
  return context;
};
