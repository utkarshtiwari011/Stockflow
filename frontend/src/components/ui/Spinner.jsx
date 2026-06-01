import React from 'react';
import clsx from 'clsx';

export function Spinner({ size = 'md', className }) {
  const sizes = {
    sm: 'w-4 h-4 border-2',
    md: 'w-6 h-6 border-2',
    lg: 'w-10 h-10 border-3',
  };

  return (
    <div
      className={clsx(
        'animate-spin rounded-full border-t-transparent border-primary',
        sizes[size],
        className
      )}
      style={{ borderRightColor: 'transparent' }}
    />
  );
}
