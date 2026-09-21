import React from 'react';
import { Property } from '../../types/property';
import { formatArea } from '../../utils/formatters';
import {
  Maximize2,
  Compass,
  Bed,
  Bath,
  Car,
  Layers,
  Ruler,
  CheckCircle2,
  MapPin
} from 'lucide-react';

interface KeySpecsListProps {
  property: Property;
}

export const KeySpecsList: React.FC<KeySpecsListProps> = ({ property }) => {
  const specs = [
    {
      label: 'Plot / Built-up Area',
      value: formatArea(property.areaSqFt),
      icon: <Maximize2 className="w-5 h-5 text-[#0f383c]" />
    },
    property.dimensions
      ? {
          label: 'Dimensions',
          value: property.dimensions,
          icon: <Ruler className="w-5 h-5 text-[#0f383c]" />
        }
      : null,
    property.facing
      ? {
          label: 'Vastu Facing',
          value: `${property.facing} Facing`,
          icon: <Compass className="w-5 h-5 text-[#0f383c]" />
        }
      : null,
    property.bedrooms !== undefined
      ? {
          label: 'Bedrooms',
          value: `${property.bedrooms} Bedrooms`,
          icon: <Bed className="w-5 h-5 text-[#0f383c]" />
        }
      : null,
    property.bathrooms !== undefined
      ? {
          label: 'Bathrooms',
          value: `${property.bathrooms} Bathrooms`,
          icon: <Bath className="w-5 h-5 text-[#0f383c]" />
        }
      : null,
    property.parkingSpaces !== undefined
      ? {
          label: 'Parking Capacity',
          value: `${property.parkingSpaces} Vehicles`,
          icon: <Car className="w-5 h-5 text-[#0f383c]" />
        }
      : null,
    property.floors !== undefined
      ? {
          label: 'Floors',
          value: `${property.floors} Storey`,
          icon: <Layers className="w-5 h-5 text-[#0f383c]" />
        }
      : null,
    {
      label: 'Location / Micro-market',
      value: `${property.location}, ${property.city}`,
      icon: <MapPin className="w-5 h-5 text-[#0f383c]" />
    }
  ].filter(Boolean);

  return (
    <div className="flex flex-col gap-6 text-left">
      {/* Grid of Key Attribute Tiles */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        {specs.map((item, idx) => (
          <div
            key={idx}
            className="p-4 rounded-2xl bg-white border border-stone-200/80 shadow-xs flex flex-col items-start"
          >
            <div className="p-2 rounded-xl bg-teal-50/80 mb-2">
              {item!.icon}
            </div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              {item!.label}
            </span>
            <span className="text-sm sm:text-base font-bold text-slate-900 mt-0.5 leading-snug">
              {item!.value}
            </span>
          </div>
        ))}
      </div>

      {/* Amenities & Highlights */}
      {property.amenities && property.amenities.length > 0 && (
        <div className="p-6 rounded-2xl bg-white border border-stone-200/80 shadow-xs">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 mb-4">
            Highlights & Amenities
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {property.amenities.map((amenity, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2.5 p-3 rounded-xl bg-[#F8F9FA] border border-stone-200/60 text-xs sm:text-sm font-medium text-slate-800"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{amenity}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
