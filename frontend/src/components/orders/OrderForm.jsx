import React, { useState, useEffect } from 'react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { useApp } from '../../context/AppContext';
import { Plus, Trash, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';

export function OrderForm({
  onSubmit,
  onClose,
}) {
  const { state } = useApp();
  const { customers, products } = state;

  const [customerId, setCustomerId] = useState('');
  const [items, setItems] = useState([{ product_id: '', quantity: 1 }]);
  const [estimatedTotal, setEstimatedTotal] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  // Recalculate estimated total
  useEffect(() => {
    let total = 0;
    items.forEach((item) => {
      if (item.product_id) {
        const prod = products.find((p) => p.id === parseInt(item.product_id));
        if (prod) {
          total += prod.price * (parseInt(item.quantity) || 0);
        }
      }
    });
    setEstimatedTotal(total);
  }, [items, products]);

  const handleAddItemRow = () => {
    setItems((prev) => [...prev, { product_id: '', quantity: 1 }]);
  };

  const handleRemoveItemRow = (index) => {
    if (items.length === 1) {
      toast.error('Orders must contain at least one item line');
      return;
    }
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleItemChange = (index, field, value) => {
    setItems((prev) => {
      const updated = [...prev];
      updated[index][field] = value;
      return updated;
    });
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const validate = () => {
    if (!customerId) {
      toast.error('Please select a customer');
      return false;
    }

    const uniqueProductIds = new Set();
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (!item.product_id) {
        toast.error(`Please select a product for line ${i + 1}`);
        return false;
      }
      
      const qty = parseInt(item.quantity, 10);
      if (isNaN(qty) || qty <= 0) {
        toast.error(`Invalid quantity on line ${i + 1}. Must be greater than 0`);
        return false;
      }

      // Check duplicate products in client side
      if (uniqueProductIds.has(item.product_id)) {
        const prod = products.find((p) => p.id === parseInt(item.product_id));
        toast.error(`Duplicate product lines found for: ${prod ? prod.name : 'Product'}`);
        return false;
      }
      uniqueProductIds.add(item.product_id);

      // Verify stock availability
      const prod = products.find((p) => p.id === parseInt(item.product_id));
      if (prod && qty > prod.quantity) {
        toast.error(`Insufficient stock for product "${prod.name}" (Requested: ${qty}, In stock: ${prod.quantity})`);
        return false;
      }
    }

    return true;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    try {
      const payload = {
        customer_id: parseInt(customerId, 10),
        items: items.map((item) => ({
          product_id: parseInt(item.product_id, 10),
          quantity: parseInt(item.quantity, 10),
        })),
      };

      await onSubmit(payload);
      onClose();
    } catch (err) {
      // Caught globally
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleFormSubmit} className="flex flex-col gap-5">
      {/* Customer selector */}
      <div className="flex flex-col gap-1.5 w-full">
        <label className="text-xs font-semibold text-textSecondary uppercase tracking-wider">
          Select Customer <span className="text-danger">*</span>
        </label>
        <select
          value={customerId}
          onChange={(e) => setCustomerId(e.target.value)}
          required
          className="w-full px-3.5 py-2.5 bg-bgSurface border border-borderDefault rounded-lg text-textPrimary placeholder:text-textMuted transition-all duration-150 outline-none focus:border-primary focus:ring-2 focus:ring-primaryGlow text-sm"
        >
          <option value="" disabled hidden>
            -- Choose Customer --
          </option>
          {customers.map((c) => (
            <option key={c.id} value={c.id} className="bg-bgCard">
              {c.full_name} ({c.email})
            </option>
          ))}
        </select>
      </div>

      {/* Items Section */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between border-b border-borderDefault pb-2">
          <label className="text-xs font-bold text-textSecondary uppercase tracking-wider">
            Order Items <span className="text-danger">*</span>
          </label>
          <Button
            variant="outline"
            size="sm"
            onClick={handleAddItemRow}
            className="flex items-center gap-1.5 py-1 px-2.5 h-auto text-xs"
          >
            <Plus size={12} /> Add Line
          </Button>
        </div>

        <div className="flex flex-col gap-3 max-h-[40vh] overflow-y-auto pr-1">
          {items.map((item, index) => {
            const selectedProduct = products.find((p) => p.id === parseInt(item.product_id));
            const isStockExceeded = selectedProduct && item.quantity > selectedProduct.quantity;

            return (
              <div key={index} className="flex flex-col gap-1.5 p-3 rounded-lg border border-borderSubtle bg-bgCard/10">
                <div className="flex items-center gap-3">
                  {/* Product dropdown */}
                  <div className="flex-1">
                    <select
                      value={item.product_id}
                      onChange={(e) => handleItemChange(index, 'product_id', e.target.value)}
                      required
                      className="w-full px-3.5 py-2 bg-bgSurface border border-borderDefault rounded-lg text-textPrimary placeholder:text-textMuted transition-all duration-150 outline-none focus:border-primary focus:ring-2 focus:ring-primaryGlow text-xs"
                    >
                      <option value="" disabled hidden>
                        -- Select Product --
                      </option>
                      {products.map((p) => (
                        <option key={p.id} value={p.id} className="bg-bgCard" disabled={p.quantity === 0}>
                          {p.name} (SKU: {p.sku}) — {p.quantity > 0 ? `${p.quantity} in stock` : 'OUT OF STOCK'}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Quantity input */}
                  <div className="w-24">
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                      required
                      placeholder="Qty"
                      className="w-full px-3 py-2 bg-bgSurface border border-borderDefault rounded-lg text-textPrimary placeholder:text-textMuted transition-all duration-150 outline-none focus:border-primary focus:ring-2 focus:ring-primaryGlow text-xs text-center"
                    />
                  </div>

                  {/* Remove button */}
                  <button
                    type="button"
                    onClick={() => handleRemoveItemRow(index)}
                    className="p-2 text-textSecondary hover:text-danger hover:bg-white/5 rounded-lg transition-colors focus:outline-none"
                  >
                    <Trash size={14} />
                  </button>
                </div>

                {/* Real-time Subtotal and Stock alerts per line */}
                <div className="flex items-center justify-between text-xs px-1">
                  <div className="flex items-center gap-1.5">
                    {isStockExceeded && (
                      <span className="flex items-center text-warning gap-1 font-semibold animate-pulse">
                        <AlertCircle size={12} /> Only {selectedProduct.quantity} in stock!
                      </span>
                    )}
                  </div>
                  {selectedProduct && (
                    <span className="text-textMuted font-mono">
                      Subtotal: <span className="text-textPrimary font-semibold">{formatPrice(selectedProduct.price * (parseInt(item.quantity) || 0))}</span>
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Summary Footer */}
      <div className="flex items-center justify-between p-4 rounded-xl border border-borderDefault bg-bgCard/30 mt-2 select-none">
        <span className="text-sm font-semibold text-textSecondary">Estimated Order Total:</span>
        <span className="text-2xl font-bold font-syne text-primary tracking-tight">
          {formatPrice(estimatedTotal)}
        </span>
      </div>

      {/* Action buttons */}
      <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-borderDefault mt-2">
        <Button variant="ghost" size="sm" onClick={onClose} disabled={submitting}>
          Cancel
        </Button>
        <Button type="submit" variant="primary" size="sm" loading={submitting}>
          Submit Order
        </Button>
      </div>
    </form>
  );
}
