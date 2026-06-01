import React from 'react';
import clsx from 'clsx';
import { Spinner } from './Spinner';

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  icon: Icon,
  iconPosition = 'left',
  fullWidth = false,
  onClick,
  children,
  type = 'button',
  className,
  ...props
}) {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-150 active:scale-[0.97] disabled:opacity-50 disabled:pointer-events-none focus:outline-none';

  const variants = {
    primary: 'bg-primary text-white hover:bg-primaryHover hover:shadow-[0_0_15px_rgba(99,102,241,0.3)]',
    secondary: 'bg-bgSurface text-textPrimary border border-borderDefault hover:bg-bgCard hover:text-white',
    danger: 'bg-danger text-white hover:bg-red-500 hover:shadow-[0_0_15px_rgba(239,68,68,0.3)]',
    ghost: 'bg-transparent text-textSecondary hover:bg-white/5 hover:text-textPrimary',
    outline: 'bg-transparent border border-borderDefault text-textSecondary hover:border-primary hover:text-white',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs font-semibold gap-1.5',
    md: 'px-4 py-2 text-sm font-semibold gap-2',
    lg: 'px-5 py-2.5 text-base font-semibold gap-2.5',
  };

  const widthStyle = fullWidth ? 'w-full' : '';

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={clsx(
        baseStyles,
        variants[variant],
        sizes[size],
        widthStyle,
        className
      )}
      {...props}
    >
      {loading && <Spinner size="sm" className="mr-1" />}
      {!loading && Icon && iconPosition === 'left' && <Icon size={size === 'sm' ? 14 : size === 'lg' ? 20 : 16} />}
      <span>{children}</span>
      {!loading && Icon && iconPosition === 'right' && <Icon size={size === 'sm' ? 14 : size === 'lg' ? 20 : 16} />}
    </button>
  );
}
