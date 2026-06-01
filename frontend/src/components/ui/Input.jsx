import React from 'react';
import clsx from 'clsx';

export function Input({
  label,
  error,
  icon: Icon,
  type = 'text',
  placeholder,
  value,
  onChange,
  required = false,
  disabled = false,
  className,
  ...props
}) {
  return (
    <div className={clsx('flex flex-col w-full gap-1.5', className)}>
      {label && (
        <label className="text-xs font-semibold text-textSecondary uppercase tracking-wider">
          {label} {required && <span className="text-danger">*</span>}
        </label>
      )}
      <div className="relative flex items-center">
        {Icon && (
          <div className="absolute left-3 text-textMuted pointer-events-none">
            <Icon size={16} />
          </div>
        )}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
          className={clsx(
            'w-full px-3.5 py-2.5 bg-bgSurface border rounded-lg text-textPrimary placeholder:text-textMuted transition-all duration-150 outline-none',
            Icon ? 'pl-10' : '',
            error
              ? 'border-danger focus:border-danger focus:ring-2 focus:ring-danger/20'
              : 'border-borderDefault focus:border-primary focus:ring-2 focus:ring-primaryGlow'
          )}
          {...props}
        />
      </div>
      {error && <span className="text-xs text-danger font-medium mt-0.5">{error}</span>}
    </div>
  );
}
