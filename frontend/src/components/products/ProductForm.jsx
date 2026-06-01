import React, { useState, useEffect } from 'react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';

export function ProductForm({
  product = null,
  onSubmit,
  onClose,
  onSuccess,
}) {
  const [name, setName] = useState('');
  const [sku, setSku] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (product) {
      setName(product.name || '');
      setSku(product.sku || '');
      setDescription(product.description || '');
      setPrice(product.price !== undefined && product.price !== null ? product.price.toString() : '');
      setQuantity(product.quantity !== undefined && product.quantity !== null ? product.quantity.toString() : '');
    }
  }, [product]);

  const validate = () => {
    const tempErrors = {};
    if (!name.trim()) tempErrors.name = 'Product name is required';
    if (!sku.trim()) {
      tempErrors.sku = 'SKU is required';
    } else if (!/^[A-Za-z0-9-_]+$/.test(sku)) {
      tempErrors.sku = 'SKU must contain only letters, numbers, hyphens, and underscores';
    }
    
    const parsedPrice = parseFloat(price);
    if (!price.trim()) {
      tempErrors.price = 'Price is required';
    } else if (isNaN(parsedPrice) || parsedPrice <= 0) {
      tempErrors.price = 'Price must be a number greater than 0';
    }

    const parsedQty = parseInt(quantity, 10);
    if (!quantity.trim()) {
      tempErrors.quantity = 'Quantity is required';
    } else if (isNaN(parsedQty) || parsedQty < 0) {
      tempErrors.quantity = 'Quantity must be a positive integer or 0';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    try {
      const payload = {
        name: name.trim(),
        sku: sku.trim().toUpperCase(),
        description: description.trim() || null,
        price: parseFloat(price),
        quantity: parseInt(quantity, 10),
      };

      await onSubmit(payload);
      if (onSuccess) onSuccess();
      onClose();
    } catch (err) {
      // Backend error toasted globally by axios
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
      <Input
        label="Product Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        error={errors.name}
        placeholder="e.g. Heavy Duty Steel Connector"
        required
      />

      <Input
        label="SKU"
        value={sku}
        onChange={(e) => setSku(e.target.value)}
        error={errors.sku}
        placeholder="e.g. SL-WGT-HD-100"
        required
        disabled={!!product} // Disable SKU change in edit mode
      />

      <div className="flex flex-col gap-1.5 w-full">
        <label className="text-xs font-semibold text-textSecondary uppercase tracking-wider">
          Description
        </label>
        <textarea
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Product details, material types, weight capacities..."
          className="w-full px-3.5 py-2.5 bg-bgSurface border border-borderDefault rounded-lg text-textPrimary placeholder:text-textMuted transition-all duration-150 outline-none focus:border-primary focus:ring-2 focus:ring-primaryGlow resize-none text-sm"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Unit Price ($)"
          type="number"
          step="0.01"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          error={errors.price}
          placeholder="0.00"
          required
        />
        <Input
          label="Stock Level"
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          error={errors.quantity}
          placeholder="0"
          required
        />
      </div>

      <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-borderDefault mt-2">
        <Button variant="ghost" size="sm" onClick={onClose} disabled={submitting}>
          Cancel
        </Button>
        <Button type="submit" variant="primary" size="sm" loading={submitting}>
          {product ? 'Save Changes' : 'Add Product'}
        </Button>
      </div>
    </form>
  );
}
