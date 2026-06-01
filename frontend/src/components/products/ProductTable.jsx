import React, { useState } from 'react';
import { ConfirmDialog } from '../ui/ConfirmDialog';
import { Button } from '../ui/Button';
import { Pencil, Trash2, Calendar } from 'lucide-react';

function getAvatarColor(name) {
  const colors = [
    '#4F46E5','#7C3AED','#2563EB',
    '#059669','#D97706','#DC2626',
    '#0891B2','#9333EA'
  ];
  return colors[name.charCodeAt(0) % colors.length];
}

export function ProductTable({
  products = [],
  loading = false,
  onEdit,
  onDelete,
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

  const getStockBadge = (qty) => {
    if (qty === 0) {
      return (
        <span className="inline-flex items-center px-2.5 py-1 text-[12px] font-bold rounded-full bg-[#FEF3F2] text-[#F04438] gap-1.5 select-none uppercase">
          ● OUT OF STOCK
        </span>
      );
    }
    if (qty >= 1 && qty <= 5) {
      return (
        <span className="inline-flex items-center px-2.5 py-1 text-[12px] font-bold rounded-full bg-[#FFFAEB] text-[#F79009] gap-1.5 select-none uppercase">
          ● LOW STOCK
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-2.5 py-1 text-[12px] font-bold rounded-full bg-[#ECFDF3] text-[#12B76A] gap-1.5 select-none uppercase">
        ● AVAILABLE
      </span>
    );
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-3">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        <span className="text-xs font-semibold text-textSecondary uppercase tracking-widest animate-pulse">
          Loading Inventory...
        </span>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] border border-borderDefault rounded-xl bg-bgCard p-8 text-center gap-4 animate-fadeIn">
        <span className="text-textMuted text-5xl">📦</span>
        <div className="flex flex-col gap-1">
          <h3 className="text-base font-semibold text-textPrimary">No products yet</h3>
          <p className="text-xs text-textSecondary">
            Register your first product to see it in the inventory
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
              <th className="py-3.5 px-5 font-bold uppercase select-none w-1/4">Product</th>
              <th className="py-3.5 px-5 font-bold uppercase select-none">Description</th>
              <th className="py-3.5 px-5 font-bold uppercase select-none">Price</th>
              <th className="py-3.5 px-5 font-bold uppercase select-none">Stock Status</th>
              <th className="py-3.5 px-5 font-bold uppercase select-none">Date Added</th>
              <th className="py-3.5 px-5 font-bold uppercase select-none text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-borderSubtle">
            {products.map((row) => {
              const avatarColor = getAvatarColor(row.name);
              const firstLetter = row.name.charAt(0).toUpperCase();

              // Max 35 chars description truncation
              const truncatedDesc = row.description
                ? row.description.length > 35
                  ? `${row.description.slice(0, 35)}...`
                  : row.description
                : '—';

              return (
                <tr
                  key={row.id}
                  className="hover:bg-primary/[0.03] transition-all duration-150 ease-in-out min-h-[72px]"
                >
                  {/* Product Column */}
                  <td className="py-4.5 px-5 align-middle">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-[10px] flex items-center justify-center text-white font-bold text-[16px] shadow-sm flex-shrink-0"
                        style={{ backgroundColor: avatarColor }}
                      >
                        {firstLetter}
                      </div>
                      <div className="flex flex-col text-left">
                        <span className="font-bold text-textPrimary text-[15px]">
                          {row.name}
                        </span>
                        <div className="mt-1">
                          <span className="text-[11px] font-mono text-primary bg-primary/10 px-1.5 py-0.5 rounded">
                            {row.sku}
                          </span>
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Description Column */}
                  <td className="py-4.5 px-5 align-middle">
                    <span className="text-[14px] text-textSecondary italic">
                      {truncatedDesc}
                    </span>
                  </td>

                  {/* Price Column */}
                  <td className="py-4.5 px-5 align-middle">
                    <div className="flex items-baseline">
                      <span className="text-xs text-textMuted font-bold mr-0.5 select-none">$</span>
                      <span className="font-bold text-[15px] text-textPrimary">
                        {row.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </span>
                    </div>
                  </td>

                  {/* Stock Status Column */}
                  <td className="py-4.5 px-5 align-middle">
                    {getStockBadge(row.quantity)}
                  </td>

                  {/* Date Added Column */}
                  <td className="py-4.5 px-5 align-middle">
                    <div className="flex items-center gap-1.5 text-[13px] text-textSecondary">
                      <Calendar size={14} className="text-textMuted" />
                      <span>{formatDate(row.created_at)}</span>
                    </div>
                  </td>

                  {/* Actions Column */}
                  <td className="py-4.5 px-5 align-middle text-right">
                    <div className="flex items-center justify-end gap-2">
                      {/* Edit Button */}
                      <div className="relative inline-block group">
                        <button
                          onClick={() => onEdit(row)}
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-textMuted bg-transparent hover:bg-primary/10 hover:text-primary transition-all duration-150 focus:outline-none"
                        >
                          <Pencil size={15} />
                        </button>
                        <span className="absolute bottom-full right-1/2 translate-x-1/2 mb-2 px-2 py-0.5 text-[10px] font-bold text-white bg-[#0a0a0f] border border-borderDefault rounded shadow-modalGlow opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                          Edit product
                        </span>
                      </div>

                      {/* Delete Button */}
                      <div className="relative inline-block group">
                        <button
                          onClick={() => setDeleteId(row.id)}
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-textMuted bg-transparent hover:bg-danger/10 hover:text-danger transition-all duration-150 focus:outline-none"
                        >
                          <Trash2 size={15} />
                        </button>
                        <span className="absolute bottom-full right-1/2 translate-x-1/2 mb-2 px-2 py-0.5 text-[10px] font-bold text-white bg-[#0a0a0f] border border-borderDefault rounded shadow-modalGlow opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                          Delete product
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
        isOpen={deleteId !== null}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDeleteConfirm}
        title="Delete Product?"
        message="Are you sure you want to delete this product? This will remove it from the system inventory and cannot be undone."
        loading={deleting}
      />
    </>
  );
}
