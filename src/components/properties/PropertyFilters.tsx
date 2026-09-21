import React from 'react';
import { useProperties } from '../../hooks/useProperties';
import { PropertyType, FacingDirection } from '../../types/property';
import { Button } from '../common/Button';
import { Search, RotateCcw, Filter } from 'lucide-react';

interface PropertyFiltersProps {
  totalResults: number;
}

export const PropertyFilters: React.FC<PropertyFiltersProps> = ({ totalResults }) => {
  const { filters, setFilters, resetFilters } = useProperties();

  const propertyTypes: (PropertyType | 'Any type')[] = [
    'Any type',
    'Residential Plot',
    'Commercial Plot',
    'Independent House',
    'Villa',
    'Apartment',
    'Agricultural Land'
  ];

  const budgetOptions = [
    { value: 'Any budget', label: 'Any budget' },
    { value: 'under-50l', label: 'Under ₹50 Lakh' },
    { value: '50l-1cr', label: '₹50 Lakh – ₹1 Crore' },
    { value: 'above-1cr', label: 'Above ₹1 Crore' }
  ];

  const facingOptions: (FacingDirection | 'Any')[] = [
    'Any',
    'East',
    'North',
    'North-East',
    'West',
    'South',
    'North-West',
    'South-East',
    'South-West'
  ];

  return (
    <div className="bg-white rounded-2xl border border-stone-200/90 p-5 sm:p-6 shadow-xs text-left mb-8">
      {/* Header with Results Count & Reset */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-stone-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#0f383c]/10 text-[#0f383c] flex items-center justify-center">
            <Filter className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 leading-tight">
              Filter Properties
            </h3>
            <span className="text-xs text-slate-500 font-medium">
              Showing {totalResults} matching {totalResults === 1 ? 'listing' : 'listings'}
            </span>
          </div>
        </div>

        <button
          onClick={resetFilters}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-[#0f383c] transition-colors self-start sm:self-auto"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Filters</span>
        </button>
      </div>

      {/* Filter Inputs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-5">
        
        {/* Search Query */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
            Search Keyword
          </label>
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="e.g. Jaggi Garden, Plot, 3 BHK..."
              value={filters.searchQuery || ''}
              onChange={(e) => setFilters((prev) => ({ ...prev, searchQuery: e.target.value }))}
              className="w-full pl-9 pr-3 py-2.5 bg-[#F8F9FA] rounded-xl text-sm border border-stone-200 focus:outline-none focus:ring-2 focus:ring-[#0f383c] focus:bg-white transition-all"
            />
          </div>
        </div>

        {/* Property Type */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
            Property Type
          </label>
          <select
            value={filters.propertyType || 'Any type'}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                propertyType: e.target.value === 'Any type' ? '' : (e.target.value as PropertyType)
              }))
            }
            className="w-full px-3 py-2.5 bg-[#F8F9FA] rounded-xl text-sm border border-stone-200 focus:outline-none focus:ring-2 focus:ring-[#0f383c] focus:bg-white transition-all"
          >
            {propertyTypes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        {/* Budget */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
            Budget
          </label>
          <select
            value={filters.budgetRange || 'Any budget'}
            onChange={(e) => setFilters((prev) => ({ ...prev, budgetRange: e.target.value }))}
            className="w-full px-3 py-2.5 bg-[#F8F9FA] rounded-xl text-sm border border-stone-200 focus:outline-none focus:ring-2 focus:ring-[#0f383c] focus:bg-white transition-all"
          >
            {budgetOptions.map((b) => (
              <option key={b.value} value={b.value}>
                {b.label}
              </option>
            ))}
          </select>
        </div>

        {/* Facing Direction */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
            Facing Direction
          </label>
          <select
            value={filters.facing || 'Any'}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                facing: e.target.value === 'Any' ? '' : (e.target.value as FacingDirection)
              }))
            }
            className="w-full px-3 py-2.5 bg-[#F8F9FA] rounded-xl text-sm border border-stone-200 focus:outline-none focus:ring-2 focus:ring-[#0f383c] focus:bg-white transition-all"
          >
            {facingOptions.map((f) => (
              <option key={f} value={f}>
                {f === 'Any' ? 'Any Facing' : `${f} Facing`}
              </option>
            ))}
          </select>
        </div>

      </div>

      {/* Second Row: Bedrooms & Sorting */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 mt-2 border-t border-stone-100">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
            Minimum Bedrooms
          </label>
          <div className="flex gap-1.5">
            {[0, 2, 3, 4].map((beds) => {
              const selected = (filters.minBedrooms || 0) === beds;
              return (
                <button
                  key={beds}
                  type="button"
                  onClick={() => setFilters((prev) => ({ ...prev, minBedrooms: beds }))}
                  className={`flex-1 py-2 text-xs font-semibold rounded-lg border transition-all ${
                    selected
                      ? 'bg-[#0f383c] text-white border-[#0f383c]'
                      : 'bg-[#F8F9FA] text-slate-700 border-stone-200 hover:bg-stone-100'
                  }`}
                >
                  {beds === 0 ? 'Any' : `${beds}+`}
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
            Availability Status
          </label>
          <select
            value={filters.status || 'All'}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                status: e.target.value === 'All' ? '' : (e.target.value as any)
              }))
            }
            className="w-full px-3 py-2 bg-[#F8F9FA] rounded-xl text-sm border border-stone-200 focus:outline-none focus:ring-2 focus:ring-[#0f383c] focus:bg-white transition-all"
          >
            <option value="All">All Statuses</option>
            <option value="Available">Available</option>
            <option value="Under Offer">Under Offer</option>
            <option value="Sold">Sold</option>
          </select>
        </div>

        <div className="sm:col-span-2">
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
            Sort Listings By
          </label>
          <select
            value={filters.sortBy || 'newest'}
            onChange={(e) => setFilters((prev) => ({ ...prev, sortBy: e.target.value as any }))}
            className="w-full px-3 py-2 bg-[#F8F9FA] rounded-xl text-sm border border-stone-200 focus:outline-none focus:ring-2 focus:ring-[#0f383c] focus:bg-white transition-all"
          >
            <option value="newest">Newest First</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="area-asc">Area: Small to Large</option>
            <option value="area-desc">Area: Large to Small</option>
          </select>
        </div>
      </div>
    </div>
  );
};
