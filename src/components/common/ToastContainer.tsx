import React from 'react';
import { useUI } from '../../hooks/useUI';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useUI();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none px-4">
      {toasts.map((toast) => {
        const isSuccess = toast.type === 'success';
        const isError = toast.type === 'error';

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl border shadow-lg transition-all duration-300 transform translate-y-0 ${
              isSuccess
                ? 'bg-[#0f383c] text-white border-teal-800'
                : isError
                ? 'bg-rose-900 text-white border-rose-800'
                : 'bg-white text-slate-800 border-stone-200'
            }`}
          >
            <div className="shrink-0 mt-0.5">
              {isSuccess && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
              {isError && <AlertCircle className="w-5 h-5 text-rose-300" />}
              {!isSuccess && !isError && <Info className="w-5 h-5 text-[#0f383c]" />}
            </div>
            <p className="text-xs sm:text-sm font-medium leading-snug flex-1">
              {toast.message}
            </p>
            <button
              onClick={() => removeToast(toast.id)}
              className="shrink-0 p-1 opacity-70 hover:opacity-100 transition-opacity"
              aria-label="Dismiss toast"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
