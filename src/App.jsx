import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useAuthStore } from './context/store';

// Pages
import {Home} from './pages/Home';
import {Login} from './pages/Login';
import {Register} from './pages/Register';
import {Dashboard} from './pages/Dashboard';
import {About} from './pages/About';

// Protected Route Component
const PrivateRoute = ({ element }) => {
  const { token } = useAuthStore();
  // If no token, send to login. If token exists, show the page.
  return token ? element : <Navigate to="/login" replace />;
};

export default function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Dashboard Routes */}
        {/* All these point to Dashboard so the layout stays consistent */}
        <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
        <Route path="/upload" element={<PrivateRoute element={<Dashboard />} />} /> 
        <Route path="/analytics" element={<PrivateRoute element={<Dashboard />} />} />
        <Route path="/settings" element={<PrivateRoute element={<Dashboard />} />} />

        {/* Fallback - Catch-all redirects to Home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}