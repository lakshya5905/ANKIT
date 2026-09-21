import React from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { SearchFilterBar } from '../components/home/SearchFilterBar';
import { FeaturedSection } from '../components/home/FeaturedSection';
import { HomeEnquirySection } from '../components/home/HomeEnquirySection';
import { Shield, Award, Users, CheckCircle } from 'lucide-react';

export const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Quick Search & Filter Bar */}
      <SearchFilterBar />

      {/* 3. Featured Properties Grid */}
      <FeaturedSection />

      {/* 4. Why Fauji Properties — Trust Pillars */}
      <section className="py-16 bg-white border-y border-stone-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase font-bold tracking-widest text-[#0f383c] bg-teal-950/5 border border-[#0f383c]/15 px-3 py-1 rounded-md">
              THE FAUJI STANDARD
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0f383c] tracking-tight mt-3">
              Why Ambala Families & Investors Choose Us
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2">
              Grounded in military integrity, transparent documentation, and deep local market expertise.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-[#F8F9FA] border border-stone-200/80 text-left">
              <div className="w-12 h-12 rounded-xl bg-teal-100/70 text-[#0f383c] flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-emerald-700" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1.5">
                100% Clear Title Assurance
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Every property and plot listed undergoes thorough revenue record inspection, mutation verification, and clean ownership checks.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#F8F9FA] border border-stone-200/80 text-left">
              <div className="w-12 h-12 rounded-xl bg-teal-100/70 text-[#0f383c] flex items-center justify-center mb-4">
                <Award className="w-6 h-6 text-emerald-700" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1.5">
                Jaggi Garden Specialists
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Unrivaled on-ground knowledge of Jaggi Garden, Model Town, and Ambala micro-markets with accurate prevailing market rates.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#F8F9FA] border border-stone-200/80 text-left">
              <div className="w-12 h-12 rounded-xl bg-teal-100/70 text-[#0f383c] flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-emerald-700" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1.5">
                Personal 1:1 Guidance
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Direct consultation with Ajit Singh and senior advisors — from site visits to registry completion and handover.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Home Enquiry Section */}
      <HomeEnquirySection />
    </div>
  );
};
