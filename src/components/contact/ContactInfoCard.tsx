import React from 'react';
import { Phone, MessageCircle, Mail, MapPin, Clock, ShieldCheck } from 'lucide-react';

export const ContactInfoCard: React.FC = () => {
  const whatsappUrl =
    'https://wa.me/919896056240?text=' +
    encodeURIComponent('Hello Fauji Properties, I would like to enquire about properties in Ambala.');

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-sm text-left flex flex-col gap-6">
      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0f383c]">
        <ShieldCheck className="w-4 h-4 text-emerald-600" />
        <span>DIRECT ADVISORY DESK</span>
      </div>

      <div className="flex flex-col gap-4 divide-y divide-stone-100">
        
        {/* Call our team */}
        <div className="pt-1 flex items-start gap-4">
          <div className="w-11 h-11 rounded-2xl bg-teal-50 text-[#0f383c] flex items-center justify-center shrink-0">
            <Phone className="w-5 h-5 text-emerald-700" />
          </div>
          <div>
            <span className="block text-xs font-bold uppercase tracking-wider text-slate-400">
              Call our team
            </span>
            <a
              href="tel:+919896056240"
              className="text-base font-bold text-slate-900 hover:text-[#0f383c] transition-colors"
            >
              +91 98960 56240
            </a>
            <p className="text-xs text-slate-500 mt-0.5">Direct phone line for buyer & seller enquiries</p>
          </div>
        </div>

        {/* Message us on WhatsApp */}
        <div className="pt-4 flex items-start gap-4">
          <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
            <MessageCircle className="w-5 h-5 fill-emerald-600" />
          </div>
          <div>
            <span className="block text-xs font-bold uppercase tracking-wider text-slate-400">
              Message us on WhatsApp
            </span>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-base font-bold text-emerald-700 hover:text-emerald-800 transition-colors inline-flex items-center gap-1"
            >
              Chat with Ajit Singh
            </a>
            <p className="text-xs text-slate-500 mt-0.5">Instant response for registry queries & location pins</p>
          </div>
        </div>

        {/* Email */}
        <div className="pt-4 flex items-start gap-4">
          <div className="w-11 h-11 rounded-2xl bg-teal-50 text-[#0f383c] flex items-center justify-center shrink-0">
            <Mail className="w-5 h-5 text-[#0f383c]" />
          </div>
          <div>
            <span className="block text-xs font-bold uppercase tracking-wider text-slate-400">
              Email Address
            </span>
            <a
              href="mailto:ajitsingh5624@gmail.com"
              className="text-base font-bold text-slate-900 hover:text-[#0f383c] transition-colors break-all"
            >
              ajitsingh5624@gmail.com
            </a>
            <p className="text-xs text-slate-500 mt-0.5">Property documents & official correspondence</p>
          </div>
        </div>

        {/* Address */}
        <div className="pt-4 flex items-start gap-4">
          <div className="w-11 h-11 rounded-2xl bg-teal-50 text-[#0f383c] flex items-center justify-center shrink-0">
            <MapPin className="w-5 h-5 text-[#0f383c]" />
          </div>
          <div>
            <span className="block text-xs font-bold uppercase tracking-wider text-slate-400">
              Physical Office
            </span>
            <p className="text-base font-bold text-slate-900">
              Jaggi Garden, Ambala, Haryana, India
            </p>
            <p className="text-xs text-slate-500 mt-0.5">Easily accessible from Ambala Cantt & City</p>
          </div>
        </div>

        {/* Hours */}
        <div className="pt-4 flex items-start gap-4">
          <div className="w-11 h-11 rounded-2xl bg-teal-50 text-[#0f383c] flex items-center justify-center shrink-0">
            <Clock className="w-5 h-5 text-[#0f383c]" />
          </div>
          <div>
            <span className="block text-xs font-bold uppercase tracking-wider text-slate-400">
              Hours
            </span>
            <p className="text-sm font-bold text-slate-900">
              Monday to Saturday, 9:00 AM to 7:00 PM
            </p>
            <p className="text-xs text-slate-500 mt-0.5">Sunday by prior appointment for site visits</p>
          </div>
        </div>

      </div>
    </div>
  );
};
