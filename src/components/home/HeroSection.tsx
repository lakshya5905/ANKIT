import React from 'react';
import { Button } from '../common/Button';
import { useNavigate } from '../../routes/router';
import { useUI } from '../../hooks/useUI';
import { ArrowRight, MessageSquare, ShieldCheck, MapPin } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  const { openEnquiryModal } = useUI();

  return (
    <section className="relative pt-8 sm:pt-14 pb-12 sm:pb-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Headline & Action */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-teal-950/5 border border-[#0f383c]/15 text-[#0f383c] text-xs font-bold tracking-widest uppercase mb-5">
              <span>HOMES · PLOTS · INVESTMENTS</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#0f383c] leading-[1.12] mb-6">
              Find a property you'll <br className="hidden sm:inline" />
              be proud to own.
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl mb-8">
              Trusted property guidance for homes, plots, and investments in Ambala and beyond.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto">
              <Button
                variant="primary"
                size="lg"
                onClick={() => navigate('/properties')}
                rightIcon={<ArrowRight className="w-4 h-4 ml-1" />}
              >
                Explore Properties
              </Button>

              <Button
                variant="secondary"
                size="lg"
                onClick={() => openEnquiryModal(null)}
                leftIcon={<MessageSquare className="w-4 h-4 mr-1 text-[#0f383c]" />}
              >
                Speak with our team
              </Button>
            </div>

            {/* Trust pill */}
            <div className="mt-8 flex items-center gap-2 text-xs text-slate-500 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Direct dealing · Clear titles · Based in Jaggi Garden, Ambala</span>
            </div>
          </div>

          {/* Right Column: Reference Warm Card & Stats */}
          <div className="lg:col-span-5 w-full">
            <div className="relative rounded-3xl bg-[#EEF4F2] border border-teal-900/10 p-7 sm:p-9 shadow-sm">
              {/* Subtle decorative badge */}
              <div className="flex items-center justify-between mb-8">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#0f383c]/80 bg-white/70 px-3 py-1 rounded-full border border-teal-900/5">
                  YOUR NEXT ADDRESS
                </span>
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#0f383c]">
                  <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                  Ambala
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0f383c] leading-snug mb-8">
                Clear choices. Trusted <br />
                guidance.
              </h2>

              {/* Two White Stat Cards */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-2xl p-5 border border-stone-200/80 shadow-xs flex flex-col justify-center">
                  <span className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0f383c]">
                    3+
                  </span>
                  <span className="text-xs sm:text-sm font-medium text-slate-600 mt-1.5 leading-snug">
                    Featured listings
                  </span>
                </div>

                <div className="bg-white rounded-2xl p-5 border border-stone-200/80 shadow-xs flex flex-col justify-center">
                  <span className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0f383c]">
                    1:1
                  </span>
                  <span className="text-xs sm:text-sm font-medium text-slate-600 mt-1.5 leading-snug">
                    Personal support
                  </span>
                </div>
              </div>

              {/* Small trust note */}
              <p className="mt-6 text-xs text-slate-500 text-center font-normal">
                Serving Jaggi Garden, Model Town, Sector 9 & Greater Ambala
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
