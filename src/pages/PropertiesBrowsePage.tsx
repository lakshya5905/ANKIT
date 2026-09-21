import React from 'react';
import { useProperties } from '../hooks/useProperties';
import { PropertyFilters } from '../components/properties/PropertyFilters';
import { PropertyCard } from '../components/properties/PropertyCard';
import { Button } from '../components/common/Button';
import { Property } from '../types/property';
import { Building, RotateCcw } from 'lucide-react';

export const PropertiesBrowsePage: React.FC = () => {
  const { filteredProperties, isLoading, resetFilters } = useProperties();

  return (
    <div className="py-10 sm:py-14 bg-[#F8F9FA] min-h-[80vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-left mb-8">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#0f383c] mb-2">
            <span>VERIFIED PORTFOLIO</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0f383c]">
            Properties in Ambala
          </h1>
          <p className="text-sm sm:text-base text-slate-600 mt-1 max-w-2xl">
            Explore residential plots, independent homes, villas, and commercial land with verified ownership in Jaggi Garden and surrounding sectors.
          </p>
        </div>

        {/* Filters Component */}
        <PropertyFilters totalResults={filteredProperties.length} />

        {/* Property Grid / Empty State */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-stone-200 p-4 h-96 animate-pulse"
              />
            ))}
          </div>
        ) : filteredProperties.length === 0 ? (
          <div className="bg-white rounded-3xl border border-stone-200/90 p-12 text-center max-w-lg mx-auto my-12 shadow-xs">
            <div className="w-16 h-16 rounded-full bg-teal-50 text-[#0f383c] flex items-center justify-center mx-auto mb-4">
              <Building className="w-8 h-8 text-emerald-700" />
            </div>
            <h3 className="text-xl font-bold text-[#0f383c] mb-2">
              No Properties Match Your Filter
            </h3>
            <p className="text-sm text-slate-600 mb-6 leading-relaxed">
              Try adjusting your budget range, property type, or clearing keyword search to view available listings.
            </p>
            <Button
              variant="primary"
              size="md"
              onClick={resetFilters}
              leftIcon={<RotateCcw className="w-4 h-4 mr-1 text-emerald-400" />}
            >
              Reset All Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
