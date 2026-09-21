import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'white' | 'subtle' | 'outline';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  className?: string;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'white',
  padding = 'md',
  className = '',
  ...rest
}) => {
  const variantClasses = {
    white: 'bg-white border border-stone-200/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)]',
    subtle: 'bg-[#F2F5F4] border border-stone-200/60 shadow-none',
    outline: 'bg-transparent border border-stone-200 shadow-none'
  };

  const paddingClasses = {
    none: 'p-0',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8 sm:p-10'
  };

  return (
    <div
      className={`rounded-2xl transition-all ${variantClasses[variant]} ${paddingClasses[padding]} ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
};
