import React, { useState, useEffect } from 'react';
import { AdminLayout } from '../../components/layout/AdminLayout';
import { enquiryService } from '../../services/enquiryService';
import { Enquiry, EnquiryStatus } from '../../types/enquiry';
import { useUI } from '../../hooks/useUI';
import { Button } from '../../components/common/Button';
import { formatDate } from '../../utils/formatters';
import {
  Inbox,
  Search,
  Phone,
  MessageCircle,
  Mail,
  Trash2,
  CheckCircle2,
  Clock,
  Archive
} from 'lucide-react';

export const AdminEnquiriesPage: React.FC = () => {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [isLoading, setIsLoading] = useState(true);
  const { showToast } = useUI();

  const loadEnquiries = async () => {
    setIsLoading(true);
    const data = await enquiryService.getEnquiries();
    setEnquiries(data);
    setIsLoading(false);
  };

  useEffect(() => {
    loadEnquiries();
  }, []);

  const handleStatusChange = async (id: string, status: EnquiryStatus) => {
    try {
      await enquiryService.updateEnquiryStatus(id, status);
      setEnquiries((prev) =>
        prev.map((e) => (e.id === id ? { ...e, status } : e))
      );
      showToast(`Lead status updated to ${status}`, 'success');
    } catch (err) {
      showToast('Failed to update enquiry', 'error');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await enquiryService.deleteEnquiry(id);
      setEnquiries((prev) => prev.filter((e) => e.id !== id));
      showToast('Enquiry deleted', 'info');
    } catch (err) {
      showToast('Failed to delete enquiry', 'error');
    }
  };

  const filtered = enquiries.filter((e) => {
    const matchesSearch =
      e.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.phone.includes(searchTerm) ||
      (e.message && e.message.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatus = statusFilter === 'All' || e.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <AdminLayout pageTitle="Client Enquiries & Leads">
      <div className="flex flex-col gap-6 text-left">
        
        {/* Search & Filter Bar */}
        <div className="bg-white rounded-2xl p-4 border border-stone-200/80 shadow-xs flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search leads by name, phone, message..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-stone-50 rounded-xl text-sm border border-stone-200 focus:outline-none focus:ring-2 focus:ring-[#0f383c] focus:bg-white transition-all"
            />
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 whitespace-nowrap">
              Filter by:
            </span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 bg-stone-50 rounded-xl text-sm border border-stone-200 focus:outline-none focus:ring-2 focus:ring-[#0f383c] transition-all w-full sm:w-auto"
            >
              <option value="All">All Inquiries</option>
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="Closed">Closed</option>
            </select>
          </div>
        </div>

        {/* Inquiries List */}
        <div className="bg-white rounded-3xl border border-stone-200/90 shadow-xs overflow-hidden">
          {filtered.length === 0 ? (
            <div className="py-16 text-center text-slate-500">
              <Inbox className="w-10 h-10 text-stone-300 mx-auto mb-3" />
              <p className="text-base font-bold text-slate-700">No Enquiries Found</p>
              <p className="text-xs text-slate-400 mt-1">
                Leads submitted from the website forms will show up here.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-stone-100">
              {filtered.map((enq) => {
                const digits = enq.phone.replace(/[^0-9]/g, '');
                const normalizedPhone = digits.startsWith('91') && digits.length > 10 ? digits : `91${digits.slice(-10)}`;
                const whatsappUrl = `https://wa.me/${normalizedPhone}?text=${encodeURIComponent(
                  `Hello ${enq.name}, regarding your property enquiry with Fauji Properties...`
                )}`;

                return (
                  <div
                    key={enq.id}
                    className="p-5 sm:p-6 hover:bg-stone-50/50 transition-colors flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center"
                  >
                    {/* Left: Contact info & message */}
                    <div className="flex-1 min-w-0 pr-4">
                      <div className="flex items-center gap-3 mb-1.5 flex-wrap">
                        <h4 className="text-base font-bold text-slate-900">
                          {enq.name}
                        </h4>
                        <span className="text-xs text-slate-400">·</span>
                        <span className="text-xs text-slate-500">
                          {formatDate(enq.createdAt)}
                        </span>
                        {enq.propertyTitle && (
                          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-teal-50 text-[#0f383c] border border-teal-200">
                            Re: {enq.propertyTitle}
                          </span>
                        )}
                      </div>

                      <p className="text-sm text-slate-700 leading-relaxed bg-stone-50/80 p-3 rounded-xl border border-stone-200/60 mb-3">
                        "{enq.message}"
                      </p>

                      <div className="flex items-center gap-4 text-xs text-slate-600 flex-wrap">
                        <a
                          href={`tel:${enq.phone}`}
                          className="flex items-center gap-1.5 font-bold text-slate-900 hover:text-[#0f383c]"
                        >
                          <Phone className="w-3.5 h-3.5 text-emerald-600" />
                          <span>{enq.phone}</span>
                        </a>

                        {enq.email && (
                          <a
                            href={`mailto:${enq.email}`}
                            className="flex items-center gap-1.5 hover:text-[#0f383c]"
                          >
                            <Mail className="w-3.5 h-3.5 text-slate-400" />
                            <span>{enq.email}</span>
                          </a>
                        )}

                        <span className="text-slate-400">
                          Source: {enq.source.replace('_', ' ')}
                        </span>
                      </div>
                    </div>

                    {/* Right: Actions & Status dropdown */}
                    <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 transition-colors"
                        title="Chat on WhatsApp"
                      >
                        <MessageCircle className="w-4 h-4 fill-emerald-600" />
                      </a>

                      <select
                        value={enq.status}
                        onChange={(e) => handleStatusChange(enq.id, e.target.value as EnquiryStatus)}
                        className={`text-xs font-bold px-3 py-2 rounded-xl border focus:outline-none transition-colors ${
                          enq.status === 'New'
                            ? 'bg-amber-50 text-amber-800 border-amber-200'
                            : enq.status === 'Contacted'
                            ? 'bg-teal-50 text-[#0f383c] border-teal-200'
                            : 'bg-stone-100 text-slate-600 border-stone-200'
                        }`}
                      >
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Closed">Closed</option>
                      </select>

                      <button
                        onClick={() => handleDelete(enq.id)}
                        className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                        title="Delete Lead"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

      </div>
    </AdminLayout>
  );
};
