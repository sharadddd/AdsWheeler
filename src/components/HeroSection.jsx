import React from 'react';
import { ArrowRight, ShieldCheck, TrendingUp, MapPin, Sparkles } from 'lucide-react';
import VehicleSimulator from './VehicleSimulator';

export default function HeroSection({ onExploreClick, onAdvertiserClick }) {
  return (
    <section className="relative pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Warm Studio Hero Content */}
        <div className="max-w-3xl space-y-4 mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-stone-200/90 text-xs font-semibold text-stone-700 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-teal-600" />
            <span>India's Verified Transit Rickshaw Advertising Network</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-stone-900 font-display leading-[1.15]">
            Turn daily city commutes into moving brand billboards.
          </h1>

          <p className="text-sm sm:text-base text-stone-600 font-normal leading-relaxed max-w-2xl">
            AdsWheeler connects growing consumer brands with verified Auto and E-Rickshaw drivers. Drivers earn guaranteed monthly recurring income, while brands achieve high-frequency commuter visibility.
          </p>

          {/* Action Row */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={onExploreClick}
              className="px-5 py-2.5 rounded-lg bg-teal-700 hover:bg-teal-800 text-white font-semibold text-xs transition-colors flex items-center gap-2 shadow-xs"
            >
              <span>Explore Available Ads</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={onAdvertiserClick}
              className="px-5 py-2.5 rounded-lg bg-white hover:bg-stone-50 text-stone-800 font-semibold text-xs border border-stone-200 shadow-xs transition-colors"
            >
              <span>Launch Brand Campaign</span>
            </button>
          </div>

          {/* Trust Highlights */}
          <div className="flex flex-wrap items-center gap-6 pt-4 text-xs text-stone-500 border-t border-stone-200/60">
            <span className="flex items-center gap-1.5 font-medium">
              <ShieldCheck className="w-4 h-4 text-teal-700" />
              Guaranteed Direct UPI Settlement
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <TrendingUp className="w-4 h-4 text-teal-700" />
              140k+ Daily Street Eyeballs
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <MapPin className="w-4 h-4 text-teal-700" />
              Active in Delhi NCR, Mumbai & Bengaluru
            </span>
          </div>
        </div>

        {/* Embedded Daylight Studio Simulator */}
        <div className="mt-6">
          <VehicleSimulator />
        </div>
      </div>
    </section>
  );
}
