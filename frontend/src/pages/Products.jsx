import React, { useEffect, useState } from 'react';
import { useProducts } from '../hooks/useProducts';
import { useApp } from '../context/AppContext';
import { ProductTable } from '../components/products/ProductTable';
import { ProductForm } from '../components/products/ProductForm';
import { Modal } from '../components/ui/Modal';
import { Button } from '../components/ui/Button';
import { Plus, Search } from 'lucide-react';

export function Products() {
  const { state } = useApp();
  const { globalSearch } = state;

  const {
    products,
    loading,
    fetchProducts,
    createProduct,
    updateProduct,
    deleteProduct,
  } = useProducts();

  const [searchTerm, setSearchTerm] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Client-side real-time filtering linking local search and global search
  const filteredProducts = products.filter((p) => {
    const term = (searchTerm.trim() || globalSearch.trim()).toLowerCase();
    return p.name.toLowerCase().includes(term) || p.sku.toLowerCase().includes(term);
  });

  const handleCreateSubmit = async (payload) => {
    await createProduct(payload);
    fetchProducts();
  };

  const handleEditSubmit = async (payload) => {
    if (!editingProduct) return;
    await updateProduct(editingProduct.id, payload);
    fetchProducts();
  };

  return (
    <div className="flex flex-col gap-6 select-none">
      {/* Header section with telemetry and buttons */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-col text-left">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl md:text-3xl font-extrabold font-syne text-textPrimary tracking-tight">
              Products Inventory
            </h2>
            <span className="bg-primary/10 text-primary border border-primary/20 text-xs px-2.5 py-0.5 rounded-full font-bold">
              {products.length} Registered
            </span>
          </div>
          <p className="text-xs md:text-sm text-textSecondary mt-1">
            Create, update, and manage your warehouse catalog inventory levels.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          icon={Plus}
          onClick={() => setModalOpen(true)}
          className="md:self-center"
        >
          Add Product
        </Button>
      </div>

      {/* Filter and search controllers (Using pl-10 to fix icon overlap) */}
      <div className="relative flex items-center max-w-md w-full bg-bgSurface border border-borderDefault rounded-lg">
        <Search size={16} className="absolute left-3.5 text-textMuted" />
        <input
          type="text"
          placeholder="Filter by name or SKU identifier..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-transparent text-textPrimary placeholder:text-textMuted text-xs focus:outline-none"
        />
      </div>

      {/* Products table */}
      <ProductTable
        products={filteredProducts}
        loading={loading}
        onEdit={(p) => setEditingProduct(p)}
        onDelete={async (id) => {
          await deleteProduct(id);
          fetchProducts();
        }}
      />

      {/* Add Product Modal */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Add New Product">
        <ProductForm onSubmit={handleCreateSubmit} onClose={() => setModalOpen(false)} />
      </Modal>

      {/* Edit Product Modal */}
      {editingProduct && (
        <Modal
          isOpen={true}
          onClose={() => setEditingProduct(null)}
          title={`Edit Product: ${editingProduct.name}`}
        >
          <ProductForm
            product={editingProduct}
            onSubmit={handleEditSubmit}
            onClose={() => setEditingProduct(null)}
          />
        </Modal>
      )}
    </div>
  );
}
