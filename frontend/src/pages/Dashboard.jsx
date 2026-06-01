import React, { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';
import { StatCard } from '../components/ui/StatCard';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Spinner } from '../components/ui/Spinner';
import { EmptyState } from '../components/ui/EmptyState';
import { Button } from '../components/ui/Button';
import { dashboardAPI } from '../api/dashboard';
import { useProducts } from '../hooks/useProducts';
import { Modal } from '../components/ui/Modal';
import { ProductForm } from '../components/products/ProductForm';
import {
  Package,
  Users,
  ShoppingCart,
  DollarSign,
  AlertTriangle,
  ArrowUpRight,
  TrendingUp,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export function Dashboard() {
  const { state } = useApp();
  const { globalSearch } = state;

  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  // For updating product stock directly from low stock alert panel
  const { updateProduct } = useProducts();
  const [editingProduct, setEditingProduct] = useState(null);

  const fetchStats = async () => {
    try {
      const res = await dashboardAPI.getStats();
      setStats(res.data);
    } catch (err) {
      // Global axios error catches this
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const handleStockUpdateSuccess = () => {
    setEditingProduct(null);
    setLoading(true);
    fetchStats();
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3 select-none">
        <Spinner size="lg" />
        <span className="text-xs font-semibold text-textSecondary uppercase tracking-widest animate-pulse">
          Loading SaaS Analytics...
        </span>
      </div>
    );
  }

  const {
    total_products = 0,
    total_customers = 0,
    total_orders = 0,
    total_revenue = 0.0,
    low_stock_products = [],
    recent_orders = [],
  } = stats || {};

  // Filter low stock products based on global search
  const filteredLowStock = low_stock_products.filter((p) => {
    if (!globalSearch.trim()) return true;
    const term = globalSearch.trim().toLowerCase();
    return p.name.toLowerCase().includes(term) || p.sku.toLowerCase().includes(term);
  });

  // Filter recent orders based on global search
  const filteredRecentOrders = recent_orders.filter((o) => {
    if (!globalSearch.trim()) return true;
    const term = globalSearch.trim().toLowerCase();
    const orderIdStr = `#sf-${String(o.id).padStart(4, '0')}`;
    return (
      o.customer_name.toLowerCase().includes(term) ||
      orderIdStr.includes(term) ||
      o.status.toLowerCase().includes(term)
    );
  });

  // Formulate mock chart data from recent orders or custom lists
  const chartData = recent_orders
    .map((o) => ({
      name: `Order #${o.id}`,
      amount: o.total_amount,
    }))
    .reverse();

  return (
    <div className="flex flex-col gap-6 md:gap-8 select-none">
      {/* Welcome banner */}
      <div className="flex flex-col text-left">
        <h2 className="text-2xl md:text-3xl font-extrabold font-syne text-textPrimary tracking-tight">
          Welcome back 👋
        </h2>
        <p className="text-xs md:text-sm text-textSecondary mt-1">
          Here is what is happening across your warehouse system today.
        </p>
      </div>

      {/* Row 1: Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <StatCard
          title="Total Products"
          value={total_products}
          icon={Package}
          iconBg="bg-primary/10 text-primary border border-primary/20"
          trend={{ value: 12.5, positive: true }}
        />
        <StatCard
          title="Registered Customers"
          value={total_customers}
          icon={Users}
          iconBg="bg-green-500/10 text-success border border-green-500/20"
          trend={{ value: 8.3, positive: true }}
        />
        <StatCard
          title="Orders Fulfilled"
          value={total_orders}
          icon={ShoppingCart}
          iconBg="bg-amber-500/10 text-warning border border-amber-500/20"
          trend={{ value: 18.2, positive: true }}
        />
        <StatCard
          title="Gross Revenue"
          value={formatPrice(total_revenue)}
          icon={DollarSign}
          iconBg="bg-purple-500/10 text-purple-400 border border-purple-500/20"
          trend={{ value: 24.1, positive: true }}
        />
      </div>

      {/* Row 2: Low Stock Alerts and Recent Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Low Stock Card */}
        <Card
          title="Critical Low Stock Alerts"
          action={
            filteredLowStock.length > 0 && (
              <div className="flex items-center gap-1 text-xs text-warning font-semibold animate-pulse">
                <AlertTriangle size={14} /> Action Required
              </div>
            )
          }
        >
          {filteredLowStock.length === 0 ? (
            <EmptyState
              icon={Package}
              title="All Stocked Perfectly"
              description="No products match your search or require warnings. All items are fully stocked."
            />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-textSecondary border-collapse">
                <thead>
                  <tr className="border-b border-borderDefault text-textMuted uppercase tracking-wider font-bold">
                    <th className="pb-3 pr-4">Product Details</th>
                    <th className="pb-3 px-4 text-center">Available</th>
                    <th className="pb-3 pl-4 text-right">Adjust Stock</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-borderSubtle">
                  {filteredLowStock.map((p) => (
                    <tr key={p.id} className="hover:bg-white/[0.01]">
                      <td className="py-3.5 pr-4">
                        <div className="flex flex-col gap-0.5">
                          <span className="font-bold text-textPrimary">{p.name}</span>
                          <span className="text-[10px] text-textMuted font-mono uppercase tracking-wider">
                            SKU: {p.sku}
                          </span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <span className="pulsing-dot-amber" />
                          <Badge variant="warning">{p.quantity} left</Badge>
                        </div>
                      </td>
                      <td className="py-3.5 pl-4 text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setEditingProduct(p)}
                          className="py-1 px-2.5 text-[10px] h-auto tracking-wider uppercase font-bold"
                        >
                          Quick Add
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>

        {/* Recent Orders Card */}
        <Card
          title="Recent Orders"
          action={
            <span className="flex items-center text-xs text-textSecondary font-semibold gap-1">
              Live Feed <ArrowUpRight size={14} />
            </span>
          }
        >
          {filteredRecentOrders.length === 0 ? (
            <EmptyState
              icon={ShoppingCart}
              title="No Sales Registered"
              description="No orders match your search or have been processed yet."
            />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-textSecondary border-collapse">
                <thead>
                  <tr className="border-b border-borderDefault text-textMuted uppercase tracking-wider font-bold">
                    <th className="pb-3 pr-4">Order ID</th>
                    <th className="pb-3 px-4">Customer</th>
                    <th className="pb-3 px-4 text-right">Gross Total</th>
                    <th className="pb-3 pl-4 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-borderSubtle">
                  {filteredRecentOrders.map((o) => (
                    <tr key={o.id} className="hover:bg-white/[0.01]">
                      <td className="py-3.5 pr-4">
                        <span className="font-mono font-bold bg-bgCard px-2 py-0.5 rounded border border-borderDefault">
                          #SF-{String(o.id).padStart(4, '0')}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="font-bold text-textPrimary">{o.customer_name}</span>
                      </td>
                      <td className="py-3.5 px-4 text-right font-mono font-bold text-textPrimary">
                        {formatPrice(o.total_amount)}
                      </td>
                      <td className="py-3.5 pl-4 text-right">
                        <Badge variant={o.status === 'cancelled' ? 'danger' : 'success'}>
                          {o.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      </div>

      {/* Row 3: Recharts Performance bar graph */}
      <Card
        title="Warehouse Sales & Operations Performance"
        action={
          <span className="flex items-center gap-1.5 text-xs text-success font-semibold leading-none">
            <TrendingUp size={14} /> +24% Growth
          </span>
        }
      >
        <div className="w-full h-80 pt-4 select-none">
          {chartData.length === 0 ? (
            <EmptyState
              icon={DollarSign}
              title="Awaiting Sales Data"
              description="Analytics will populate automatically here once orders are processed."
            />
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.45}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e1e2e" vertical={false} />
                <XAxis
                  dataKey="name"
                  stroke="#94a3b8"
                  fontSize={10}
                  fontWeight={600}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#94a3b8"
                  fontSize={10}
                  fontWeight={600}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(val) => `$${val}`}
                />
                <Tooltip
                  cursor={{ stroke: '#6366f1', strokeWidth: 1.5, strokeDasharray: '3 3' }}
                  contentStyle={{
                    background: '#16161f',
                    borderColor: '#1e1e2e',
                    borderRadius: '8px',
                    fontSize: '11px',
                    color: '#f1f5f9',
                    fontFamily: 'monospace',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="amount"
                  stroke="#6366f1"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#colorAmount)"
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>
      </Card>

      {/* Quick Add modal dialog for low stock levels adjustment */}
      {editingProduct && (
        <Modal
          isOpen={true}
          onClose={() => setEditingProduct(null)}
          title={`Quick Adjust Stock: ${editingProduct.name}`}
        >
          <ProductForm
            product={editingProduct}
            onSubmit={(payload) => updateProduct(editingProduct.id, payload)}
            onSuccess={handleStockUpdateSuccess}
            onClose={() => setEditingProduct(null)}
          />
        </Modal>
      )}
    </div>
  );
}
