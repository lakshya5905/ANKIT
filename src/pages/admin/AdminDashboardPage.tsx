import React, { useEffect, useState } from 'react';
import { AdminLayout } from '../../components/layout/AdminLayout';
import { useProperties } from '../../hooks/useProperties';
import { enquiryService } from '../../services/enquiryService';
import { propertyService } from '../../services/propertyService';
import { Enquiry } from '../../types/enquiry';
import { useNavigate, Link } from '../../routes/router';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { formatPrice } from '../../utils/formatters';
import {
  Building,
  CheckCircle,
  Inbox,
  Sparkles,
  Plus,
  ArrowRight,
  Clock,
  UserCheck
} from 'lucide-react';

export const AdminDashboardPage: React.FC = () => {
  const { properties, refreshProperties } = useProperties();
  const navigate = useNavigate();
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);

  useEffect(() => {
    propertyService.seedInitialDataIfEmpty()
      .then(() => refreshProperties())
      .catch(() => {});
    enquiryService.getEnquiries().then(setEnquiries).catch((err) => {
      console.error('Failed to load enquiries:', err);
    });
  }, [refreshProperties]);

  const totalCount = properties.length;
  const availableCount = properties.filter((p) => p.status === 'Available').length;
  const underOfferCount = properties.filter((p) => p.status === 'Under Offer').length;
  const newEnquiriesCount = enquiries.filter((e) => e.status === 'New').length;

  return (
    <AdminLayout
      pageTitle="Admin Overview"
      actionButton={
        <Button
          variant="primary"
          size="sm"
          onClick={() => navigate('/admin/properties/new')}
          leftIcon={<Plus className="w-4 h-4 mr-1 text-emerald-400" />}
        >
          Add Property
        </Button>
      }
    >
      <div className="flex flex-col gap-8 text-left">
        
        {/* KPI Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-stone-200/80 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-teal-50 text-[#0f383c] flex items-center justify-center shrink-0">
              <Building className="w-6 h-6 text-emerald-700" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Total Listings
              </span>
              <div className="text-2xl sm:text-3xl font-extrabold text-[#0f383c] mt-0.5">
                {totalCount}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-stone-200/80 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
              <CheckCircle className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Available Now
              </span>
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-700 mt-0.5">
                {availableCount}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-stone-200/80 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
              <Clock className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Under Offer
              </span>
              <div className="text-2xl sm:text-3xl font-extrabold text-amber-700 mt-0.5">
                {underOfferCount}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-stone-200/80 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#0f383c]/10 text-[#0f383c] flex items-center justify-center shrink-0">
              <Inbox className="w-6 h-6 text-[#0f383c]" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                New Enquiries
              </span>
              <div className="text-2xl sm:text-3xl font-extrabold text-[#0f383c] mt-0.5">
                {newEnquiriesCount}
              </div>
            </div>
          </div>
        </div>

        {/* Two Column Layout: Recent Listings & Recent Enquiries */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Recent Listings (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-stone-200/80 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-stone-100 mb-4">
                <div>
                  <h3 className="text-base font-bold text-slate-900">Recent Listings</h3>
                  <p className="text-xs text-slate-500">Live portfolio properties</p>
                </div>
                <Link
                  to="/admin/properties"
                  className="text-xs font-bold text-[#0f383c] hover:underline inline-flex items-center gap-1"
                >
                  <span>View All</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="divide-y divide-stone-100">
                {properties.slice(0, 4).map((p) => {
                  const coverImg = p.images[0]?.url;
                  return (
                    <div key={p.id} className="py-3.5 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <img
                          src={coverImg}
                          alt={p.title}
                          className="w-12 h-12 rounded-xl object-cover shrink-0 bg-stone-100"
                        />
                        <div className="min-w-0">
                          <h4 className="text-sm font-bold text-slate-900 truncate">
                            {p.title}
                          </h4>
                          <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                            <span>{p.location}</span>
                            <span>·</span>
                            <span className="font-semibold text-slate-700">{formatPrice(p.price)}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <Badge status={p.status} />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => navigate(`/admin/properties/${p.id}/edit`)}
                          className="text-xs py-1 px-2.5"
                        >
                          Edit
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="pt-4 mt-2 border-t border-stone-100">
              <Button
                variant="secondary"
                size="sm"
                className="w-full"
                onClick={() => navigate('/admin/properties/new')}
                leftIcon={<Plus className="w-4 h-4 mr-1 text-[#0f383c]" />}
              >
                Publish Another Listing
              </Button>
            </div>
          </div>

          {/* Recent Enquiries (5 cols) */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-stone-200/80 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-stone-100 mb-4">
                <div>
                  <h3 className="text-base font-bold text-slate-900">Latest Leads</h3>
                  <p className="text-xs text-slate-500">Prospective buyer messages</p>
                </div>
                <Link
                  to="/admin/enquiries"
                  className="text-xs font-bold text-[#0f383c] hover:underline inline-flex items-center gap-1"
                >
                  <span>All Leads</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="divide-y divide-stone-100">
                {enquiries.slice(0, 4).map((enq) => (
                  <div key={enq.id} className="py-3 flex flex-col gap-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-900 flex items-center gap-1.5">
                        <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
                        {enq.name}
                      </span>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-stone-100 text-slate-700">
                        {enq.status}
                      </span>
                    </div>

                    <div className="text-xs text-slate-600 font-mono">
                      {enq.phone}
                    </div>

                    <p className="text-xs text-slate-500 line-clamp-1 italic mt-0.5">
                      "{enq.message}"
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 mt-2 border-t border-stone-100">
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={() => navigate('/admin/enquiries')}
              >
                Review & Manage Enquiries
              </Button>
            </div>
          </div>

        </div>

      </div>
    </AdminLayout>
  );
};
