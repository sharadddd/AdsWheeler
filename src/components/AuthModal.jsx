import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, ShieldCheck, Car, Building2, User, Lock, Mail, Phone, MapPin } from 'lucide-react';
import { apiLogin, apiRegister } from '../api/client';

export default function AuthModal({ isOpen, onClose, onAuthSuccess, initialMode = 'login', initialRole = 'DRIVER' }) {
  const [mode, setMode] = useState(initialMode); // 'login' | 'signup'
  const [role, setRole] = useState(initialRole); // 'DRIVER' | 'PUBLISHER'
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: 'password123',
    vehicle_type: 'AUTO_RICKSHAW',
    vehicle_registration_number: 'DL 1RA 4892',
    city: 'New Delhi',
    business_name: '',
    business_category: 'Food & Beverage'
  });

  if (!isOpen) return null;

  // Handle Quick Demo Login
  const handleDemoLogin = async (demoRole) => {
    setLoading(true);
    setError('');
    try {
      const email = demoRole === 'DRIVER' ? 'rajesh.auto@gmail.com' : 'ads@zomato.com';
      const res = await apiLogin({ email, password: 'password123', role: demoRole });
      if (res.success) {
        onAuthSuccess(res.user);
        onClose();
      }
    } catch (err) {
      setError(err.message || 'Demo login failed');
    } finally {
      setLoading(false);
    }
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (mode === 'login') {
        const res = await apiLogin({
          email: formData.email,
          password: formData.password,
          role
        });
        if (res.success) {
          onAuthSuccess(res.user);
          onClose();
        }
      } else {
        // Register
        const res = await apiRegister({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
          role,
          driver_profile: role === 'DRIVER' ? {
            vehicle_type: formData.vehicle_type,
            vehicle_registration_number: formData.vehicle_registration_number,
            city: formData.city
          } : undefined,
          publisher_profile: role === 'PUBLISHER' ? {
            business_name: formData.business_name || formData.name,
            business_category: formData.business_category,
            city: formData.city
          } : undefined
        });
        if (res.success) {
          onAuthSuccess(res.user);
          onClose();
        }
      }
    } catch (err) {
      setError(err.message || 'Authentication error. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-stone-900/40 backdrop-blur-xs"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.98, y: 10 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="bg-white rounded-2xl w-full max-w-md border border-stone-200 shadow-xl p-6 relative z-10 max-h-[92vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-stone-100">
            <div>
              <h3 className="text-lg font-bold text-stone-900">
                {mode === 'login' ? 'Welcome back to AdsWheeler' : 'Create your AdsWheeler account'}
              </h3>
              <p className="text-xs text-stone-500 mt-0.5">
                {mode === 'login' ? 'Enter your details to access your dashboard' : 'Start earning or launching campaigns in minutes'}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick 1-Click Demo Buttons */}
          <div className="mt-4 p-3 bg-stone-50 rounded-xl border border-stone-200/80 space-y-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-stone-500 block">
              1-Click Instant Demo Login:
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleDemoLogin('DRIVER')}
                disabled={loading}
                className="py-2 px-2.5 rounded-lg bg-white border border-stone-200 hover:border-teal-700 text-xs font-semibold text-stone-800 hover:text-teal-700 transition-all flex items-center justify-center gap-1.5 shadow-xs"
              >
                <Car className="w-3.5 h-3.5 text-teal-700" />
                <span>Driver: Rajesh</span>
              </button>
              <button
                type="button"
                onClick={() => handleDemoLogin('PUBLISHER')}
                disabled={loading}
                className="py-2 px-2.5 rounded-lg bg-white border border-stone-200 hover:border-teal-700 text-xs font-semibold text-stone-800 hover:text-teal-700 transition-all flex items-center justify-center gap-1.5 shadow-xs"
              >
                <Building2 className="w-3.5 h-3.5 text-stone-700" />
                <span>Brand: Zomato</span>
              </button>
            </div>
          </div>

          {/* Role Pill Switcher */}
          <div className="mt-4">
            <label className="block text-xs font-medium text-stone-700 mb-1.5">
              Account Type
            </label>
            <div className="grid grid-cols-2 gap-1.5 bg-stone-100 p-1 rounded-lg">
              <button
                type="button"
                onClick={() => setRole('DRIVER')}
                className={`py-1.5 text-xs font-semibold rounded-md transition-all flex items-center justify-center gap-1.5 ${
                  role === 'DRIVER'
                    ? 'bg-white text-stone-900 shadow-xs'
                    : 'text-stone-500 hover:text-stone-800'
                }`}
              >
                <Car className="w-3.5 h-3.5" />
                <span>Auto Driver</span>
              </button>
              <button
                type="button"
                onClick={() => setRole('PUBLISHER')}
                className={`py-1.5 text-xs font-semibold rounded-md transition-all flex items-center justify-center gap-1.5 ${
                  role === 'PUBLISHER'
                    ? 'bg-white text-stone-900 shadow-xs'
                    : 'text-stone-500 hover:text-stone-800'
                }`}
              >
                <Building2 className="w-3.5 h-3.5" />
                <span>Brand / Advertiser</span>
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-4 space-y-3">
            {error && (
              <div className="p-2.5 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700">
                {error}
              </div>
            )}

            {mode === 'signup' && (
              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Rajesh Sharma"
                    className="w-full bg-white border border-stone-200 rounded-lg pl-9 pr-3 py-2 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-teal-700/20 focus:border-teal-700"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1">
                Email Address *
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder={role === 'DRIVER' ? 'rajesh.auto@gmail.com' : 'ads@zomato.com'}
                  className="w-full bg-white border border-stone-200 rounded-lg pl-9 pr-3 py-2 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-teal-700/20 focus:border-teal-700"
                />
              </div>
            </div>

            {mode === 'signup' && (
              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  Mobile Number *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 9876543210"
                    className="w-full bg-white border border-stone-200 rounded-lg pl-9 pr-3 py-2 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-teal-700/20 focus:border-teal-700"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1">
                Password *
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="••••••••"
                  className="w-full bg-white border border-stone-200 rounded-lg pl-9 pr-3 py-2 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-teal-700/20 focus:border-teal-700"
                />
              </div>
            </div>

            {mode === 'signup' && role === 'DRIVER' && (
              <div className="grid grid-cols-2 gap-2 pt-1">
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Chassis
                  </label>
                  <select
                    value={formData.vehicle_type}
                    onChange={(e) => setFormData({ ...formData, vehicle_type: e.target.value })}
                    className="w-full bg-white border border-stone-200 rounded-lg px-2.5 py-2 text-xs text-stone-900 focus:outline-none focus:border-teal-700"
                  >
                    <option value="AUTO_RICKSHAW">Auto Rickshaw (CNG)</option>
                    <option value="E_RICKSHAW">E-Rickshaw (Electric)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    City Route
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="New Delhi"
                    className="w-full bg-white border border-stone-200 rounded-lg px-2.5 py-2 text-xs text-stone-900 focus:outline-none focus:border-teal-700"
                  />
                </div>
              </div>
            )}

            {mode === 'signup' && role === 'PUBLISHER' && (
              <div className="space-y-2 pt-1">
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Company / Brand Name
                  </label>
                  <input
                    type="text"
                    value={formData.business_name}
                    onChange={(e) => setFormData({ ...formData, business_name: e.target.value })}
                    placeholder="e.g. Fresh Grocery Mart"
                    className="w-full bg-white border border-stone-200 rounded-lg px-3 py-2 text-xs text-stone-900 focus:outline-none focus:border-teal-700"
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-3 py-2.5 px-4 rounded-lg bg-teal-700 hover:bg-teal-800 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-colors shadow-xs"
            >
              {loading ? (
                <span>Processing...</span>
              ) : (
                <>
                  <span>{mode === 'login' ? 'Sign In to Dashboard' : 'Create Account'}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Toggle between Login and Signup */}
          <div className="mt-4 pt-3 border-t border-stone-100 text-center text-xs text-stone-500">
            {mode === 'login' ? (
              <span>
                Don't have an account yet?{' '}
                <button
                  type="button"
                  onClick={() => setMode('signup')}
                  className="font-semibold text-teal-700 hover:underline"
                >
                  Create free account
                </button>
              </span>
            ) : (
              <span>
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => setMode('login')}
                  className="font-semibold text-teal-700 hover:underline"
                >
                  Sign in here
                </button>
              </span>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
