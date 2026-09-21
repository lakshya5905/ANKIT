import React, { useState } from 'react';
import { Link, useLocation } from '../../routes/router';
import { Button } from '../common/Button';
import { useCompare } from '../../hooks/useCompare';
import { useUI } from '../../hooks/useUI';
import { Menu, X, PhoneCall } from 'lucide-react';

export const Header: React.FC = () => {
  const { pathname } = useLocation();
  const { compareList } = useCompare();
  const { openEnquiryModal } = useUI();
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const navLinks = [
    { label: 'Home', to: '/' },
    { label: 'Properties', to: '/properties' },
    { label: 'Compare', to: '/compare', badge: compareList.length > 0 ? compareList.length : undefined },
    { label: 'About Us', to: '/about' },
    { label: 'Contact', to: '/contact' }
  ];

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-stone-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[74px] flex items-center justify-between">
        {/* Left: Brand Logo & Title */}
        <Link to="/" className="flex items-center gap-3 group">
          <img
            src="https://res.cloudinary.com/c3jvvveh/image/upload/v1789923920/fauji-properties-logo.png"
            alt="Fauji Properties"
            className="h-14 w-auto object-contain shrink-0"
            referrerPolicy="no-referrer"
          />
          <div className="flex flex-col">
            <span className="text-lg font-bold tracking-tight text-[#0f383c] leading-tight group-hover:text-teal-950 transition-colors">
              Fauji Properties
            </span>
            <span className="text-[10px] uppercase font-semibold tracking-wider text-slate-500">
              Ambala · Haryana
            </span>
          </div>
        </Link>

        {/* Center: Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navLinks.map((link) => {
            const active = isActive(link.to);
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`relative px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                  active
                    ? 'text-[#0f383c] font-semibold bg-stone-100/80'
                    : 'text-slate-600 hover:text-[#0f383c] hover:bg-stone-50'
                }`}
              >
                <span>{link.label}</span>
                {link.badge !== undefined && (
                  <span className="ml-1.5 inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-bold rounded-full bg-[#0f383c] text-white">
                    {link.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right: Enquire Now Button & Mobile Hamburger */}
        <div className="flex items-center gap-3">
          <Button
            variant="primary"
            size="md"
            className="hidden sm:inline-flex"
            onClick={() => openEnquiryModal(null)}
            leftIcon={<PhoneCall className="w-4 h-4 mr-1 text-emerald-400" />}
          >
            Enquire Now
          </Button>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
            className="md:hidden p-2.5 rounded-xl border border-stone-200 text-slate-700 hover:bg-stone-100 transition-colors focus:outline-none"
            aria-label="Toggle Navigation"
          >
            {isMobileNavOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {isMobileNavOpen && (
        <div className="md:hidden bg-white border-b border-stone-200 px-4 pt-2 pb-6 shadow-xl animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => {
              const active = isActive(link.to);
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setIsMobileNavOpen(false)}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium ${
                    active
                      ? 'bg-stone-100 text-[#0f383c] font-semibold'
                      : 'text-slate-700 hover:bg-stone-50'
                  }`}
                >
                  <span>{link.label}</span>
                  {link.badge !== undefined && (
                    <span className="inline-flex items-center justify-center px-2 py-0.5 text-xs font-bold rounded-full bg-[#0f383c] text-white">
                      {link.badge} in compare
                    </span>
                  )}
                </Link>
              );
            })}
            <div className="pt-3 border-t border-stone-100 mt-2">
              <Button
                variant="primary"
                size="lg"
                className="w-full"
                onClick={() => {
                  setIsMobileNavOpen(false);
                  openEnquiryModal(null);
                }}
                leftIcon={<PhoneCall className="w-4 h-4 mr-1 text-emerald-400" />}
              >
                Enquire Now
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
