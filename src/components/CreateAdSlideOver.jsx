import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, IndianRupee, Layers, CheckCircle2 } from 'lucide-react';

export default function CreateAdSlideOver({ isOpen, onClose, onCreateAd }) {
  const [formData, setFormData] = useState({
    title: '',
    business_name: '',
    description: '',
    price: '4000',
    target_vehicle_type: 'AUTO_RICKSHAW',
    duration: '1 Month',
    city: 'Delhi NCR'
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.price) return;

    setLoading(true);
    try {
      await onCreateAd({
        publisher_id: 1,
        business_name: formData.business_name || 'Consumer Brand',
        title: formData.title,
        description: formData.description,
        price: Number(formData.price),
        target_vehicle_type: formData.target_vehicle_type,
        duration: formData.duration,
        city: formData.city,
        status: 'PUBLISHED'
      });
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-stone-900/30 backdrop-blur-xs transition-opacity"
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="w-screen max-w-md bg-white border-l border-stone-200 shadow-xl flex flex-col justify-between"
            >
              {/* Header */}
              <div className="p-6 border-b border-stone-100 flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-stone-900">
                    Launch Transit Ad Campaign
                  </h3>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Deploy your brand wraps across verified auto rickshaws
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Form Content */}
              <form onSubmit={handleSubmit} className="p-6 space-y-4 flex-1 overflow-y-auto">
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Brand / Business Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.business_name}
                    onChange={(e) => setFormData({ ...formData, business_name: e.target.value })}
                    placeholder="e.g. Swiggy Instamart"
                    className="w-full bg-stone-50/50 border border-stone-200 rounded-lg px-3 py-2 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-teal-700/20 focus:border-teal-700"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Campaign Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. Monsoon 50% Off Dining Offer"
                    className="w-full bg-stone-50/50 border border-stone-200 rounded-lg px-3 py-2 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-teal-700/20 focus:border-teal-700"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-1">
                      Vehicle Type
                    </label>
                    <select
                      value={formData.target_vehicle_type}
                      onChange={(e) => setFormData({ ...formData, target_vehicle_type: e.target.value })}
                      className="w-full bg-stone-50/50 border border-stone-200 rounded-lg px-2.5 py-2 text-xs text-stone-800 focus:outline-none focus:border-teal-700"
                    >
                      <option value="AUTO_RICKSHAW">Auto Rickshaw</option>
                      <option value="E_RICKSHAW">E-Rickshaw (EV)</option>
                      <option value="BOTH">Universal (Both)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-1">
                      Driver Payout (₹) *
                    </label>
                    <div className="relative">
                      <IndianRupee className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="number"
                        required
                        min="1000"
                        step="100"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                        className="w-full bg-stone-50/50 border border-stone-200 rounded-lg pl-8 pr-3 py-2 text-xs text-stone-900 font-semibold focus:outline-none focus:border-teal-700"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-1">
                      Duration
                    </label>
                    <select
                      value={formData.duration}
                      onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                      className="w-full bg-stone-50/50 border border-stone-200 rounded-lg px-2.5 py-2 text-xs text-stone-800 focus:outline-none focus:border-teal-700"
                    >
                      <option value="1 Month">1 Month</option>
                      <option value="2 Months">2 Months</option>
                      <option value="3 Months">3 Months</option>
                      <option value="6 Months">6 Months</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-1">
                      Metro City
                    </label>
                    <select
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full bg-stone-50/50 border border-stone-200 rounded-lg px-2.5 py-2 text-xs text-stone-800 focus:outline-none focus:border-teal-700"
                    >
                      <option value="Delhi NCR">Delhi NCR</option>
                      <option value="Mumbai">Mumbai</option>
                      <option value="Bengaluru">Bengaluru</option>
                      <option value="Hyderabad">Hyderabad</option>
                      <option value="Pune">Pune</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Wrap Description & Guidelines
                  </label>
                  <textarea
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Specify promotional message, target passenger routes, QR code offers..."
                    className="w-full bg-stone-50/50 border border-stone-200 rounded-lg px-3 py-2 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-teal-700/20 focus:border-teal-700"
                  />
                </div>
              </form>

              {/* Footer Actions */}
              <div className="p-6 border-t border-stone-100 flex items-center justify-end gap-3 bg-stone-50/50">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-semibold text-stone-600 hover:text-stone-900 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="px-4 py-2 bg-teal-700 hover:bg-teal-800 text-white font-semibold text-xs rounded-lg transition-colors shadow-xs flex items-center gap-1.5"
                >
                  {loading ? 'Publishing...' : 'Publish Campaign'}
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
