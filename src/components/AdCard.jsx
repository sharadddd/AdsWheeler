import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IndianRupee, MapPin, Clock, Users, ArrowRight, CheckCircle2, ChevronDown, ChevronUp, Share2, Eye, Car } from 'lucide-react';

export default function AdCard({ ad, onApply, isApplied, userRole = 'DRIVER', onSelectAd }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  const getVehicleBadge = (type) => {
    switch (type) {
      case 'AUTO_RICKSHAW':
        return { label: 'Auto Rickshaw', bg: 'bg-amber-50 text-amber-800 border-amber-200' };
      case 'E_RICKSHAW':
        return { label: 'E-Rickshaw EV', bg: 'bg-emerald-50 text-emerald-800 border-emerald-200' };
      default:
        return { label: 'Universal Fleet', bg: 'bg-stone-100 text-stone-700 border-stone-200' };
    }
  };

  const badge = getVehicleBadge(ad.target_vehicle_type);

  const handleShare = (e) => {
    e.stopPropagation();
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-xl border border-stone-200/90 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between group overflow-hidden">
      <div className="p-5">
        {/* Top Badges & Pricing */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${badge.bg}`}>
            {badge.label}
          </span>

          <div className="text-right">
            <span className="text-[11px] text-stone-500 font-medium block">Driver Payout</span>
            <div className="flex items-center justify-end font-extrabold text-stone-900 text-base font-display">
              <IndianRupee className="w-3.5 h-3.5 text-teal-700" />
              <span>{Number(ad.price).toLocaleString('en-IN')}</span>
              <span className="text-xs text-stone-500 font-normal ml-0.5">/mo</span>
            </div>
          </div>
        </div>

        {/* Title & Brand */}
        <div className="mb-2">
          <div className="flex items-center gap-1.5 text-xs text-stone-500 mb-1">
            <span className="font-semibold text-stone-700">{ad.business_name || 'Verified Advertiser'}</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3 text-stone-400" />
              {ad.city || 'Delhi NCR'}
            </span>
          </div>

          <h4 className="text-sm font-bold text-stone-900 group-hover:text-teal-700 transition-colors line-clamp-1">
            {ad.title}
          </h4>
        </div>

        {/* 1-Line Clean Scannable Summary */}
        <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
          {ad.description || 'Promotional vehicle wrap campaign with verified daily commuter route impressions.'}
        </p>

        {/* Expandable Accordion Section */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="mt-4 pt-3 border-t border-stone-100 space-y-3 overflow-hidden text-xs"
            >
              <div className="grid grid-cols-2 gap-2 bg-stone-50 p-2.5 rounded-lg border border-stone-200/60 text-stone-600">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-stone-400" />
                  <span>Duration: <strong className="text-stone-800">{ad.duration || '1 Month'}</strong></span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-stone-400" />
                  <span>Reach: <strong className="text-stone-800">{ad.impressions_estimate || '140k/mo'}</strong></span>
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] text-stone-500">
                <span>Free 3M wrap installation at verified hub</span>
                <span className="font-semibold text-teal-700">Zero Driver Deposit</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer Controls & Quick Actions */}
      <div className="px-5 py-3 border-t border-stone-100 bg-stone-50/50 flex items-center justify-between gap-2">
        <div className="flex items-center gap-1">
          {/* Accordion Toggle */}
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-xs font-medium text-stone-600 hover:text-stone-900 flex items-center gap-1 py-1 px-2 rounded hover:bg-stone-200/60 transition-colors"
          >
            <span>{isExpanded ? 'Less' : 'Details'}</span>
            {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>

          {/* Quick Share */}
          <button
            type="button"
            onClick={handleShare}
            title="Copy link"
            className="p-1 rounded text-stone-400 hover:text-stone-700 hover:bg-stone-200/60 transition-colors"
          >
            <Share2 className="w-3.5 h-3.5" />
          </button>
          {copied && <span className="text-[10px] text-teal-700 font-semibold">Copied!</span>}
        </div>

        {/* Primary CTA */}
        <div className="flex items-center gap-2">
          {onSelectAd && (
            <button
              type="button"
              onClick={() => onSelectAd(ad)}
              className="text-xs font-semibold text-stone-600 hover:text-stone-900 px-2.5 py-1.5 rounded-lg border border-stone-200 bg-white hover:bg-stone-50 transition-colors"
            >
              Preview
            </button>
          )}

          <button
            type="button"
            onClick={() => onApply(ad)}
            disabled={isApplied}
            className={`py-1.5 px-3 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs ${
              isApplied
                ? 'bg-stone-200 text-stone-500 cursor-default'
                : 'bg-teal-700 hover:bg-teal-800 text-white'
            }`}
          >
            {isApplied ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                <span>Applied</span>
              </>
            ) : (
              <>
                <span>Apply</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
