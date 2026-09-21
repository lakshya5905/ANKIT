import React, { forwardRef } from 'react';
import { ChevronDown } from 'lucide-react';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: SelectOption[];
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(({
  label,
  error,
  options,
  className = '',
  id,
  ...rest
}, ref) => {
  const selectId = id || (label ? `select-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);

  return (
    <div className="w-full text-left">
      {label && (
        <label htmlFor={selectId} className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
          {label}
        </label>
      )}
      <div className="relative rounded-xl shadow-xs">
        <select
          ref={ref}
          id={selectId}
          className={`block w-full appearance-none rounded-xl border bg-white px-4 py-3 pr-10 text-sm text-slate-900 transition-colors focus:outline-none focus:ring-2 focus:ring-[#0f383c] focus:border-transparent ${
            error
              ? 'border-rose-300 text-rose-900 focus:ring-rose-500 focus:border-rose-500'
              : 'border-stone-200/90 hover:border-stone-300'
          } ${className}`}
          {...rest}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-3.5 pointer-events-none text-slate-400">
          <ChevronDown className="w-4 h-4" />
        </div>
      </div>
      {error && <p className="mt-1.5 text-xs text-rose-600">{error}</p>}
    </div>
  );
});

Select.displayName = 'Select';
