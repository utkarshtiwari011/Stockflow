import React from 'react';
import clsx from 'clsx';

export function Card({ title, action, children, className }) {
  return (
    <div className={clsx('glass-card rounded-xl overflow-hidden shadow-cardGlow flex flex-col', className)}>
      {(title || action) && (
        <div className="flex items-center justify-between px-6 py-4.5 border-b border-borderDefault bg-bgCard/20">
          {title && <h3 className="font-syne font-bold text-textPrimary text-base tracking-wide">{title}</h3>}
          {action && <div className="flex items-center">{action}</div>}
        </div>
      )}
      <div className="flex-1 p-6">{children}</div>
    </div>
  );
}
