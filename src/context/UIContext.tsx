import React, { createContext, useContext, useState } from 'react';
import { Property } from '../types/property';

export interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

interface UIContextValue {
  toasts: ToastMessage[];
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  removeToast: (id: string) => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
  isEnquiryModalOpen: boolean;
  enquiryModalProperty: Property | null;
  openEnquiryModal: (property?: Property | null) => void;
  closeEnquiryModal: () => void;
}

const UIContext = createContext<UIContextValue | undefined>(undefined);

export const UIProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState<boolean>(false);
  const [enquiryModalProperty, setEnquiryModalProperty] = useState<Property | null>(null);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const openEnquiryModal = (property: Property | null = null) => {
    setEnquiryModalProperty(property);
    setIsEnquiryModalOpen(true);
  };

  const closeEnquiryModal = () => {
    setIsEnquiryModalOpen(false);
    setEnquiryModalProperty(null);
  };

  return (
    <UIContext.Provider
      value={{
        toasts,
        showToast,
        removeToast,
        isMobileMenuOpen,
        setIsMobileMenuOpen,
        isEnquiryModalOpen,
        enquiryModalProperty,
        openEnquiryModal,
        closeEnquiryModal
      }}
    >
      {children}
    </UIContext.Provider>
  );
};

export const useUI = (): UIContextValue => {
  const context = useContext(UIContext);
  if (!context) {
    throw new Error('useUI must be used within a UIProvider');
  }
  return context;
};
