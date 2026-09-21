import React from 'react';
import { useCompare } from '../hooks/useCompare';
import { CompareTable } from '../components/compare/CompareTable';
import { Button } from '../components/common/Button';
import { useNavigate } from '../routes/router';
import { Scale, ArrowLeft } from 'lucide-react';

export const ComparePage: React.FC = () => {
  const { compareList } = useCompare();
  const navigate = useNavigate();

  return (
    <div className="py-10 sm:py-14 bg-[#F8F9FA] min-h-[80vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 text-left">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#0f383c] mb-2">
              <Scale className="w-3.5 h-3.5 text-emerald-600" />
              <span>DECISION MATRIX</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0f383c]">
              Compare Properties
            </h1>
            <p className="text-sm sm:text-base text-slate-600 mt-1 max-w-xl">
              Evaluate pricing, square footage, dimensions, vastu facing, and amenities side-by-side to make the most confident decision.
            </p>
          </div>

          <Button
            variant="outline"
            size="md"
            onClick={() => navigate('/properties')}
            leftIcon={<ArrowLeft className="w-4 h-4 mr-1" />}
            className="self-start sm:self-auto"
          >
            Browse More Listings
          </Button>
        </div>

        {/* Compare Table */}
        <CompareTable properties={compareList} />

      </div>
    </div>
  );
};
