import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, IndianRupee, MapPin, Clock, Users, ShieldCheck, ArrowRight, CheckCircle2, Car } from 'lucide-react';

export default function AdDetailSlideOver({ ad, isOpen, onClose, onApply, isApplied, userRole }) {
  if (!ad) return null;

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
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-200">
                    {ad.target_vehicle_type === 'AUTO_RICKSHAW' ? 'Auto Rickshaw' : ad.target_vehicle_type === 'E_RICKSHAW' ? 'E-Rickshaw' : 'Universal Fleet'}
                  </span>
                  <h3 className="text-lg font-bold text-stone-900 mt-2">
                    {ad.title}
                  </h3>
                  <p className="text-xs text-stone-500 mt-0.5">
                    By {ad.business_name || 'Verified Advertiser'}
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Body */}
              <div className="p-6 space-y-6 flex-1 overflow-y-auto">
                {/* Payout Metric Card */}
                <div className="bg-stone-50 rounded-xl p-4 border border-stone-200/80">
                  <span className="text-xs text-stone-500 font-medium">Guaranteed Monthly Payout</span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-3xl font-extrabold text-stone-900 font-display">
                      ₹{Number(ad.price).toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs text-stone-500">/ month per vehicle</span>
                  </div>
                  <p className="text-[11px] text-teal-700 mt-2 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Direct monthly UPI settlement to driver bank account
                  </p>
                </div>

                {/* Key Specifications */}
                <div className="space-y-3">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-500">
                    Campaign Specifications
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-white rounded-lg border border-stone-200 text-xs">
                      <span className="text-stone-400 block mb-0.5">Duration</span>
                      <span className="font-semibold text-stone-900 flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-stone-500" />
                        {ad.duration || '1 Month'}
                      </span>
                    </div>
                    <div className="p-3 bg-white rounded-lg border border-stone-200 text-xs">
                      <span className="text-stone-400 block mb-0.5">Target City</span>
                      <span className="font-semibold text-stone-900 flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-stone-500" />
                        {ad.city || 'Delhi NCR'}
                      </span>
                    </div>
                    <div className="p-3 bg-white rounded-lg border border-stone-200 text-xs">
                      <span className="text-stone-400 block mb-0.5">Monthly Eyeballs</span>
                      <span className="font-semibold text-stone-900 flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-stone-500" />
                        {ad.impressions_estimate || '140k+ views'}
                      </span>
                    </div>
                    <div className="p-3 bg-white rounded-lg border border-stone-200 text-xs">
                      <span className="text-stone-400 block mb-0.5">Vehicle Slots</span>
                      <span className="font-semibold text-teal-700 flex items-center gap-1.5">
                        <Car className="w-3.5 h-3.5 text-teal-700" />
                        {ad.slots_left ? `${ad.slots_left} open` : 'Open enrollment'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-500 mb-1.5">
                    Wrap Placement & Guidelines
                  </h4>
                  <p className="text-xs text-stone-600 leading-relaxed bg-stone-50/50 p-3.5 rounded-lg border border-stone-100">
                    {ad.description || 'Full vehicle rear panel wrap with passenger-facing promotional graphics. Weatherproof 3M certified wrap materials provided free of charge by advertiser.'}
                  </p>
                </div>

                {/* Free Installation Note */}
                <div className="p-3 rounded-lg bg-teal-50/60 border border-teal-100 text-xs text-teal-800 space-y-1">
                  <span className="font-semibold block">Zero Cost to Driver:</span>
                  <p className="text-[11px] text-teal-700 leading-relaxed">
                    Installation and removal are 100% free at our partner hubs. No vehicle paint damage guaranteed.
                  </p>
                </div>
              </div>

              {/* Footer CTA */}
              <div className="p-6 border-t border-stone-100 bg-stone-50/50 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-semibold text-stone-600 hover:text-stone-900 rounded-lg transition-colors"
                >
                  Close
                </button>
                {userRole === 'DRIVER' || userRole === 'PUBLIC' ? (
                  <button
                    onClick={() => {
                      onApply(ad);
                      onClose();
                    }}
                    disabled={isApplied}
                    className={`px-4 py-2 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-all shadow-xs ${
                      isApplied
                        ? 'bg-stone-200 text-stone-500 cursor-default'
                        : 'bg-teal-700 hover:bg-teal-800 text-white'
                    }`}
                  >
                    {isApplied ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                        <span>Enrolled in Campaign</span>
                      </>
                    ) : (
                      <>
                        <span>Claim Wrap Contract</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                ) : null}
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
