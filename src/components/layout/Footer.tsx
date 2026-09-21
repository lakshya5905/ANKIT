import React from 'react';
import { Link } from '../../routes/router';
import { Mail, MapPin, Clock, ArrowUpRight, Lock } from 'lucide-react';
import { useSettings } from '../../hooks/useSettings';

export const Footer: React.FC = () => {
  const { settings } = useSettings();

  return (
    <footer className="bg-[#0b2b2e] text-stone-200 border-t border-teal-950 relative overflow-hidden">
      {/* Subtle background glow effect */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16 pb-12 border-b border-teal-900/60">
          
          {/* Column 1: Brand & Tagline */}
          <div className="flex flex-col gap-4">
            <Link to="/" className="flex items-center gap-3">
              <img
                src="https://res.cloudinary.com/c3jvvveh/image/upload/v1789923920/fauji-properties-logo.png"
                alt="Fauji Properties"
                className="h-10 w-auto object-contain shrink-0"
                referrerPolicy="no-referrer"
              />
              <span className="text-xl font-bold tracking-tight text-white">
                {settings.businessName || 'Fauji Properties'}
              </span>
            </Link>
            <p className="text-sm text-stone-300/80 leading-relaxed max-w-sm">
              {settings.tagline || 'Trusted property guidance for homes, plots, and investments in Ambala and beyond.'}
            </p>
            <div className="pt-2">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-teal-900/40 border border-teal-800/60 text-xs text-emerald-300 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Verified Local Real Estate Advisors
              </span>
            </div>
          </div>

          {/* Column 2: Visit or Call */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs uppercase tracking-wider font-bold text-emerald-400/90 mb-1">
              Visit or call
            </h4>
            <div className="flex items-start gap-2.5 text-sm text-stone-200">
              <Mail className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <a
                href={`mailto:${settings.email || 'ajitsingh5624@gmail.com'}`}
                className="hover:text-emerald-300 transition-colors"
              >
                {settings.email || 'ajitsingh5624@gmail.com'}
              </a>
            </div>
            <div className="flex items-start gap-2.5 text-sm text-stone-200">
              <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>{settings.address ? `${settings.address}, ${settings.city}, ${settings.state}, ${settings.country}` : 'Jaggi Garden, Ambala, Haryana, India'}</span>
            </div>
            <div className="pt-2">
              <Link
                to="/contact"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                <span>Get directions & full office details</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Column 3: Business Hours & Links */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs uppercase tracking-wider font-bold text-emerald-400/90 mb-1">
              Business hours
            </h4>
            <div className="flex items-center gap-2.5 text-sm text-stone-200">
              <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{settings.businessHours || 'All Days (9:00 AM to 8:00 PM)'}</span>
            </div>

            <div className="pt-4 flex flex-col gap-2.5">
              <Link
                to="/contact"
                className="text-sm text-stone-300 hover:text-emerald-300 transition-colors w-fit"
              >
                Contact us
              </Link>
              <Link
                to="/admin/login"
                className="inline-flex items-center gap-1.5 text-sm text-stone-400 hover:text-stone-200 transition-colors w-fit pt-1"
              >
                <Lock className="w-3.5 h-3.5 text-stone-400" />
                <span>Admin login</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Divider & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <p>© Copyright 2026 Fauji Properties. All rights reserved.</p>
          <p className="flex items-center gap-4">
            <Link to="/about" className="hover:text-stone-200 transition-colors">
              About Us
            </Link>
            <span>·</span>
            <Link to="/properties" className="hover:text-stone-200 transition-colors">
              Featured Listings
            </Link>
            <span>·</span>
            <Link to="/compare" className="hover:text-stone-200 transition-colors">
              Compare
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};
