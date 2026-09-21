import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { settingsService } from '../services/settingsService';
import { BusinessSettings } from '../types/settings';
import { INITIAL_BUSINESS_SETTINGS } from '../data/mockSettings';

interface SettingsContextValue {
  settings: BusinessSettings;
  isLoading: boolean;
  updateSettings: (newSettings: BusinessSettings) => Promise<void>;
  refreshSettings: () => Promise<void>;
}

const SettingsContext = createContext<SettingsContextValue | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<BusinessSettings>(INITIAL_BUSINESS_SETTINGS);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchSettings = useCallback(async () => {
    try {
      const data = await settingsService.getSettings();
      if (data) {
        setSettings(data);
      }
    } catch (err) {
      console.warn('Failed to load business settings from Firestore, using defaults:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  const updateSettings = useCallback(async (newSettings: BusinessSettings) => {
    await settingsService.updateSettings(newSettings);
    setSettings(newSettings);
  }, []);

  const refreshSettings = useCallback(async () => {
    await fetchSettings();
  }, [fetchSettings]);

  return (
    <SettingsContext.Provider
      value={{
        settings,
        isLoading,
        updateSettings,
        refreshSettings,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = (): SettingsContextValue => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};
