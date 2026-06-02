import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Bell, Menu, Search, LogOut, User, Check } from 'lucide-react';
import { Modal } from '../ui/Modal';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import toast from 'react-hot-toast';

export function Topbar({ onMenuToggle }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { state, dispatch } = useApp();
  const { user, globalSearch } = state;

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [editName, setEditName] = useState('');

  const dropdownRef = useRef(null);

  // Initialize name input on opening
  useEffect(() => {
    if (user) {
      setEditName(user.name);
    }
  }, [user, profileModalOpen]);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Compute page title based on path
  const getPageTitle = () => {
    switch (location.pathname) {
      case '/':
        return 'Dashboard';
      case '/products':
        return 'Products';
      case '/customers':
        return 'Customers';
      case '/orders':
        return 'Orders';
      default:
        return 'Page Details';
    }
  };

  const handleSignOut = () => {
    dispatch({ type: 'SET_USER', payload: null });
    dispatch({ type: 'SET_GLOBAL_SEARCH', payload: '' });
    setDropdownOpen(false);
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    if (!editName.trim()) {
      toast.error('Name cannot be empty');
      return;
    }

    const updatedUser = {
      ...user,
      name: editName.trim(),
      initials: editName.trim().charAt(0).toUpperCase(),
    };

    dispatch({ type: 'SET_USER', payload: updatedUser });
    toast.success('Profile updated successfully!');
    setProfileModalOpen(false);
  };

  return (
    <header className="flex items-center justify-between px-6 h-[60px] bg-bgSurface border-b border-borderDefault select-none w-full relative z-30">
      {/* Page Title & Hamburger */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuToggle}
          className="md:hidden text-textSecondary hover:text-textPrimary p-1 hover:bg-white/5 rounded-lg transition-colors focus:outline-none"
        >
          <Menu size={20} />
        </button>
        <h1 className="text-xl font-bold font-syne text-textPrimary tracking-tight">
          {getPageTitle()}
        </h1>
      </div>

      {/* Action center */}
      <div className="flex items-center gap-4">
        {/* Active Search bar linked to AppContext global search */}
        <div className="relative hidden sm:flex items-center">
          <Search size={14} className="absolute left-3.5 text-textMuted" />
          <input
            type="text"
            placeholder="Search directory..."
            value={globalSearch}
            onChange={(e) => dispatch({ type: 'SET_GLOBAL_SEARCH', payload: e.target.value })}
            className="w-48 px-3.5 py-1.5 pl-9 bg-bgBase border border-borderDefault rounded-lg text-xs text-textPrimary placeholder:text-textMuted focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-all"
          />
        </div>

        {/* Notifications trigger */}
        <button className="relative p-2 text-textSecondary hover:text-textPrimary hover:bg-white/5 rounded-lg transition-colors focus:outline-none">
          <Bell size={16} />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-primary glow-effect animate-pulse" />
        </button>

        {/* Divider */}
        <div className="h-4 w-px bg-borderDefault" />

        {/* Interactive User profile avatar dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen((prev) => !prev)}
            className="flex items-center gap-2.5 hover:opacity-85 focus:outline-none transition-opacity"
          >
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary text-white font-bold text-xs glow-effect">
              {user ? user.initials : 'U'}
            </div>
          </button>

          {/* Floating Dropdown Panel (Re-styled for original premium Dark theme) */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2.5 w-56 bg-bgCard border border-borderDefault rounded-xl shadow-modalGlow py-1.5 z-50 animate-fadeIn">
              <div className="px-4 py-2 border-b border-borderDefault text-left flex flex-col gap-0.5">
                <span className="text-xs font-bold text-textPrimary">
                  {user ? user.name : 'Utkarsh'}
                </span>
                <span className="text-[10px] text-textSecondary font-semibold truncate">
                  {user ? user.email : 'utkarsh@stockflow.com'}
                </span>
              </div>

              <div className="py-1">
                <button
                  type="button"
                  onClick={() => {
                    setProfileModalOpen(true);
                    setDropdownOpen(false);
                  }}
                  className="flex items-center gap-2.5 w-full px-4 py-2 text-left text-xs font-semibold text-textSecondary hover:bg-white/5 hover:text-textPrimary transition-colors"
                >
                  <User size={14} /> Profile Settings
                </button>
              </div>

            </div>
          )}
        </div>
      </div>

      {/* Active Profile Settings Modal Panel */}
      {profileModalOpen && (
        <Modal
          isOpen={true}
          onClose={() => setProfileModalOpen(false)}
          title="Profile Settings"
          size="sm"
        >
          <form onSubmit={handleSaveProfile} className="flex flex-col gap-4">
            <Input
              label="Display Name"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              placeholder="Your Name"
              required
            />
            <Input
              label="E-mail Address"
              value={user ? user.email : ''}
              disabled
              className="opacity-70 cursor-not-allowed"
            />
            <Input
              label="Permissions Role"
              value={user ? user.role : 'Administrator'}
              disabled
              className="opacity-70 cursor-not-allowed"
            />
            
            <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-borderDefault mt-2">
              <Button variant="ghost" size="sm" onClick={() => setProfileModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" size="sm" icon={Check} iconPosition="left">
                Save Profile
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </header>
  );
}
