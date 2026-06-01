import React, { useEffect, useRef } from 'react';
import clsx from 'clsx';
import { X } from 'lucide-react';

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
}) {
  const modalRef = useRef(null);

  // Close on ESC key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Prevent scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const sizes = {
    sm: 'max-w-[400px]',
    md: 'max-w-[560px]',
    lg: 'max-w-[720px]',
    xl: 'max-w-[900px]',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-[4px] animate-fadeIn">
      {/* Backdrop click closer */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Card Panel */}
      <div
        ref={modalRef}
        className={clsx(
          'relative w-full glass-card p-6 rounded-xl shadow-modalGlow flex flex-col gap-4 max-h-[90vh] overflow-y-auto animate-slideUp',
          sizes[size]
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-borderDefault">
          <h2 className="text-xl font-bold font-syne text-textPrimary">{title}</h2>
          <button
            onClick={onClose}
            className="text-textSecondary hover:text-white p-1 hover:bg-white/5 rounded-lg transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 text-sm">{children}</div>
      </div>
    </div>
  );
}
