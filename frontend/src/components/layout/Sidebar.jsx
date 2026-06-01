import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Package, Users, ShoppingCart, X } from 'lucide-react';
import clsx from 'clsx';

export function Sidebar({ isOpen, onClose }) {
  const navItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Products', path: '/products', icon: Package },
    { name: 'Customers', path: '/customers', icon: Users },
    { name: 'Orders', path: '/orders', icon: ShoppingCart },
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full bg-bgSurface border-r border-borderDefault">
      {/* Logo branding section */}
      <div className="flex items-center justify-between px-6 h-[60px] border-b border-borderDefault">
        <div className="flex items-center gap-2.5 group">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 text-primary transition-all duration-300 group-hover:shadow-[0_0_15px_rgba(99,102,241,0.5)] group-hover:bg-primary/20">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4.5 h-4.5">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
              <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
              <line x1="12" y1="22.08" x2="12" y2="12"></line>
            </svg>
          </div>
          <span className="font-syne font-extrabold text-lg bg-gradient-to-r from-textPrimary via-textPrimary to-primary/80 bg-clip-text text-transparent select-none">
            StockFlow
          </span>
        </div>

        {/* Mobile close button */}
        {isOpen && (
          <button
            onClick={onClose}
            className="md:hidden text-textSecondary hover:text-textPrimary p-1 hover:bg-white/5 rounded-lg transition-colors"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* Navigation links */}
      <nav className="flex-1 px-4 py-6 flex flex-col gap-1.5 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            onClick={isOpen ? onClose : undefined}
            className={({ isActive }) =>
              clsx(
                'flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-150 relative border border-transparent',
                isActive
                  ? 'bg-primary/10 text-white border-primary/20 glow-effect font-bold shadow-[0_0_15px_rgba(99,102,241,0.06)]'
                  : 'text-textSecondary hover:text-textPrimary hover:bg-white/[0.04]'
              )
            }
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <div className="absolute left-0 top-1/4 bottom-1/4 w-[3px] rounded-r bg-primary" />
                )}
                <item.icon size={18} className={clsx(isActive ? 'text-primary' : 'text-textSecondary')} />
                <span>{item.name}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Version footer */}
      <div className="px-6 py-4.5 border-t border-borderDefault flex items-center justify-between text-xs text-textMuted font-bold uppercase tracking-widest bg-bgCard/10">
        <span>SaaS Client</span>
        <span className="bg-bgCard border border-borderDefault px-2 py-0.5 rounded text-[10px] text-textSecondary">
          v1.0.0
        </span>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar (Fixed) */}
      <aside className="hidden md:flex flex-col w-[240px] h-screen flex-shrink-0 select-none">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Sidebar */}
      <div
        className={clsx(
          'fixed inset-0 z-40 md:hidden transition-opacity duration-300',
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
      >
        {/* Mobile backdrop */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" onClick={onClose} />

        {/* Sliding Panel */}
        <aside
          className={clsx(
            'absolute top-0 bottom-0 left-0 w-[240px] transition-transform duration-300 ease-out z-50 flex flex-col',
            isOpen ? 'translate-x-0' : '-translate-x-full'
          )}
        >
          {sidebarContent}
        </aside>
      </div>
    </>
  );
}
