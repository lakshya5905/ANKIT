import React, { useEffect, useState } from 'react';
import { useRouteParams, Link, useNavigate } from '../routes/router';
import { useProperties } from '../hooks/useProperties';
import { useSettings } from '../hooks/useSettings';
import { useCompare } from '../hooks/useCompare';
import { useUI } from '../hooks/useUI';
import { Property } from '../types/property';
import { PropertyGallery } from '../components/properties/PropertyGallery';
import { KeySpecsList } from '../components/properties/KeySpecsList';
import { PropertyCard } from '../components/properties/PropertyCard';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { formatPrice } from '../utils/formatters';
import {
  MapPin,
  Scale,
  Check,
  Phone,
  MessageCircle,
  ArrowLeft,
  Share2,
  Calendar,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

export const PropertyDetailPage: React.FC = () => {
  const { id } = useRouteParams();
  const navigate = useNavigate();
  const { properties, getPropertyById } = useProperties();
  const { settings } = useSettings();
  const { addToCompare, removeFromCompare, isInCompare, canAddMore } = useCompare();
  const { openEnquiryModal, showToast } = useUI();

  const [property, setProperty] = useState<Property | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    if (id) {
      setIsLoading(true);
      getPropertyById(id).then((found) => {
        if (!isMounted) return;
        setProperty(found || null);
        setIsLoading(false);
      });
      window.scrollTo(0, 0);
    }
    return () => {
      isMounted = false;
    };
  }, [id, getPropertyById]);

  if (isLoading) {
    return (
      <div className="py-20 text-center max-w-7xl mx-auto px-4">
        <div className="h-96 rounded-3xl bg-stone-100 animate-pulse" />
      </div>
    );
  }

  if (!property) {
    return (
      <div className="py-24 text-center max-w-lg mx-auto px-4">
        <h2 className="text-2xl font-bold text-[#0f383c] mb-2">Property Not Found</h2>
        <p className="text-sm text-slate-600 mb-6">
          The property listing you are looking for might have been sold or removed.
        </p>
        <Button variant="primary" size="md" onClick={() => navigate('/properties')}>
          Back to Listings
        </Button>
      </div>
    );
  }

  const isCompared = isInCompare(property.id);

  const handleCompareToggle = () => {
    if (isCompared) {
      removeFromCompare(property.id);
      showToast('Removed from compare list', 'info');
    } else {
      if (!canAddMore) {
        showToast('You can compare up to 3 properties at a time', 'error');
        return;
      }
      addToCompare(property);
      showToast('Added to compare list', 'success');
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: property.title,
        text: `Check out ${property.title} in Ambala on Fauji Properties`,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Property link copied to clipboard!', 'success');
    }
  };

  const whatsappMessage = encodeURIComponent(
    `Hello ${settings.businessName || 'Fauji Properties'}, I am interested in "${property.title}" (Ref: ${property.id}). Please share site visit schedule.`
  );
  const whatsappUrl = `https://wa.me/${settings.whatsapp || '919896056240'}?text=${whatsappMessage}`;

  const similarProperties = properties
    .filter((p: Property) => p.id !== property.id && (p.propertyType === property.propertyType || p.city === property.city))
    .slice(0, 3);

  return (
    <div className="py-8 sm:py-12 bg-[#F8F9FA] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6 overflow-x-auto whitespace-nowrap py-1">
          <Link to="/" className="hover:text-[#0f383c] transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link to="/properties" className="hover:text-[#0f383c] transition-colors">Properties</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-800 font-semibold truncate max-w-[240px] sm:max-w-md">{property.title}</span>
        </nav>

        {/* Top Header Row */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 pb-6 border-b border-stone-200/80 mb-6 text-left">
          <div>
            <div className="flex items-center gap-2.5 mb-2.5 flex-wrap">
              <Badge status={property.status} />
              <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-stone-100 text-slate-800 border border-stone-200">
                {property.propertyType}
              </span>
              {property.featured && (
                <span className="bg-[#0f383c] text-white text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-md">
                  Featured Choice
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
              {property.title}
            </h1>

            <div className="flex items-center gap-2 text-sm text-slate-600 mt-2">
              <MapPin className="w-4 h-4 text-[#0f383c] shrink-0" />
              <span>{property.location}, {property.city}, Haryana</span>
            </div>
          </div>

          {/* Price & Action Buttons */}
          <div className="flex flex-col sm:items-end gap-2 shrink-0">
            <div className="text-2xl sm:text-3xl font-extrabold text-[#0f383c] tracking-tight">
              {formatPrice(property.price)}
            </div>
            <div className="text-xs text-slate-500 font-medium">
              {property.priceDisplay}
            </div>

            <div className="flex items-center gap-2 pt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleCompareToggle}
                leftIcon={
                  isCompared ? (
                    <Check className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Scale className="w-4 h-4 text-[#0f383c]" />
                  )
                }
              >
                {isCompared ? 'Compared' : 'Add to Compare'}
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={handleShare}
                leftIcon={<Share2 className="w-4 h-4 text-slate-600" />}
              >
                Share
              </Button>
            </div>
          </div>
        </div>

        {/* Main 2-Column Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left / Main Column: Gallery & Details (8 Cols) */}
          <div className="lg:col-span-8 flex flex-col gap-8 text-left">
            {/* Gallery */}
            <PropertyGallery images={property.images} title={property.title} />

            {/* Key Specifications & Amenities List */}
            <KeySpecsList property={property} />

            {/* Description Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-xs">
              <h2 className="text-lg font-bold text-slate-900 mb-4 pb-3 border-b border-stone-100">
                Property Overview & Neighborhood
              </h2>
              <div className="prose prose-slate max-w-none text-sm sm:text-base text-slate-600 leading-relaxed whitespace-pre-line">
                {property.description}
              </div>

              {/* Verified badge footer */}
              <div className="mt-8 pt-6 border-t border-stone-100 flex items-center gap-3 text-xs text-slate-500">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>
                  Physical inspection verified by Fauji Properties. Revenue records, road width, and registry documents checked.
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Sticky Contact & Schedule Visit Card (4 Cols) */}
          <div className="lg:col-span-4 sticky top-24 flex flex-col gap-6">
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200/90 shadow-md text-left">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#0f383c] flex items-center justify-center text-white font-bold">
                  FP
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 leading-tight">
                    Ajit Singh / Advisory Desk
                  </h3>
                  <p className="text-xs text-emerald-600 font-semibold">Available for On-Site Visit</p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#F8F9FA] border border-stone-200/60 mb-5">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Guaranteed Dealing</div>
                <div className="text-xs text-slate-700 mt-1 font-medium leading-relaxed">
                  No hidden brokerage surprises. Direct negotiation support and prompt legal registry guidance.
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full"
                  onClick={() => openEnquiryModal(property)}
                  leftIcon={<Phone className="w-4 h-4 mr-1 text-emerald-400" />}
                >
                  Enquire About Property
                </Button>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl text-sm font-bold bg-[#25D366] hover:bg-[#20ba5a] text-white shadow-xs transition-colors"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Chat on WhatsApp</span>
                </a>

                <a
                  href={`tel:${settings.phone || '+919896056240'}`}
                  className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-slate-700 bg-stone-100 hover:bg-stone-200 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-slate-600" />
                  <span>Direct Call ({settings.phone || '+91 98960 56240'})</span>
                </a>
              </div>
            </div>

            {/* Quick Micro Info Card */}
            <div className="p-5 rounded-2xl bg-[#EEF4F2] border border-teal-900/10 text-left">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#0f383c] mb-1">
                Office Location
              </h4>
              <p className="text-xs text-slate-700 leading-snug">
                {settings.address ? `${settings.address}, ${settings.city}, ${settings.state}, ${settings.country}` : 'Jaggi Garden, Ambala, Haryana, India'}. Open all 7 days for accompanied property tours.
              </p>
            </div>
          </div>

        </div>

        {/* Similar Properties Section */}
        {similarProperties.length > 0 && (
          <div className="mt-16 pt-12 border-t border-stone-200 text-left">
            <h2 className="text-2xl font-bold tracking-tight text-[#0f383c] mb-6">
              Similar Listings in Ambala
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {similarProperties.map((p: Property) => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
