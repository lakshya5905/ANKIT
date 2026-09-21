import React from 'react';
import { useCompare } from '../../hooks/useCompare';
import { useNavigate, useLocation } from '../../routes/router';
import { Button } from '../common/Button';
import { formatPrice } from '../../utils/formatters';
import { Scale, X, ArrowRight } from 'lucide-react';

export const CompareBar: React.FC = () => {
  const { compareList, removeFromCompare, clearCompare } = useCompare();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // Don't show floating compare bar on /compare page or admin pages
  if (compareList.length === 0 || pathname === '/compare' || pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <aside aria-label="Selected properties comparison dock" className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 w-full max-w-2xl px-4 animate-in slide-in-from-bottom-4 duration-300">
      <div className="bg-[#0f383c] text-white rounded-2xl p-3 sm:p-4 shadow-2xl border border-teal-800/80 flex items-center justify-between gap-3 backdrop-blur-md">
        
        {/* Left: Indicator & Thumbnails */}
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="w-9 h-9 rounded-xl bg-teal-900 flex items-center justify-center shrink-0">
            <Scale className="w-5 h-5 text-emerald-400" />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto py-1">
            {compareList.map((p) => {
              const coverImg = p.images[0]?.url;
              return (
                <div
                  key={p.id}
                  className="relative group shrink-0 flex items-center gap-2 bg-teal-900/90 rounded-xl px-2.5 py-1.5 border border-teal-700/60"
                >
                  {coverImg && (
                    <img
                      src={coverImg}
                      alt={p.title}
                      className="w-6 h-6 rounded-md object-cover"
                    />
                  )}
                  <span className="text-xs font-bold text-white max-w-[90px] sm:max-w-[120px] truncate">
                    {formatPrice(p.price)}
                  </span>
                  <button
                    onClick={() => removeFromCompare(p.id)}
                    className="text-teal-300 hover:text-white transition-colors"
                    title="Remove"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={clearCompare}
            className="text-xs text-stone-300 hover:text-white px-2 py-1 transition-colors hidden sm:inline"
          >
            Clear
          </button>

          <Button
            variant="secondary"
            size="sm"
            onClick={() => navigate('/compare')}
            rightIcon={<ArrowRight className="w-3.5 h-3.5 ml-0.5" />}
            className="font-bold text-xs shadow-md whitespace-nowrap"
          >
            Compare ({compareList.length})
          </Button>
        </div>

      </div>
    </aside>
  );
};
