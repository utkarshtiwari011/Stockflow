import React from 'react';
import { Modal } from './Modal';
import { Button } from './Button';
import { AlertTriangle } from 'lucide-react';

export function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title = 'Are you sure?',
  message = 'This action cannot be undone. Please confirm to proceed.',
  loading = false,
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size="sm">
      <div className="flex flex-col gap-5">
        <div className="flex gap-3">
          <div className="text-danger flex-shrink-0 mt-0.5">
            <AlertTriangle size={20} />
          </div>
          <p className="text-sm text-textSecondary leading-relaxed">{message}</p>
        </div>

        <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-borderDefault">
          <Button variant="ghost" size="sm" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button variant="danger" size="sm" onClick={onConfirm} loading={loading}>
            Confirm
          </Button>
        </div>
      </div>
    </Modal>
  );
}
