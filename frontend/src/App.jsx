import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import { Layout } from './components/layout/Layout';
import { Dashboard } from './pages/Dashboard';
import { Products } from './pages/Products';
import { Customers } from './pages/Customers';
import { Orders } from './pages/Orders';
import { NotFound } from './pages/NotFound';
import { Login } from './pages/Login';
import { Toaster } from 'react-hot-toast';

// Secure Route boundary checking user auth state
function ProtectedRoute({ children }) {
  const { state } = useApp();
  if (!state.user) {
    return <Navigate to="/login" replace />;
  }
  return <Layout>{children}</Layout>;
}

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          {/* Guest Route */}
          <Route path="/login" element={<Login />} />

          {/* Secured App Routes wrapped in Layout */}
          <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/products" element={<ProtectedRoute><Products /></ProtectedRoute>} />
          <Route path="/customers" element={<ProtectedRoute><Customers /></ProtectedRoute>} />
          <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />

          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      
      {/* Light frosted toast notices config */}
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#ffffff',
            color: '#0f172a',
            border: '1px solid #e2e8f0',
            borderRadius: '12px',
            fontSize: '13px',
            fontWeight: '600',
            fontFamily: "'Inter', sans-serif",
            padding: '12px 16px',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.04), 0 0 1px rgba(0, 0, 0, 0.08)',
          },
        }}
      />
    </AppProvider>
  );
}
