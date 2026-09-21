import React from 'react';
import { Property } from '../../types/property';
import { Link, useNavigate } from '../../routes/router';
import { useCompare } from '../../hooks/useCompare';
import { useUI } from '../../hooks/useUI';
import { Badge } from '../common/Badge';
import { formatPrice, formatArea } from '../../utils/formatters';
import { MapPin, Bed, Bath, Compass, Maximize2, Scale, Check, ArrowRight } from 'lucide-react';

interface PropertyCardProps {
  property: Property;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const navigate = useNavigate();
  const { addToCompare, removeFromCompare, isInCompare, canAddMore } = useCompare();
  const { showToast } = useUI();

  const isCompared = isInCompare(property.id);
  const coverImage = property.images.find((img) => img.isCover) || property.images[0];

  const handleCompareClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    if (isCompared) {
      removeFromCompare(property.id);
      showToast('Removed from comparison', 'info');
    } else {
      if (!canAddMore) {
        showToast('You can compare up to 3 properties at a time', 'error');
        return;
      }
      addToCompare(property);
      showToast('Added to comparison matrix', 'success');
    }
  };

  return (
    <div
      onClick={() => navigate(`/properties/${property.id}`)}
      className="group cursor-pointer bg-white rounded-2xl border border-stone-200/80 overflow-hidden shadow-xs hover:shadow-xl hover:border-teal-900/20 transition-all duration-300 flex flex-col h-full"
    >
      {/* Thumbnail Container */}
      <div className="relative aspect-[16/10] overflow-hidden bg-stone-100">
        <img
          src={coverImage?.url || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80'}
          alt={coverImage?.altText || property.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        {/* Gradient scrim for top badges readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <Badge status={property.status} />
            {property.featured && (
              <span className="bg-[#0f383c] text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md shadow-xs">
                Featured
              </span>
            )}
          </div>

          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-md bg-white/90 text-slate-800 backdrop-blur-xs shadow-xs">
            {property.propertyType}
          </span>
        </div>

        {/* Quick Compare Overlay Button */}
        <button
          onClick={handleCompareClick}
          className={`absolute bottom-3 right-3 z-10 inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all shadow-md ${
            isCompared
              ? 'bg-[#0f383c] text-white'
              : 'bg-white/95 text-slate-800 hover:bg-[#0f383c] hover:text-white'
          }`}
          title={isCompared ? 'Remove from compare' : 'Add to compare'}
        >
          {isCompared ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span>Compared</span>
            </>
          ) : (
            <>
              <Scale className="w-3.5 h-3.5" />
              <span>Compare</span>
            </>
          )}
        </button>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1 text-left">
        {/* Price & Location */}
        <div className="flex items-baseline justify-between gap-2 mb-2">
          <span className="text-xl sm:text-2xl font-extrabold text-[#0f383c] tracking-tight">
            {formatPrice(property.price)}
          </span>
          <span className="text-xs text-slate-500 font-medium truncate max-w-[150px]">
            {property.priceDisplay}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-base font-bold text-slate-900 group-hover:text-[#0f383c] transition-colors line-clamp-1 mb-1.5">
          {property.title}
        </h3>

        {/* Location snippet */}
        <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-4">
          <MapPin className="w-3.5 h-3.5 text-[#0f383c] shrink-0" />
          <span className="truncate">{property.location}, {property.city}</span>
        </div>

        {/* Specifications Grid */}
        <div className="grid grid-cols-2 gap-2 pt-3 border-t border-stone-100 text-xs text-slate-600 mb-4">
          <div className="flex items-center gap-1.5">
            <Maximize2 className="w-3.5 h-3.5 text-[#0f383c]/70 shrink-0" />
            <span className="truncate">{formatArea(property.areaSqFt)}</span>
          </div>

          {property.facing && (
            <div className="flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-[#0f383c]/70 shrink-0" />
              <span>{property.facing} Facing</span>
            </div>
          )}

          {property.bedrooms !== undefined && (
            <div className="flex items-center gap-1.5">
              <Bed className="w-3.5 h-3.5 text-[#0f383c]/70 shrink-0" />
              <span>{property.bedrooms} Bedrooms</span>
            </div>
          )}

          {property.bathrooms !== undefined && (
            <div className="flex items-center gap-1.5">
              <Bath className="w-3.5 h-3.5 text-[#0f383c]/70 shrink-0" />
              <span>{property.bathrooms} Baths</span>
            </div>
          )}
        </div>

        {/* Card Footer Action */}
        <div className="mt-auto pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-semibold text-[#0f383c]">
          <span>View Property Details</span>
          <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </div>
  );
};
