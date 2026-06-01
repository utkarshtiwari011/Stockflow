import React, { useState } from 'react';
import { ConfirmDialog } from '../ui/ConfirmDialog';
import { Trash2, Mail, Phone, Calendar, Users, Plus } from 'lucide-react';
import { Button } from '../ui/Button';

function getAvatarColor(name) {
  const colors = [
    '#4F46E5', '#7C3AED', '#2563EB', '#059669',
    '#D97706', '#DC2626', '#0891B2', '#7C3AED'
  ];
  const index = name.charCodeAt(0) % colors.length;
  return colors[index];
}

function getInitials(name) {
  return name.split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export function CustomerTable({
  customers = [],
  loading = false,
  onDelete,
  onAddClick,
}) {
  const [deleteId, setDeleteId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const handleDeleteConfirm = async () => {
    if (!deleteId) return;
    setDeleting(true);
    try {
      await onDelete(deleteId);
      setDeleteId(null);
    } catch (err) {
      // Handled globally
    } finally {
      setDeleting(false);
    }
  };

  const formatDate = (dateString) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
    }).format(new Date(dateString));
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-3">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        <span className="text-xs font-semibold text-textSecondary uppercase tracking-widest animate-pulse">
          Loading Directory...
        </span>
      </div>
    );
  }

  if (customers.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] border border-borderDefault rounded-xl bg-bgCard p-8 text-center gap-4 animate-fadeIn">
        <div className="w-16 h-16 rounded-full bg-borderDefault/10 flex items-center justify-center text-textMuted">
          <Users size={64} className="text-textMuted" strokeWidth={1.5} />
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="text-base font-semibold text-textPrimary">No customers yet</h3>
          <p className="text-xs text-textSecondary max-w-xs">
            Add your first customer to get started
          </p>
        </div>
        <Button
          variant="primary"
          size="sm"
          icon={Plus}
          onClick={onAddClick}
          className="mt-2 rounded-lg py-2.5 px-4 text-xs font-bold uppercase tracking-wider"
        >
          Add Customer
        </Button>
      </div>
    );
  }

  return (
    <>
      <div className="w-full overflow-x-auto border border-borderDefault rounded-xl bg-bgCard shadow-cardGlow animate-fadeIn">
        <table className="w-full border-collapse text-left select-none">
          <thead>
            <tr className="bg-[#1a1a2e] border-b border-borderDefault text-[11px] font-bold text-textMuted uppercase tracking-wider select-none">
              <th className="py-3 px-5 font-bold uppercase select-none w-1/3">Customer</th>
              <th className="py-3 px-5 font-bold uppercase select-none">E-mail Address</th>
              <th className="py-3 px-5 font-bold uppercase select-none">Phone Number</th>
              <th className="py-3 px-5 font-bold uppercase select-none">Registration Date</th>
              <th className="py-3 px-5 font-bold uppercase select-none text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-borderSubtle">
            {customers.map((row) => {
              const initials = getInitials(row.full_name);
              const avatarColor = getAvatarColor(row.full_name);

              return (
                <tr
                  key={row.id}
                  className="hover:bg-white/[0.01] transition-all duration-150 ease-in-out min-h-[64px]"
                >
                  {/* Customer Column */}
                  <td className="py-4 px-5">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-[14px] tracking-wide shadow-sm"
                        style={{ backgroundColor: avatarColor }}
                      >
                        {initials}
                      </div>
                      <div className="flex flex-col text-left">
                        <span className="font-semibold text-textPrimary text-[15px]">
                          {row.full_name}
                        </span>
                        <span className="text-[12px] text-textMuted mt-0.5">
                          {row.email}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Email Column */}
                  <td className="py-4 px-5 align-middle">
                    <div className="flex items-center gap-2 text-textSecondary text-[14px]">
                      <Mail size={16} className="text-textMuted" />
                      <span>{row.email}</span>
                    </div>
                  </td>

                  {/* Phone Column */}
                  <td className="py-4 px-5 align-middle">
                    {row.phone ? (
                      <div className="flex items-center gap-2 text-textSecondary text-[14px]">
                        <Phone size={16} className="text-textMuted" />
                        <span>{row.phone}</span>
                      </div>
                    ) : (
                      <span className="text-textMuted text-[14px]">—</span>
                    )}
                  </td>

                  {/* Registration Date Column */}
                  <td className="py-4 px-5 align-middle">
                    <div className="flex items-center gap-2 text-textSecondary text-[14px]">
                      <Calendar size={16} className="text-textMuted" />
                      <span>{formatDate(row.created_at)}</span>
                    </div>
                  </td>

                  {/* Actions Column */}
                  <td className="py-4 px-5 align-middle text-right">
                    <div className="relative inline-block group">
                      <button
                        onClick={() => setDeleteId(row.id)}
                        className="p-2 text-textMuted hover:text-danger hover:bg-danger/10 rounded-lg transition-all duration-150 focus:outline-none"
                      >
                        <Trash2 size={16} />
                      </button>
                      {/* Tooltip on hover */}
                      <span className="absolute bottom-full right-1/2 translate-x-1/2 mb-2 px-2.5 py-1 text-[10px] font-bold text-white bg-[#0a0a0f] border border-borderDefault rounded shadow-modalGlow opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                        Delete customer
                      </span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <ConfirmDialog
        isOpen={deleteId !== null}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDeleteConfirm}
        title="Delete Customer Profile?"
        message="Are you sure you want to delete this customer? This will remove their record from the registry database. Please note this will not cancel their active orders."
        loading={deleting}
      />
    </>
  );
}
