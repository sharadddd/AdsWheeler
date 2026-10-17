import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, IndianRupee, Layers } from 'lucide-react';

export default function CreateAdModal({ isOpen, onClose, onCreateAd }) {
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
        business_name: formData.business_name || 'Enterprise Brand',
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-sm"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="bg-[#15181E] rounded-xl w-full max-w-lg border border-white/[0.08] ring-1 ring-inset ring-white/10 p-6 relative shadow-2xl z-10 space-y-5"
          >
            <div className="flex justify-between items-center pb-3 border-b border-white/[0.08]">
              <div>
                <h3 className="text-base font-semibold text-white font-display">Create Transit Campaign</h3>
                <p className="text-zinc-400 text-xs mt-0.5">Deploy physical fleet advertising inventory</p>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg bg-[#0D0F12] hover:bg-[#1C2028] text-zinc-400 hover:text-white border border-white/[0.08] transition-colors"
                aria-label="Close dialog"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-1">
                  Brand / Corporation *
                </label>
                <input
                  type="text"
                  required
                  value={formData.business_name}
                  onChange={(e) => setFormData({ ...formData, business_name: e.target.value })}
                  placeholder="e.g. Swiggy Instamart"
                  className="w-full bg-[#0D0F12] border border-white/[0.08] ring-1 ring-inset ring-white/[0.04] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#F59E0B] focus:ring-1 focus:ring-[#F59E0B]/30"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-1">
                  Campaign Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Q3 Monsoon Expansion Promotion"
                  className="w-full bg-[#0D0F12] border border-white/[0.08] ring-1 ring-inset ring-white/[0.04] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#F59E0B] focus:ring-1 focus:ring-[#F59E0B]/30"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-1">
                    Fleet Chassis Type
                  </label>
                  <select
                    value={formData.target_vehicle_type}
                    onChange={(e) => setFormData({ ...formData, target_vehicle_type: e.target.value })}
                    className="w-full bg-[#0D0F12] border border-white/[0.08] ring-1 ring-inset ring-white/[0.04] rounded-lg px-3 py-2 text-xs text-zinc-300 focus:outline-none focus:border-[#F59E0B]"
                  >
                    <option value="AUTO_RICKSHAW">CNG Auto Rickshaw</option>
                    <option value="E_RICKSHAW">E-Rickshaw (EV)</option>
                    <option value="BOTH">Universal Wrap (Both)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-1">
                    Monthly Yield / Unit (₹) *
                  </label>
                  <div className="relative">
                    <IndianRupee className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="number"
                      required
                      min="1000"
                      step="100"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      className="w-full bg-[#0D0F12] border border-white/[0.08] ring-1 ring-inset ring-white/[0.04] rounded-lg pl-8 pr-3 py-2 text-xs text-white font-mono font-semibold focus:outline-none focus:border-[#F59E0B]"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-1">
                    Campaign Term
                  </label>
                  <select
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    className="w-full bg-[#0D0F12] border border-white/[0.08] ring-1 ring-inset ring-white/[0.04] rounded-lg px-3 py-2 text-xs text-zinc-300 focus:outline-none focus:border-[#F59E0B]"
                  >
                    <option value="1 Month">1 Month</option>
                    <option value="2 Months">2 Months</option>
                    <option value="3 Months">3 Months</option>
                    <option value="6 Months">6 Months</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-1">
                    Target Metro Zone
                  </label>
                  <select
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full bg-[#0D0F12] border border-white/[0.08] ring-1 ring-inset ring-white/[0.04] rounded-lg px-3 py-2 text-xs text-zinc-300 focus:outline-none focus:border-[#F59E0B]"
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
                <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-1">
                  Installation Guidelines & Notes
                </label>
                <textarea
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Outline vinyl wrap specifications, high-visibility corridors, etc."
                  className="w-full bg-[#0D0F12] border border-white/[0.08] ring-1 ring-inset ring-white/[0.04] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#F59E0B]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2.5 px-4 rounded-lg bg-[#F59E0B] hover:bg-[#D97706] text-[#0D0F12] font-semibold text-xs transition-colors flex items-center justify-center gap-2"
                >
                  {loading ? 'Publishing to Network...' : 'Commit Campaign to Ledger'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
