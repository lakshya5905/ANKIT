import React from 'react';
import { Button } from '../components/common/Button';
import { useNavigate } from '../routes/router';
import {
  Shield,
  Award,
  CheckCircle2,
  FileCheck2,
  Users2,
  Compass,
  ArrowRight,
  MapPin,
  Clock
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="py-12 sm:py-16 bg-[#F8F9FA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero Section */}
        <div className="max-w-3xl text-left mb-16">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#0f383c] bg-teal-950/5 border border-[#0f383c]/15 px-3 py-1 rounded-md mb-4">
            <span>ABOUT FAUJI PROPERTIES</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#0f383c] leading-[1.15]">
            Built on Integrity. Rooted in Ambala.
          </h1>
          <p className="text-base sm:text-lg text-slate-600 mt-4 leading-relaxed">
            Fauji Properties was founded with a clear, steadfast mission: to bring transparent, trustworthy real estate advisory to families, defense personnel, and investors seeking premium plots, homes, and commercial units in Ambala.
          </p>
        </div>

        {/* Story & Ethos Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 text-left">
          
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 border border-stone-200/90 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-teal-50 text-[#0f383c] flex items-center justify-center mb-6">
                <Shield className="w-6 h-6 text-emerald-700" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                The Military Standard of Real Estate
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-4">
                In an industry frequently clouded by speculative pricing and ambiguous paperwork, Fauji Properties stands apart through disciplined transparency. Inspired by armed forces values of honesty, duty, and precision, we treat every transaction as a lifelong trust commitment.
              </p>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Whether you are purchasing your first 150 Gaj plot in Jaggi Garden to build your family home or investing in a prime commercial site on the highway, we guide you through every milestone with verified revenue records and fair terms.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-stone-100 flex items-center gap-4 text-xs font-semibold text-slate-700">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Clear Titles Only
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Direct Owner Negotiations
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Registry Assistance
              </span>
            </div>
          </div>

          <div className="lg:col-span-5 bg-[#EEF4F2] rounded-3xl p-8 sm:p-10 border border-teal-900/10 flex flex-col justify-between">
            <div>
              <span className="text-xs uppercase font-bold tracking-wider text-[#0f383c]">
                LOCAL PRESENCE
              </span>
              <h3 className="text-2xl font-bold text-[#0f383c] mt-2 mb-4">
                Jaggi Garden, Ambala
              </h3>
              <p className="text-sm text-slate-700 leading-relaxed mb-6">
                We are physically headquartered in Jaggi Garden, giving us intimate, day-to-day visibility into new developments, road widenings, municipal approvals, and authentic price trends across Ambala Cantt and City.
              </p>

              <div className="space-y-3">
                <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-800">
                  <MapPin className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <span>Jaggi Garden, Ambala, Haryana, India</span>
                </div>
                <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-800">
                  <Clock className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <span>All Days: 9:00 AM – 8:00 PM</span>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <Button
                variant="primary"
                size="md"
                className="w-full"
                onClick={() => navigate('/contact')}
                rightIcon={<ArrowRight className="w-4 h-4 ml-1" />}
              >
                Schedule an Office Visit
              </Button>
            </div>
          </div>

        </div>

        {/* Core Services Section */}
        <div className="text-left mb-16">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0f383c] mb-8">
            How We Assist You
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-stone-200/80 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-teal-50 text-[#0f383c] flex items-center justify-center mb-4">
                <Compass className="w-5 h-5 text-emerald-700" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">
                Plot & Home Selection
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Shortlisting properties aligned with your budget, preferred colony, road width, and Vastu requirements without unnecessary site visits.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-stone-200/80 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-teal-50 text-[#0f383c] flex items-center justify-center mb-4">
                <FileCheck2 className="w-5 h-5 text-emerald-700" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">
                Title Verification & Legal Review
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Checking Jamabandi, Inteqal, mutation history, and encumbrance records to ensure 100% peaceful legal possession.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-stone-200/80 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-teal-50 text-[#0f383c] flex items-center justify-center mb-4">
                <Users2 className="w-5 h-5 text-emerald-700" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">
                Sale & Resale Assistance
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Helping property owners market their plots and homes directly to genuine, pre-qualified buyers at fair market valuations.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="rounded-3xl bg-[#0b2b2e] text-white p-8 sm:p-12 text-center relative overflow-hidden">
          <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-3">
            Looking for a plot or home in Ambala?
          </h3>
          <p className="text-sm sm:text-base text-stone-300 max-w-xl mx-auto mb-8">
            Speak directly with our advisory desk or explore our verified portfolio of active listings.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              variant="secondary"
              size="lg"
              onClick={() => navigate('/properties')}
            >
              Explore Properties
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-white border-teal-600 hover:bg-teal-900"
              onClick={() => navigate('/contact')}
            >
              Contact Advisory Desk
            </Button>
          </div>
        </div>

      </div>
    </div>
  );
};
