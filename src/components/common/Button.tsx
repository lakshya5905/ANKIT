import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  className = '',
  disabled,
  ...rest
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed select-none active:scale-[0.98]';

  const sizeClasses = {
    sm: 'text-xs px-3.5 py-1.5 rounded-lg gap-1.5',
    md: 'text-sm px-5 py-2.5 rounded-xl gap-2',
    lg: 'text-base px-6 py-3.5 rounded-xl gap-2.5'
  };

  const variantClasses = {
    primary: 'bg-[#0f383c] hover:bg-[#0a292c] text-white border border-transparent shadow-sm focus:ring-[#0f383c]',
    secondary: 'bg-white hover:bg-stone-50 text-slate-800 border border-stone-200/90 shadow-sm focus:ring-stone-300',
    outline: 'bg-transparent hover:bg-teal-50/50 text-[#0f383c] border border-[#0f383c]/30 focus:ring-[#0f383c]',
    ghost: 'bg-transparent hover:bg-stone-100 text-slate-700 border-transparent focus:ring-stone-300',
    danger: 'bg-rose-700 hover:bg-rose-800 text-white border-transparent shadow-sm focus:ring-rose-600'
  };

  return (
    <button
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      disabled={disabled || isLoading}
      {...rest}
    >
      {isLoading ? (
        <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : (
        leftIcon
      )}
      <span>{children}</span>
      {!isLoading && rightIcon}
    </button>
  );
};
