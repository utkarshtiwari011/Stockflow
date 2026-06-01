import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Mail, Lock, User, UserPlus, LogIn } from 'lucide-react';
import toast from 'react-hot-toast';

export function Login() {
  const { dispatch } = useApp();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('login'); // login or signup

  // Form Fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const tempErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (activeTab === 'signup' && !fullName.trim()) {
      tempErrors.fullName = 'Full name is required';
    }

    if (!email.trim()) {
      tempErrors.email = 'E-mail is required';
    } else if (!emailRegex.test(email)) {
      tempErrors.email = 'Invalid e-mail format';
    }

    if (!password) {
      tempErrors.password = 'Password is required';
    } else if (password.length < 6) {
      tempErrors.password = 'Password must be at least 6 characters';
    }

    if (activeTab === 'signup') {
      if (password !== confirmPassword) {
        tempErrors.confirmPassword = 'Passwords do not match';
      }
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    // Simulate API delay
    setTimeout(() => {
      setLoading(false);
      try {
        const mockUser = {
          name: activeTab === 'signup' ? fullName.trim() : (email.split('@')[0]),
          email: email.trim().toLowerCase(),
          role: 'Administrator',
          initials: activeTab === 'signup' ? fullName.trim().charAt(0).toUpperCase() : email.trim().charAt(0).toUpperCase(),
        };

        dispatch({ type: 'SET_USER', payload: mockUser });
        toast.success(
          activeTab === 'signup'
            ? 'Account created successfully!'
            : 'Successfully signed in!'
        );
        navigate('/');
      } catch (err) {
        toast.error('Authentication failed');
      }
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-bgBase p-4 select-none">
      <div className="w-full max-w-md p-8 bg-bgCard border border-borderDefault rounded-2xl shadow-modalGlow flex flex-col gap-6 animate-slideUp">
        {/* Branding header */}
        <div className="flex flex-col items-center text-center gap-2">
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 text-primary glow-effect">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
              <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
              <line x1="12" y1="22.08" x2="12" y2="12"></line>
            </svg>
          </div>
          <h1 className="text-2xl font-bold font-syne text-textPrimary tracking-tight mt-1">
            StockFlow System
          </h1>
          <p className="text-xs text-textSecondary leading-none">
            Inventory & Order Management Platform
          </p>
        </div>

        {/* Tab Selection */}
        <div className="flex bg-bgBase border border-borderDefault p-1 rounded-lg">
          <button
            type="button"
            onClick={() => {
              setActiveTab('login');
              setErrors({});
            }}
            className={`flex-1 py-2 text-xs font-bold rounded-md transition-all ${
              activeTab === 'login'
                ? 'bg-bgSurface text-textPrimary border border-borderDefault shadow-sm font-extrabold'
                : 'text-textSecondary hover:text-textPrimary'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab('signup');
              setErrors({});
            }}
            className={`flex-1 py-2 text-xs font-bold rounded-md transition-all ${
              activeTab === 'signup'
                ? 'bg-bgSurface text-textPrimary border border-borderDefault shadow-sm font-extrabold'
                : 'text-textSecondary hover:text-textPrimary'
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {activeTab === 'signup' && (
            <Input
              label="Full Name"
              icon={User}
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              error={errors.fullName}
              placeholder="John Doe"
              required
            />
          )}

          <Input
            label="E-mail Address"
            type="email"
            icon={Mail}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={errors.email}
            placeholder="name@company.com"
            required
          />

          <Input
            label="Password"
            type="password"
            icon={Lock}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
            placeholder="••••••••"
            required
          />

          {activeTab === 'signup' && (
            <Input
              label="Confirm Password"
              type="password"
              icon={Lock}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              error={errors.confirmPassword}
              placeholder="••••••••"
              required
            />
          )}

          <Button
            type="submit"
            variant="primary"
            fullWidth
            loading={loading}
            icon={activeTab === 'login' ? LogIn : UserPlus}
            iconPosition="left"
            className="py-3 text-xs uppercase tracking-wider font-bold mt-2"
          >
            {activeTab === 'login' ? 'Sign In to Portal' : 'Register Account'}
          </Button>
        </form>
      </div>
    </div>
  );
}
