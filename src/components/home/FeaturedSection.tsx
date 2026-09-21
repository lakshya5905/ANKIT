import React from 'react';
import { useProperties } from '../../hooks/useProperties';
import { PropertyCard } from '../properties/PropertyCard';
import { Button } from '../common/Button';
import { useNavigate } from '../../routes/router';
import { ArrowRight, Sparkles } from 'lucide-react';

export const FeaturedSection: React.FC = () => {
  const navigate = useNavigate();
  const { featuredProperties, isLoading } = useProperties();

  return (
    <section className="py-16 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 text-left">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#0f383c] mb-2">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>HANDPICKED IN AMBALA</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#0f383c]">
              Featured Properties
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-1.5 max-w-xl">
              Carefully verified listings in Jaggi Garden and high-growth sectors with clear titles.
            </p>
          </div>

          <Button
            variant="outline"
            size="md"
            onClick={() => navigate('/properties')}
            rightIcon={<ArrowRight className="w-4 h-4 ml-1" />}
            className="self-start sm:self-auto shrink-0"
          >
            View All Properties
          </Button>
        </div>

        {/* Listings Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="bg-white rounded-2xl border border-stone-200/80 p-4 h-96 animate-pulse flex flex-col gap-4"
              >
                <div className="bg-stone-200 rounded-xl h-48 w-full" />
                <div className="h-6 bg-stone-200 rounded w-1/3" />
                <div className="h-4 bg-stone-200 rounded w-3/4" />
                <div className="h-4 bg-stone-200 rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {featuredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
