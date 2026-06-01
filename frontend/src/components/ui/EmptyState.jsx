import React from 'react';
import { Button } from './Button';

export function EmptyState({
  icon: Icon,
  title,
  description,
  actionText,
  onActionClick,
}) {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 max-w-sm mx-auto">
      {Icon && (
        <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-bgCard border border-borderDefault text-textMuted mb-4">
          <Icon size={32} />
        </div>
      )}
      <h3 className="text-lg font-bold font-syne text-textPrimary mb-1.5">{title}</h3>
      <p className="text-sm text-textSecondary mb-5 leading-relaxed">{description}</p>
      {actionText && onActionClick && (
        <Button variant="outline" size="sm" onClick={onActionClick}>
          {actionText}
        </Button>
      )}
    </div>
  );
}
