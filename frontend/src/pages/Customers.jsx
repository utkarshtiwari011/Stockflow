import React, { useEffect, useState } from 'react';
import { useCustomers } from '../hooks/useCustomers';
import { useApp } from '../context/AppContext';
import { CustomerTable } from '../components/customers/CustomerTable';
import { CustomerForm } from '../components/customers/CustomerForm';
import { Modal } from '../components/ui/Modal';
import { Button } from '../components/ui/Button';
import { Plus, Search } from 'lucide-react';

export function Customers() {
  const { state } = useApp();
  const { globalSearch } = state;

  const {
    customers,
    loading,
    fetchCustomers,
    createCustomer,
    deleteCustomer,
  } = useCustomers();

  const [searchTerm, setSearchTerm] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  // Client-side search filtration linking local search and global search
  const filteredCustomers = customers.filter((c) => {
    const term = (searchTerm.trim() || globalSearch.trim()).toLowerCase();
    return c.full_name.toLowerCase().includes(term) || c.email.toLowerCase().includes(term);
  });

  const handleCreateSubmit = async (payload) => {
    await createCustomer(payload);
    fetchCustomers();
  };

  return (
    <div className="flex flex-col gap-6 select-none">
      {/* Header section with title, search, and action button */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 pb-5 border-b border-borderDefault">
        {/* Left: Title + Badge & Subtitle */}
        <div className="flex flex-col text-left">
          <div className="flex items-center gap-3">
            <h2 className="text-[28px] font-extrabold font-syne text-textPrimary tracking-tight">
              Customers
            </h2>
            <span className="bg-primary/10 text-primary border border-primary/20 text-xs px-2.5 py-0.5 rounded-full font-bold select-none">
              {customers.length} Registered
            </span>
          </div>
          <p className="text-xs md:text-sm text-textSecondary mt-1">
            Manage your customer directory
          </p>
        </div>

        {/* Center: Search Bar */}
        <div className="flex-1 max-w-md md:mx-8 relative flex items-center bg-bgSurface border border-borderDefault rounded-lg">
          <Search size={16} className="absolute left-3.5 text-textMuted" />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-transparent text-textPrimary placeholder:text-textMuted text-xs focus:outline-none h-[38px]"
          />
        </div>

        {/* Right: + Add Customer Button */}
        <Button
          variant="primary"
          size="sm"
          icon={Plus}
          onClick={() => setModalOpen(true)}
          className="rounded-lg h-[38px] px-4 text-xs font-bold uppercase tracking-wider md:self-center"
        >
          Add Customer
        </Button>
      </div>

      {/* Customers table */}
      <CustomerTable
        customers={filteredCustomers}
        loading={loading}
        onAddClick={() => setModalOpen(true)}
        onDelete={async (id) => {
          await deleteCustomer(id);
          fetchCustomers();
        }}
      />

      {/* Add Customer Modal */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Register Customer Profile">
        <CustomerForm onSubmit={handleCreateSubmit} onClose={() => setModalOpen(false)} />
      </Modal>
    </div>
  );
}
