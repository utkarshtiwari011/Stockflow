import React, { useEffect, useState } from 'react';
import { useOrders } from '../hooks/useOrders';
import { useProducts } from '../hooks/useProducts';
import { useCustomers } from '../hooks/useCustomers';
import { useApp } from '../context/AppContext';
import { OrderTable } from '../components/orders/OrderTable';
import { OrderForm } from '../components/orders/OrderForm';
import { OrderDetail } from '../components/orders/OrderDetail';
import { Modal } from '../components/ui/Modal';
import { Button } from '../components/ui/Button';
import { ShoppingBag, Plus } from 'lucide-react';
import clsx from 'clsx';

export function Orders() {
  const { state } = useApp();
  const { globalSearch } = state;

  const {
    orders,
    loading,
    fetchOrders,
    createOrder,
    deleteOrder,
  } = useOrders();

  // Prefetch products and customers for selector options
  const { fetchProducts } = useProducts();
  const { fetchCustomers } = useCustomers();

  const [activeTab, setActiveTab] = useState('all');
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [selectedOrderDetail, setSelectedOrderDetail] = useState(null);

  useEffect(() => {
    fetchOrders();
    fetchProducts();
    fetchCustomers();
  }, [fetchOrders, fetchProducts, fetchCustomers]);

  // Tab & Global Search Filtering logic
  const filteredOrders = orders.filter((o) => {
    // 1. Tab check
    if (activeTab !== 'all' && o.status !== activeTab) return false;

    // 2. Global search check
    if (globalSearch.trim()) {
      const term = globalSearch.trim().toLowerCase();
      const orderIdStr = `#sf-${String(o.id).padStart(4, '0')}`;
      return (
        o.customer_name.toLowerCase().includes(term) ||
        orderIdStr.includes(term) ||
        o.status.toLowerCase().includes(term)
      );
    }

    return true;
  });

  const handleCreateSubmit = async (payload) => {
    await createOrder(payload);
    fetchOrders();
  };

  const handleCancelSubmit = async (id) => {
    await deleteOrder(id);
    setSelectedOrderDetail(null); // Close modal if detail is active
    fetchOrders();
  };

  const tabs = [
    { key: 'all', label: 'All Orders' },
    { key: 'confirmed', label: 'Confirmed' },
    { key: 'pending', label: 'Pending' },
    { key: 'cancelled', label: 'Cancelled' },
  ];

  return (
    <div className="flex flex-col gap-6 select-none">
      {/* Header section with telemetry stats and buttons */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-col text-left">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl md:text-3xl font-extrabold font-syne text-textPrimary tracking-tight">
              Warehouse Orders
            </h2>
            <span className="bg-primary/10 text-primary border border-primary/20 text-xs px-2.5 py-0.5 rounded-full font-bold">
              {orders.length} Placed
            </span>
          </div>
          <p className="text-xs md:text-sm text-textSecondary mt-1">
            Dispatch, cancellation checkouts, and snapshotted itemizations of client receipts.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          icon={Plus}
          onClick={() => setCreateModalOpen(true)}
          className="md:self-center"
        >
          Create Order
        </Button>
      </div>

      {/* Navigation tabs */}
      <div className="flex items-center gap-1 border-b border-borderDefault overflow-x-auto pb-px">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={clsx(
              'px-4 py-3 text-xs md:text-sm font-semibold border-b-2 -mb-px transition-colors duration-150 whitespace-nowrap focus:outline-none',
              activeTab === tab.key
                ? 'border-primary text-primary font-bold'
                : 'border-transparent text-textSecondary hover:text-textPrimary'
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Orders table list view */}
      <OrderTable
        orders={filteredOrders}
        loading={loading}
        onView={(o) => setSelectedOrderDetail(o)}
        onCancel={handleCancelSubmit}
      />

      {/* Create Order Modal */}
      <Modal isOpen={createModalOpen} onClose={() => setCreateModalOpen(false)} title="Create New Order Checkout">
        <OrderForm onSubmit={handleCreateSubmit} onClose={() => setCreateModalOpen(false)} />
      </Modal>

      {/* Order Details Receipt Modal */}
      {selectedOrderDetail && (
        <Modal
          isOpen={true}
          onClose={() => setSelectedOrderDetail(null)}
          title="Warehouse Receipt Details"
          size="lg"
        >
          <OrderDetail
            order={selectedOrderDetail}
            onCancel={handleCancelSubmit}
            onClose={() => setSelectedOrderDetail(null)}
          />
        </Modal>
      )}
    </div>
  );
}
