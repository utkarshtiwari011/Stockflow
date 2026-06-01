import React from 'react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Mail, Phone, Calendar, User } from 'lucide-react';

export function OrderDetail({
  order = null,
  onClose,
  onCancel,
}) {
  if (!order) return null;

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const formatDate = (dateString) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(dateString));
  };

  const statuses = {
    pending: { variant: 'warning', label: 'Pending' },
    confirmed: { variant: 'success', label: 'Confirmed' },
    cancelled: { variant: 'danger', label: 'Cancelled' },
  };
  const st = statuses[order.status] || { variant: 'neutral', label: order.status };

  return (
    <div className="flex flex-col gap-6 select-none animate-fadeIn">
      {/* Header Info */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl border border-borderDefault bg-bgCard/15">
        <div className="flex flex-col gap-1">
          <span className="text-xs text-textMuted uppercase tracking-wider font-semibold">Order Identifer</span>
          <span className="font-mono text-base font-bold text-textPrimary">
            #SF-{String(order.id).padStart(4, '0')}
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-xs text-textMuted uppercase tracking-wider font-semibold">Order Placed</span>
          <span className="flex items-center gap-1.5 text-xs text-textSecondary font-semibold">
            <Calendar size={12} /> {formatDate(order.created_at)}
          </span>
        </div>
        <div className="flex flex-col gap-1 items-end">
          <span className="text-xs text-textMuted uppercase tracking-wider font-semibold mb-0.5">Status</span>
          <Badge variant={st.variant}>{st.label}</Badge>
        </div>
      </div>

      {/* Customer Info Card */}
      <div className="flex flex-col gap-3">
        <h4 className="text-xs font-bold text-textSecondary uppercase tracking-wider border-b border-borderDefault pb-1.5">
          Customer Profile
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-bgSurface border border-borderSubtle p-4 rounded-xl">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-bgCard border border-borderDefault flex items-center justify-center text-textSecondary">
              <User size={16} />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xs text-textMuted font-medium leading-none">Full Name</span>
              <span className="text-sm font-bold text-textPrimary mt-1">{order.customer_name}</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-bgCard border border-borderDefault flex items-center justify-center text-textSecondary">
              <Mail size={16} />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xs text-textMuted font-medium leading-none">E-mail</span>
              <span className="text-sm font-semibold text-textSecondary mt-1 truncate max-w-[180px]">{order.customer_email || '—'}</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-bgCard border border-borderDefault flex items-center justify-center text-textSecondary">
              <Phone size={16} />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xs text-textMuted font-medium leading-none">Phone</span>
              <span className="text-sm font-semibold text-textSecondary mt-1">{order.customer_phone || '—'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Items Details */}
      <div className="flex flex-col gap-3">
        <h4 className="text-xs font-bold text-textSecondary uppercase tracking-wider border-b border-borderDefault pb-1.5">
          Receipt Items
        </h4>
        <div className="border border-borderDefault rounded-xl overflow-hidden bg-bgSurface">
          <table className="w-full text-left text-xs text-textSecondary">
            <thead className="bg-bgCard/20 border-b border-borderDefault text-[10px] font-bold uppercase tracking-wider text-textMuted">
              <tr>
                <th className="px-5 py-3.5">Product</th>
                <th className="px-5 py-3.5 text-center">Qty</th>
                <th className="px-5 py-3.5 text-right">Unit Price</th>
                <th className="px-5 py-3.5 text-right">Subtotal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-borderSubtle">
              {order.items && order.items.map((item) => (
                <tr key={item.id} className="hover:bg-white/[0.01]">
                  <td className="px-5 py-4">
                    <div className="flex flex-col gap-0.5">
                      <span className="font-bold text-textPrimary">{item.product_name}</span>
                      <span className="text-[10px] text-textMuted font-mono uppercase tracking-wider">ID: {item.product_id}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-center text-textPrimary font-semibold">
                    {item.quantity}
                  </td>
                  <td className="px-5 py-4 text-right font-mono text-textSecondary">
                    {formatPrice(item.unit_price)}
                  </td>
                  <td className="px-5 py-4 text-right font-mono text-textPrimary font-bold">
                    {formatPrice(item.subtotal)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary Footer */}
      <div className="flex items-center justify-between p-5 rounded-xl border border-borderDefault bg-bgCard/25 mt-1">
        {onCancel && order.status !== 'cancelled' ? (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onCancel(order.id)}
            className="text-textSecondary hover:text-danger hover:bg-white/5"
          >
            Cancel Order
          </Button>
        ) : (
          <div />
        )}
        <div className="flex items-baseline gap-3">
          <span className="text-sm font-semibold text-textSecondary">Grand Total:</span>
          <span className="text-3xl font-bold font-syne text-primary tracking-tight">
            {formatPrice(order.total_amount)}
          </span>
        </div>
      </div>

      {/* Close modal */}
      <div className="flex items-center justify-end pt-2">
        <Button variant="outline" size="sm" onClick={onClose}>
          Close Receipt
        </Button>
      </div>
    </div>
  );
}
