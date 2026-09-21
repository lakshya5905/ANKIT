import React, { useState } from 'react';
import { useNavigate } from '../../routes/router';
import { useProperties } from '../../hooks/useProperties';
import { Button } from '../common/Button';
import { MapPin, Home, IndianRupee, Search } from 'lucide-react';
import { PropertyType } from '../../types/property';

export const SearchFilterBar: React.FC = () => {
  const navigate = useNavigate();
  const { filters, setFilters } = useProperties();

  const [location, setLocation] = useState(filters.location || '');
  const [propertyType, setPropertyType] = useState<PropertyType | 'Any type'>(
    (filters.propertyType as PropertyType) || 'Any type'
  );
  const [budgetRange, setBudgetRange] = useState(filters.budgetRange || 'Any budget');

  const propertyTypes = [
    { value: 'Any type', label: 'Any type' },
    { value: 'Residential Plot', label: 'Residential Plot' },
    { value: 'Commercial Plot', label: 'Commercial Plot' },
    { value: 'Independent House', label: 'Independent House' },
    { value: 'Villa', label: 'Villa' },
    { value: 'Apartment', label: 'Apartment' }
  ];

  const budgetOptions = [
    { value: 'Any budget', label: 'Any budget' },
    { value: 'under-50l', label: 'Under ₹50 Lakh' },
    { value: '50l-1cr', label: '₹50 Lakh – ₹1 Crore' },
    { value: 'above-1cr', label: 'Above ₹1 Crore' }
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setFilters((prev) => ({
      ...prev,
      location,
      propertyType: propertyType === 'Any type' ? '' : propertyType,
      budgetRange: budgetRange
    }));
    navigate('/properties');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
      <div className="bg-white rounded-3xl p-4 sm:p-5 shadow-[0_10px_35px_-8px_rgba(0,0,0,0.07)] border border-stone-200/90">
        <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 lg:gap-4 items-end">
          
          {/* Field 1: Location */}
          <div className="lg:col-span-4 text-left">
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5 ml-1">
              Location
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <MapPin className="w-4 h-4 text-[#0f383c]" />
              </div>
              <input
                type="text"
                placeholder="City or area"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-[#F8F9FA] rounded-xl text-sm text-slate-900 placeholder:text-slate-400 border border-stone-200/80 focus:outline-none focus:ring-2 focus:ring-[#0f383c] focus:bg-white transition-all"
              />
            </div>
          </div>

          {/* Field 2: Property Type */}
          <div className="lg:col-span-3 text-left">
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5 ml-1">
              Property type
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Home className="w-4 h-4 text-[#0f383c]" />
              </div>
              <select
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value as any)}
                className="w-full pl-10 pr-8 py-3 bg-[#F8F9FA] rounded-xl text-sm text-slate-900 border border-stone-200/80 focus:outline-none focus:ring-2 focus:ring-[#0f383c] focus:bg-white transition-all appearance-none cursor-pointer"
              >
                {propertyTypes.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Field 3: Budget */}
          <div className="lg:col-span-3 text-left">
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5 ml-1">
              Budget
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <IndianRupee className="w-4 h-4 text-[#0f383c]" />
              </div>
              <select
                value={budgetRange}
                onChange={(e) => setBudgetRange(e.target.value)}
                className="w-full pl-10 pr-8 py-3 bg-[#F8F9FA] rounded-xl text-sm text-slate-900 border border-stone-200/80 focus:outline-none focus:ring-2 focus:ring-[#0f383c] focus:bg-white transition-all appearance-none cursor-pointer"
              >
                {budgetOptions.map((b) => (
                  <option key={b.value} value={b.value}>
                    {b.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Action Button: Search */}
          <div className="lg:col-span-2">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full py-3 h-[46px]"
              leftIcon={<Search className="w-4 h-4 mr-1 text-emerald-400" />}
            >
              Search
            </Button>
          </div>

        </form>
      </div>
    </div>
  );
};
