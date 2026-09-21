import React from 'react';
import { PropertyStatus } from '../../types/property';

export interface BadgeProps {
  status?: PropertyStatus | 'Featured' | string;
  variant?: 'success' | 'warning' | 'neutral' | 'teal';
  className?: string;
  children?: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  status,
  variant,
  className = '',
  children
}) => {
  let computedVariant = variant || 'neutral';

  if (status === 'Available') computedVariant = 'success';
  if (status === 'Under Offer') computedVariant = 'warning';
  if (status === 'Sold') computedVariant = 'neutral';
  if (status === 'Featured') computedVariant = 'teal';

  const styles = {
    success: 'bg-emerald-50 text-emerald-800 border-emerald-200/80',
    warning: 'bg-amber-50 text-amber-800 border-amber-200/80',
    neutral: 'bg-slate-100 text-slate-700 border-slate-200',
    teal: 'bg-[#0f383c]/10 text-[#0f383c] border-[#0f383c]/20'
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold tracking-wide border whitespace-nowrap ${styles[computedVariant]} ${className}`}
    >
      {children || status}
    </span>
  );
};
