import React, { useState } from 'react';
import { IndianRupee, ArrowRight, Car, Zap, ShieldCheck, Fuel } from 'lucide-react';

export default function EarningsCalculator({ onApplyClick }) {
  const [vehicle, setVehicle] = useState('AUTO_RICKSHAW');
  const [dailyKm, setDailyKm] = useState(80);
  const [activeMonths, setActiveMonths] = useState(6);

  const baseRate = vehicle === 'AUTO_RICKSHAW' ? 45 : 40;
  const monthlyEst = Math.round(3000 + (dailyKm - 40) * baseRate);
  const totalEst = monthlyEst * activeMonths;
  const fuelSavingsEst = Math.round(monthlyEst * 0.35);

  return (
    <div className="bg-white rounded-xl p-6 lg:p-8 border border-stone-200/90 shadow-xs my-10">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 pb-4">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-200">
              Driver Income Estimator
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900 font-display mt-1.5">
              Calculate Your Extra Monthly Earnings
            </h2>
          </div>
          <p className="text-xs text-stone-500 max-w-xs self-start sm:self-auto">
            Zero upfront fee. No route deviations. Just paste certified brand wraps on your vehicle.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Controls */}
          <div className="lg:col-span-7 space-y-5 bg-stone-50/70 p-5 rounded-xl border border-stone-200/70">
            {/* Vehicle Selector */}
            <div>
              <label className="text-xs font-semibold text-stone-700 block mb-2">
                Select Vehicle Type
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setVehicle('AUTO_RICKSHAW')}
                  className={`p-3 rounded-lg border text-left transition-all ${
                    vehicle === 'AUTO_RICKSHAW'
                      ? 'border-teal-700 bg-white text-stone-900 shadow-xs ring-1 ring-teal-700/20'
                      : 'border-stone-200 bg-white/60 text-stone-600 hover:bg-white'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Car className="w-4 h-4 text-teal-700" />
                    <span className="text-xs font-bold text-stone-900">Auto Rickshaw</span>
                  </div>
                  <span className="text-[11px] text-stone-500 block">CNG / Petrol Auto</span>
                </button>

                <button
                  type="button"
                  onClick={() => setVehicle('E_RICKSHAW')}
                  className={`p-3 rounded-lg border text-left transition-all ${
                    vehicle === 'E_RICKSHAW'
                      ? 'border-teal-700 bg-white text-stone-900 shadow-xs ring-1 ring-teal-700/20'
                      : 'border-stone-200 bg-white/60 text-stone-600 hover:bg-white'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Zap className="w-4 h-4 text-teal-700" />
                    <span className="text-xs font-bold text-stone-900">E-Rickshaw</span>
                  </div>
                  <span className="text-[11px] text-stone-500 block">Battery EV Toto</span>
                </button>
              </div>
            </div>

            {/* Daily Distance Slider */}
            <div>
              <div className="flex justify-between items-center mb-1.5 text-xs">
                <span className="font-semibold text-stone-700">Daily Driving Mileage</span>
                <span className="font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                  {dailyKm} km / day
                </span>
              </div>
              <input
                type="range"
                min="40"
                max="150"
                step="5"
                value={dailyKm}
                onChange={(e) => setDailyKm(Number(e.target.value))}
                className="w-full h-1.5 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-teal-700"
              />
              <div className="flex justify-between text-[11px] text-stone-500 mt-1">
                <span>40 km (Part-time)</span>
                <span>80 km (Regular)</span>
                <span>150 km (Full-time)</span>
              </div>
            </div>

            {/* Campaign Duration Slider */}
            <div>
              <div className="flex justify-between items-center mb-1.5 text-xs">
                <span className="font-semibold text-stone-700">Campaign Commitment</span>
                <span className="font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                  {activeMonths} Months
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="12"
                step="1"
                value={activeMonths}
                onChange={(e) => setActiveMonths(Number(e.target.value))}
                className="w-full h-1.5 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-teal-700"
              />
              <div className="flex justify-between text-[11px] text-stone-500 mt-1">
                <span>1 Month trial</span>
                <span>6 Months</span>
                <span>12 Months (Max Bonus)</span>
              </div>
            </div>
          </div>

          {/* Results Summary Box */}
          <div className="lg:col-span-5 bg-stone-50/70 rounded-xl p-5 border border-stone-200/80 space-y-4">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-stone-500 block">
                Estimated Monthly Income
              </span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-3xl lg:text-4xl font-extrabold text-stone-900 font-display">
                  ₹{monthlyEst.toLocaleString('en-IN')}
                </span>
                <span className="text-xs text-stone-500">/ month</span>
              </div>
              <p className="text-[11px] text-stone-600 mt-1.5 flex items-center gap-1.5">
                <Fuel className="w-3.5 h-3.5 text-teal-700" />
                Offsets approx ₹{fuelSavingsEst.toLocaleString('en-IN')}/mo of your fuel/charging costs
              </p>
            </div>

            <div className="p-3.5 rounded-lg bg-white border border-stone-200/80 space-y-2 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-stone-500">Total for {activeMonths} Months:</span>
                <span className="font-bold text-stone-900">₹{totalEst.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-stone-500">Contract Completion Bonus:</span>
                <span className="font-bold text-teal-700">+ ₹1,200</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-stone-500">Installation & Removal:</span>
                <span className="font-bold text-stone-800">₹0 (100% Free)</span>
              </div>
            </div>

            <button
              type="button"
              onClick={onApplyClick}
              className="w-full py-2.5 px-4 rounded-lg bg-teal-700 hover:bg-teal-800 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-colors shadow-xs"
            >
              <span>Explore High Payout Ads</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <div className="flex items-center justify-between text-[11px] text-stone-500 pt-1">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-teal-700" /> Automated UPI Payout
              </span>
              <span>24hr Hub Wrap Install</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
