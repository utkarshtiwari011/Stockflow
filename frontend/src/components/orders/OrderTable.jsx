import React, { useState } from 'react';
import { ConfirmDialog } from '../ui/ConfirmDialog';
import { Eye, Trash2 } from 'lucide-react';

function getAvatarColor(name) {
  const colors = [
    '#4F46E5','#7C3AED','#2563EB',
    '#059669','#D97706','#DC2626',
    '#0891B2','#9333EA'
  ];
  return colors[name.charCodeAt(0) % colors.length];
}

function getInitials(name) {
  return name.split(' ')
    .map(n => n[0]).join('')
    .toUpperCase().slice(0, 2);
}

export function OrderTable({
  orders = [],
  loading = false,
  onView,
  onCancel,
}) {
  const [cancelId, setCancelId] = useState(null);
  const [cancelling, setCancelling] = useState(false);

  const handleCancelConfirm = async () => {
    if (!cancelId) return;
    setCancelling(true);
    try {
      await onCancel(cancelId);
      setCancelId(null);
    } catch (err) {
      // Handled globally
    } finally {
      setCancelling(false);
    }
  };

  const formatDate = (dateString) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
    }).format(new Date(dateString));
  };

  const getStatusBadge = (status) => {
    const config = {
      confirmed: { bg: 'bg-[#ECFDF3]', text: 'text-[#12B76A]', dot: 'bg-[#12B76A]' },
      pending: { bg: 'bg-[#FFFAEB]', text: 'text-[#F79009]', dot: 'bg-[#F79009]' },
      cancelled: { bg: 'bg-[#FEF3F2]', text: 'text-[#F04438]', dot: 'bg-[#F04438]' },
    };
    const st = config[status] || { bg: 'bg-white/5', text: 'text-textSecondary', dot: 'bg-textSecondary' };
    return (
      <span className={`inline-flex items-center px-2.5 py-1 text-[12px] font-semibold rounded-full ${st.bg} ${st.text} gap-1.5 select-none uppercase`}>
        <span className={`w-1.5 h-1.5 rounded-full ${st.dot}`} /> {status}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-3">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        <span className="text-xs font-semibold text-textSecondary uppercase tracking-widest animate-pulse">
          Loading Orders...
        </span>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] border border-borderDefault rounded-xl bg-bgCard p-8 text-center gap-4 animate-fadeIn">
        <span className="text-textMuted text-5xl">🛒</span>
        <div className="flex flex-col gap-1">
          <h3 className="text-base font-semibold text-textPrimary">No orders yet</h3>
          <p className="text-xs text-textSecondary">
            Place your first order checkout in the active systems
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="w-full overflow-x-auto border border-borderDefault rounded-xl bg-bgCard shadow-cardGlow animate-fadeIn">
        <table className="w-full border-collapse text-left select-none">
          <thead>
            <tr className="bg-[#1a1a2e] border-b-2 border-borderDefault text-[11px] font-bold text-textMuted uppercase tracking-wider select-none">
              <th className="py-3.5 px-5 font-bold uppercase select-none w-1/6">Order ID</th>
              <th className="py-3.5 px-5 font-bold uppercase select-none w-1/4">Customer</th>
              <th className="py-3.5 px-5 font-bold uppercase select-none">Items</th>
              <th className="py-3.5 px-5 font-bold uppercase select-none">Total Amount</th>
              <th className="py-3.5 px-5 font-bold uppercase select-none">Status</th>
              <th className="py-3.5 px-5 font-bold uppercase select-none">Date</th>
              <th className="py-3.5 px-5 font-bold uppercase select-none text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-borderSubtle">
            {orders.map((row) => {
              const initials = getInitials(row.customer_name);
              const avatarColor = getAvatarColor(row.customer_name);
              const count = row.items ? row.items.reduce((sum, item) => sum + item.quantity, 0) : 0;

              return (
                <tr
                  key={row.id}
                  className="hover:bg-primary/[0.03] transition-all duration-150 ease-in-out min-h-[68px]"
                >
                  {/* Order ID Column */}
                  <td className="py-3.5 px-5 align-middle">
                    <span className="font-mono text-[13px] font-semibold text-[#6366f1] bg-primary/10 px-2.5 py-1 rounded-[6px] select-all">
                      #SF-{String(row.id).padStart(4, '0')}
                    </span>
                  </td>

                  {/* Customer Column */}
                  <td className="py-3.5 px-5 align-middle">
                    <div className="flex items-center gap-2.5">
                      <div
                        className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-[13px] shadow-sm flex-shrink-0"
                        style={{ backgroundColor: avatarColor }}
                      >
                        {initials}
                      </div>
                      <span className="font-semibold text-textPrimary text-[14px]">
                        {row.customer_name}
                      </span>
                    </div>
                  </td>

                  {/* Items Count Column */}
                  <td className="py-3.5 px-5 align-middle">
                    <span className="inline-flex px-3 py-1 bg-[#F1F5F9] text-[#475467] rounded-[20px] text-[12px] font-medium select-none">
                      {count} {count === 1 ? 'item' : 'items'}
                    </span>
                  </td>

                  {/* Total Amount Column */}
                  <td className="py-3.5 px-5 align-middle">
                    <div className="flex items-baseline">
                      <span className="text-xs text-textMuted font-bold mr-0.5 select-none">$</span>
                      <span className="font-bold text-[15px] text-textPrimary">
                        {row.total_amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </span>
                    </div>
                  </td>

                  {/* Status Column */}
                  <td className="py-3.5 px-5 align-middle">
                    {getStatusBadge(row.status)}
                  </td>

                  {/* Date Column */}
                  <td className="py-3.5 px-5 align-middle">
                    <span className="text-[13px] text-textSecondary font-semibold">
                      {formatDate(row.created_at)}
                    </span>
                  </td>

                  {/* Actions Column */}
                  <td className="py-3.5 px-5 align-middle text-right">
                    <div className="flex items-center justify-end gap-2">
                      {/* View Button */}
                      <div className="relative inline-block group">
                        <button
                          onClick={() => onView(row)}
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-textMuted bg-transparent hover:bg-primary/10 hover:text-primary transition-all duration-150 focus:outline-none"
                        >
                          <Eye size={16} />
                        </button>
                        <span className="absolute bottom-full right-1/2 translate-x-1/2 mb-2 px-2 py-0.5 text-[10px] font-bold text-white bg-[#0a0a0f] border border-borderDefault rounded shadow-modalGlow opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                          View details
                        </span>
                      </div>

                      {/* Delete/Cancel Button */}
                      <div className="relative inline-block group">
                        <button
                          onClick={() => setCancelId(row.id)}
                          disabled={row.status === 'cancelled'}
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-textMuted bg-transparent hover:bg-danger/10 hover:text-danger disabled:opacity-30 transition-all duration-150 focus:outline-none"
                        >
                          <Trash2 size={15} />
                        </button>
                        <span className="absolute bottom-full right-1/2 translate-x-1/2 mb-2 px-2 py-0.5 text-[10px] font-bold text-white bg-[#0a0a0f] border border-borderDefault rounded shadow-modalGlow opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                          Cancel order
                        </span>
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <ConfirmDialog
        isOpen={cancelId !== null}
        onClose={() => setCancelId(null)}
        onConfirm={handleCancelConfirm}
        title="Cancel Order?"
        message="Are you sure you want to cancel and delete this order? Product stock levels will be restored to the inventory automatically."
        loading={cancelling}
      />
    </>
  );
}
