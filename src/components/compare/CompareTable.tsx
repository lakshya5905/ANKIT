import React from 'react';
import { Property } from '../../types/property';
import { useCompare } from '../../hooks/useCompare';
import { useNavigate } from '../../routes/router';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { formatPrice, formatArea } from '../../utils/formatters';
import { X, Check, ArrowRight, Home } from 'lucide-react';

interface CompareTableProps {
  properties: Property[];
}

export const CompareTable: React.FC<CompareTableProps> = ({ properties }) => {
  const { removeFromCompare, clearCompare } = useCompare();
  const navigate = useNavigate();

  if (properties.length === 0) {
    return (
      <div className="bg-white rounded-3xl p-12 text-center border border-stone-200/80 shadow-xs max-w-xl mx-auto my-12">
        <div className="w-16 h-16 rounded-full bg-teal-50 text-[#0f383c] flex items-center justify-center mx-auto mb-4">
          <Home className="w-8 h-8 text-emerald-700" />
        </div>
        <h3 className="text-xl font-bold text-[#0f383c] mb-2">
          No Properties Selected for Comparison
        </h3>
        <p className="text-sm text-slate-600 mb-6 leading-relaxed">
          Browse our listings in Jaggi Garden and Ambala, then click the "Compare" button on any property card to view them side by side.
        </p>
        <Button
          variant="primary"
          size="lg"
          onClick={() => navigate('/properties')}
          rightIcon={<ArrowRight className="w-4 h-4 ml-1" />}
        >
          Explore Properties
        </Button>
      </div>
    );
  }

  const rows = [
    {
      label: 'Price',
      render: (p: Property) => (
        <span className="text-lg font-extrabold text-[#0f383c]">
          {formatPrice(p.price)}
        </span>
      )
    },
    {
      label: 'Price Guidance',
      render: (p: Property) => <span className="text-xs text-slate-500 font-medium">{p.priceDisplay}</span>
    },
    {
      label: 'Property Type',
      render: (p: Property) => (
        <span className="inline-block px-2.5 py-1 rounded-md text-xs font-semibold bg-stone-100 text-slate-800">
          {p.propertyType}
        </span>
      )
    },
    {
      label: 'Status',
      render: (p: Property) => <Badge status={p.status} />
    },
    {
      label: 'Location',
      render: (p: Property) => (
        <span className="text-sm font-semibold text-slate-800">
          {p.location}, {p.city}
        </span>
      )
    },
    {
      label: 'Area (Sq.Ft / Gaj)',
      render: (p: Property) => (
        <span className="text-sm font-bold text-slate-900">
          {formatArea(p.areaSqFt)}
        </span>
      )
    },
    {
      label: 'Approx. Rate / Sq.Ft',
      render: (p: Property) => {
        const rate = Math.round(p.price / p.areaSqFt);
        return <span className="text-sm text-slate-700">₹{rate.toLocaleString('en-IN')} / sq.ft</span>;
      }
    },
    {
      label: 'Dimensions',
      render: (p: Property) => <span className="text-sm text-slate-700">{p.dimensions || '—'}</span>
    },
    {
      label: 'Facing Direction',
      render: (p: Property) => (
        <span className="text-sm text-slate-700">
          {p.facing ? `${p.facing} Facing` : '—'}
        </span>
      )
    },
    {
      label: 'Bedrooms',
      render: (p: Property) => <span className="text-sm text-slate-700">{p.bedrooms ? `${p.bedrooms} BHK` : 'N/A (Plot)'}</span>
    },
    {
      label: 'Bathrooms',
      render: (p: Property) => <span className="text-sm text-slate-700">{p.bathrooms ? `${p.bathrooms} Baths` : '—'}</span>
    },
    {
      label: 'Parking',
      render: (p: Property) => (
        <span className="text-sm text-slate-700">
          {p.parkingSpaces ? `${p.parkingSpaces} Vehicles` : '—'}
        </span>
      )
    },
    {
      label: 'Key Amenities',
      render: (p: Property) => (
        <div className="flex flex-col gap-1 text-xs text-left">
          {p.amenities?.slice(0, 4).map((a, i) => (
            <div key={i} className="flex items-center gap-1.5 text-slate-700">
              <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>{a}</span>
            </div>
          )) || '—'}
        </div>
      )
    }
  ];

  return (
    <div className="w-full bg-white rounded-3xl border border-stone-200/90 shadow-xs overflow-hidden">
      {/* Top action bar */}
      <div className="p-4 sm:p-6 bg-stone-50/80 border-b border-stone-200/70 flex items-center justify-between">
        <div className="text-left">
          <h2 className="text-base font-bold text-slate-900">
            Comparing {properties.length} {properties.length === 1 ? 'Property' : 'Properties'}
          </h2>
          <p className="text-xs text-slate-500">Side-by-side specification and pricing comparison</p>
        </div>

        <button
          onClick={clearCompare}
          className="text-xs font-semibold text-rose-700 hover:text-rose-800 transition-colors px-3 py-1.5 rounded-lg border border-rose-200 hover:bg-rose-50"
        >
          Clear All
        </button>
      </div>

      {/* Overflow wrapper for mobile/tablet horizontal scroll */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[700px]">
          <thead>
            <tr className="border-b border-stone-200 bg-[#FBFBF9]">
              <th className="p-4 sm:p-5 w-44 sm:w-56 text-xs uppercase font-bold text-slate-400">
                Property Listing
              </th>
              {properties.map((property) => {
                const coverImg = property.images[0]?.url;
                return (
                  <th key={property.id} className="p-4 sm:p-5 min-w-[220px] align-top">
                    <div className="flex flex-col gap-2">
                      <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-stone-100 mb-1">
                        <img
                          src={coverImg}
                          alt={property.title}
                          className="w-full h-full object-cover"
                        />
                        <button
                          onClick={() => removeFromCompare(property.id)}
                          className="absolute top-2 right-2 p-1.5 rounded-full bg-black/60 text-white hover:bg-rose-600 transition-colors"
                          title="Remove from comparison"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <h4 className="text-sm font-bold text-slate-900 line-clamp-1">
                        {property.title}
                      </h4>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigate(`/properties/${property.id}`)}
                        className="w-full text-xs font-semibold mt-1"
                      >
                        View Details
                      </Button>
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>

          <tbody className="divide-y divide-stone-100">
            {rows.map((row, idx) => (
              <tr
                key={idx}
                className={idx % 2 === 0 ? 'bg-white' : 'bg-[#FAFBFB]'}
              >
                <td className="p-4 sm:p-5 text-xs font-bold uppercase tracking-wider text-slate-500 bg-stone-50/50">
                  {row.label}
                </td>
                {properties.map((property) => (
                  <td key={property.id} className="p-4 sm:p-5 align-middle">
                    {row.render(property)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
