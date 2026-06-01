import React from 'react';
import clsx from 'clsx';

export function Badge({ variant = 'neutral', children, className }) {
  const styles = {
    success: 'bg-green-500/10 text-success border border-green-500/20',
    warning: 'bg-amber-500/10 text-warning border border-amber-500/20',
    danger: 'bg-red-500/10 text-danger border border-red-500/20',
    info: 'bg-indigo-500/10 text-primaryHover border border-indigo-500/20',
    neutral: 'bg-white/5 text-textSecondary border border-white/10',
  };

  const dots = {
    success: 'bg-success',
    warning: 'bg-warning',
    danger: 'bg-danger',
    info: 'bg-primary',
    neutral: 'bg-textSecondary',
  };

  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider',
        styles[variant],
        className
      )}
    >
      <span className={clsx('w-1.5 h-1.5 rounded-full', dots[variant])} />
      <span>{children}</span>
    </span>
  );
}
