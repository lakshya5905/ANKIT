import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { BusinessSettings } from '../types/settings';
import { INITIAL_BUSINESS_SETTINGS } from '../data/mockSettings';

export interface ISettingsService {
  getSettings(): Promise<BusinessSettings>;
  updateSettings(settings: BusinessSettings): Promise<void>;
}

class FirestoreSettingsService implements ISettingsService {
  private cachedSettings: BusinessSettings | null = null;

  async getSettings(): Promise<BusinessSettings> {
    const docPath = 'settings/business_profile';
    try {
      const docRef = doc(db, 'settings', 'business_profile');
      const snap = await getDoc(docRef);

      if (snap.exists()) {
        const data = snap.data() as BusinessSettings;
        this.cachedSettings = {
          ...INITIAL_BUSINESS_SETTINGS,
          ...data,
        };
        return this.cachedSettings;
      }

      // If no settings exist yet in Firestore, return the initial default business settings
      return INITIAL_BUSINESS_SETTINGS;
    } catch (error) {
      handleFirestoreError(error, OperationType.GET, docPath);
    }
  }

  async updateSettings(settings: BusinessSettings): Promise<void> {
    const docPath = 'settings/business_profile';
    try {
      const docRef = doc(db, 'settings', 'business_profile');
      await setDoc(docRef, {
        ...settings,
        updatedAt: new Date().toISOString(),
      }, { merge: true });
      this.cachedSettings = { ...settings };
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, docPath);
    }
  }
}

export const settingsService: ISettingsService = new FirestoreSettingsService();
