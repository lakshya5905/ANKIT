import React, { useState, useEffect } from 'react';
import { AdminLayout } from '../../components/layout/AdminLayout';
import { settingsService } from '../../services/settingsService';
import { INITIAL_BUSINESS_SETTINGS } from '../../data/mockSettings';
import { BusinessSettings } from '../../types/settings';
import { useUI } from '../../hooks/useUI';
import { useSettings } from '../../hooks/useSettings';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { Save, ShieldCheck, Building2, Phone } from 'lucide-react';

export const AdminSettingsPage: React.FC = () => {
  const { showToast } = useUI();
  const { refreshSettings } = useSettings();
  const [settings, setSettings] = useState<BusinessSettings>(INITIAL_BUSINESS_SETTINGS);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    settingsService
      .getSettings()
      .then((data) => {
        if (isMounted) {
          setSettings(data);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.error('Failed to load settings from Firestore', err);
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await settingsService.updateSettings(settings);
      await refreshSettings();
      showToast('Settings saved successfully', 'success');
    } catch (err: any) {
      showToast(err.message || 'Failed to save settings', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <AdminLayout pageTitle="Business & Website Settings">
      <form onSubmit={handleSave} className="flex flex-col gap-8 text-left max-w-4xl pb-16">
        
        {/* Card 1: Brand & Identity */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-xs flex flex-col gap-5">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0f383c] pb-3 border-b border-stone-100">
            <Building2 className="w-4 h-4" />
            <span>Brand Identity</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Input
              label="Business Name"
              value={settings.businessName}
              onChange={(e) => setSettings({ ...settings, businessName: e.target.value })}
              required
            />

            <Input
              label="Tagline"
              value={settings.tagline}
              onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
              required
            />
          </div>
        </div>

        {/* Card 2: Contact Information */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-xs flex flex-col gap-5">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0f383c] pb-3 border-b border-stone-100">
            <Phone className="w-4 h-4" />
            <span>Contact Information</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Input
              label="Primary Phone Number"
              value={settings.phone}
              onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
              required
            />

            <Input
              label="WhatsApp Contact Number"
              value={settings.whatsapp}
              onChange={(e) => setSettings({ ...settings, whatsapp: e.target.value })}
              required
            />

            <Input
              label="Public Email Address"
              type="email"
              value={settings.email}
              onChange={(e) => setSettings({ ...settings, email: e.target.value })}
              required
            />

            <Input
              label="Business Hours"
              value={settings.businessHours}
              onChange={(e) => setSettings({ ...settings, businessHours: e.target.value })}
              required
            />
          </div>
        </div>

        {/* Card 3: Physical Address */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-xs flex flex-col gap-5">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0f383c] pb-3 border-b border-stone-100">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Office Location</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div className="sm:col-span-3">
              <Input
                label="Office Address"
                value={settings.address}
                onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                required
              />
            </div>

            <Input
              label="City"
              value={settings.city}
              onChange={(e) => setSettings({ ...settings, city: e.target.value })}
              required
            />

            <Input
              label="State"
              value={settings.state}
              onChange={(e) => setSettings({ ...settings, state: e.target.value })}
              required
            />

            <Input
              label="Country"
              value={settings.country}
              onChange={(e) => setSettings({ ...settings, country: e.target.value })}
              required
            />
          </div>
        </div>

        {/* Action Button */}
        <div className="flex justify-end pt-2">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            isLoading={isSaving}
            leftIcon={<Save className="w-4 h-4 mr-1 text-emerald-400" />}
          >
            Save Settings
          </Button>
        </div>

      </form>
    </AdminLayout>
  );
};
