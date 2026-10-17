import React, { useState } from 'react';
import { Eye, Car, Zap, Sliders, Palette } from 'lucide-react';

export default function VehicleSimulator() {
  const [vehicleType, setVehicleType] = useState('AUTO_RICKSHAW');
  const [brandName, setBrandName] = useState('ZOMATO GOLD');
  const [slogan, setSlogan] = useState('FLAT 50% OFF DINING');
  const [brandColor, setBrandColor] = useState('#EA580C'); // Warm Terracotta
  const [bannerPlacement, setBannerPlacement] = useState('HOOD'); // 'HOOD' | 'REAR' | 'FULL'

  const colorPresets = [
    { name: 'Warm Terracotta', hex: '#EA580C' },
    { name: 'Forest Teal', hex: '#0F766E' },
    { name: 'Deep Navy', hex: '#1E3A8A' },
    { name: 'Crimson Red', hex: '#DC2626' },
    { name: 'Amber Gold', hex: '#D97706' },
    { name: 'Charcoal', hex: '#292524' }
  ];

  const presets = [
    { brand: 'ZOMATO GOLD', slogan: 'FLAT 50% OFF DINING', color: '#EA580C', placement: 'HOOD' },
    { brand: 'SWIGGY MART', slogan: 'GROCERIES IN 10 MINS', color: '#EA580C', placement: 'FULL' },
    { brand: 'OLA ELECTRIC', slogan: 'SWITCH TO GREEN TODAY', color: '#0F766E', placement: 'REAR' },
    { brand: 'AMAZON PRIME', slogan: 'FREE SAME DAY DELIVERY', color: '#1E3A8A', placement: 'HOOD' }
  ];

  return (
    <div className="bg-white rounded-xl border border-stone-200/90 shadow-xs p-6 lg:p-7">
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Controls Column */}
        <div className="w-full lg:w-5/12 space-y-4">
          <div className="border-b border-stone-100 pb-3">
            <h3 className="text-sm font-bold text-stone-900 font-display flex items-center gap-1.5">
              <Sliders className="w-4 h-4 text-teal-700" />
              <span>Interactive Vehicle Wrap Preview</span>
            </h3>
            <p className="text-xs text-stone-500 mt-0.5">
              Visualize your brand wrap on real Indian transit chassis
            </p>
          </div>

          {/* Vehicle Type Switcher */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1.5">
              Vehicle Model
            </label>
            <div className="grid grid-cols-2 gap-2 bg-stone-100 p-1 rounded-lg">
              <button
                type="button"
                onClick={() => setVehicleType('AUTO_RICKSHAW')}
                className={`py-1.5 px-3 rounded-md text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                  vehicleType === 'AUTO_RICKSHAW'
                    ? 'bg-white text-stone-900 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <Car className="w-3.5 h-3.5" />
                <span>Auto Rickshaw</span>
              </button>
              <button
                type="button"
                onClick={() => setVehicleType('E_RICKSHAW')}
                className={`py-1.5 px-3 rounded-md text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                  vehicleType === 'E_RICKSHAW'
                    ? 'bg-white text-stone-900 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <Zap className="w-3.5 h-3.5" />
                <span>E-Rickshaw EV</span>
              </button>
            </div>
          </div>

          {/* Brand Name & Headline */}
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1">
                Brand / Campaign Name
              </label>
              <input
                type="text"
                value={brandName}
                maxLength={24}
                onChange={(e) => setBrandName(e.target.value)}
                className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-teal-700/20 focus:border-teal-700 font-semibold"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1">
                Headline / Offer
              </label>
              <input
                type="text"
                value={slogan}
                maxLength={30}
                onChange={(e) => setSlogan(e.target.value)}
                className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-teal-700/20 focus:border-teal-700"
              />
            </div>
          </div>

          {/* Color Presets */}
          <div>
            <label className="block text-xs font-medium text-stone-700 mb-1.5 flex items-center gap-1">
              <Palette className="w-3.5 h-3.5 text-stone-400" />
              <span>Wrap Substrate Color</span>
            </label>
            <div className="flex items-center gap-2">
              {colorPresets.map((c) => (
                <button
                  key={c.hex}
                  type="button"
                  onClick={() => setBrandColor(c.hex)}
                  title={c.name}
                  className={`w-6 h-6 rounded-md transition-all border ${
                    brandColor === c.hex
                      ? 'ring-2 ring-stone-900 ring-offset-2 border-transparent'
                      : 'border-stone-200 hover:scale-105'
                  }`}
                  style={{ backgroundColor: c.hex }}
                />
              ))}
            </div>
          </div>

          {/* Placement Options */}
          <div>
            <label className="block text-xs font-medium text-stone-700 mb-1.5">
              Placement Position
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'HOOD', label: 'Top Hood' },
                { id: 'REAR', label: 'Rear Panel' },
                { id: 'FULL', label: 'Full Wrap' }
              ].map((pos) => (
                <button
                  key={pos.id}
                  type="button"
                  onClick={() => setBannerPlacement(pos.id)}
                  className={`py-1.5 px-2 rounded-lg text-xs font-medium border text-center transition-all ${
                    bannerPlacement === pos.id
                      ? 'bg-stone-900 text-white border-stone-900 shadow-xs'
                      : 'bg-stone-50 text-stone-600 border-stone-200 hover:bg-stone-100'
                  }`}
                >
                  {pos.label}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Demo Brands */}
          <div className="pt-2 border-t border-stone-100">
            <span className="text-[11px] text-stone-500 mr-2">Try brands:</span>
            <div className="inline-flex flex-wrap gap-1 mt-1">
              {presets.map((p) => (
                <button
                  key={p.brand}
                  type="button"
                  onClick={() => {
                    setBrandName(p.brand);
                    setSlogan(p.slogan);
                    setBrandColor(p.color);
                    setBannerPlacement(p.placement);
                  }}
                  className="text-[11px] px-2 py-0.5 rounded bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors"
                >
                  {p.brand.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Daylight Canvas Schematic */}
        <div className="w-full lg:w-7/12 flex flex-col bg-stone-50/70 rounded-xl border border-stone-200 p-6 relative">
          <div className="flex items-center justify-between pb-3 border-b border-stone-200/70 mb-4 text-xs">
            <div className="flex items-center gap-1.5 font-semibold text-stone-700">
              <span className="w-2 h-2 rounded-full bg-teal-600" />
              <span>Real-Time Vehicle Mockup</span>
            </div>
            <span className="text-stone-400 font-mono text-[11px]">
              {vehicleType === 'AUTO_RICKSHAW' ? 'Bajaj RE CNG Auto' : 'Toto Electric Rickshaw'}
            </span>
          </div>

          {/* Vector Schematic */}
          <div className="w-full max-w-md mx-auto my-4">
            {vehicleType === 'AUTO_RICKSHAW' ? (
              <svg viewBox="0 0 500 320" className="w-full h-auto drop-shadow-sm">
                {/* Shadow */}
                <ellipse cx="250" cy="295" rx="190" ry="8" fill="#E7E5E4" />

                {/* Lower Green Body */}
                <path
                  d="M 90 240 L 400 240 L 420 200 L 370 170 L 140 170 L 80 220 Z"
                  fill="#059669"
                  stroke="#047857"
                  strokeWidth="2"
                />

                {/* Middle Yellow Body */}
                <path
                  d="M 120 170 L 370 170 L 350 110 L 150 110 Z"
                  fill="#FBBF24"
                  stroke="#D97706"
                  strokeWidth="2"
                />

                {/* Canopy */}
                <path
                  d="M 130 110 Q 240 70 360 100 L 370 120 L 125 120 Z"
                  fill="#292524"
                  stroke="#1C1917"
                  strokeWidth="2"
                />

                {/* Windshield */}
                <path
                  d="M 125 120 L 80 200 L 95 240 L 130 170 Z"
                  fill="#BAE6FD"
                  opacity="0.6"
                  stroke="#38BDF8"
                  strokeWidth="1.5"
                />

                {/* Headlamp */}
                <circle cx="78" cy="215" r="8" fill="#FEF08A" stroke="#EAB308" strokeWidth="1" />

                {/* Driver & Passenger Seats */}
                <rect x="145" y="180" width="35" height="12" rx="2" fill="#44403C" />
                <rect x="290" y="180" width="70" height="18" rx="2" fill="#44403C" />

                {/* Dynamic Brand Wrap Banner */}
                {(bannerPlacement === 'HOOD' || bannerPlacement === 'FULL') && (
                  <g className="transition-all duration-300">
                    <rect
                      x="160"
                      y="118"
                      width="180"
                      height="46"
                      rx="4"
                      fill={brandColor}
                      stroke="#FFFFFF"
                      strokeWidth="1.5"
                    />
                    <text
                      x="250"
                      y="136"
                      fill="#FFFFFF"
                      fontSize="12"
                      fontWeight="800"
                      textAnchor="middle"
                      fontFamily="sans-serif"
                    >
                      {brandName}
                    </text>
                    <text
                      x="250"
                      y="152"
                      fill="#FFFFFF"
                      opacity="0.9"
                      fontSize="9"
                      fontWeight="600"
                      textAnchor="middle"
                      fontFamily="sans-serif"
                    >
                      {slogan}
                    </text>
                  </g>
                )}

                {(bannerPlacement === 'REAR' || bannerPlacement === 'FULL') && (
                  <g className="transition-all duration-300">
                    <rect
                      x="365"
                      y="160"
                      width="50"
                      height="70"
                      rx="3"
                      fill={brandColor}
                      stroke="#FFFFFF"
                      strokeWidth="1.5"
                    />
                    <text
                      x="390"
                      y="190"
                      fill="#FFFFFF"
                      fontSize="9"
                      fontWeight="bold"
                      textAnchor="middle"
                      transform="rotate(90 390 190)"
                    >
                      {brandName.substring(0, 10)}
                    </text>
                  </g>
                )}

                {/* Wheels */}
                <circle cx="110" cy="260" r="28" fill="#292524" stroke="#78716C" strokeWidth="4" />
                <circle cx="110" cy="260" r="14" fill="#D6D3D1" />
                <circle cx="340" cy="260" r="32" fill="#292524" stroke="#78716C" strokeWidth="4" />
                <circle cx="340" cy="260" r="16" fill="#D6D3D1" />
              </svg>
            ) : (
              <svg viewBox="0 0 500 320" className="w-full h-auto drop-shadow-sm">
                <ellipse cx="250" cy="295" rx="190" ry="8" fill="#E7E5E4" />

                {/* High tubular canopy */}
                <path d="M 100 100 L 400 95 L 410 115 L 105 120 Z" fill="#047857" stroke="#065F46" strokeWidth="2" />
                <line x1="110" y1="120" x2="110" y2="230" stroke="#78716C" strokeWidth="3" />
                <line x1="250" y1="110" x2="250" y2="230" stroke="#78716C" strokeWidth="2" />
                <line x1="390" y1="105" x2="390" y2="230" stroke="#78716C" strokeWidth="3" />

                {/* Body box */}
                <rect x="100" y="210" width="300" height="35" rx="4" fill="#059669" stroke="#047857" strokeWidth="2" />
                <rect x="180" y="185" width="45" height="28" rx="2" fill="#292524" />
                <rect x="290" y="185" width="45" height="28" rx="2" fill="#292524" />

                {/* Dynamic Brand Wrap Banner */}
                {(bannerPlacement === 'HOOD' || bannerPlacement === 'FULL') && (
                  <g className="transition-all duration-300">
                    <rect
                      x="140"
                      y="125"
                      width="220"
                      height="46"
                      rx="4"
                      fill={brandColor}
                      stroke="#FFFFFF"
                      strokeWidth="1.5"
                    />
                    <text
                      x="250"
                      y="144"
                      fill="#FFFFFF"
                      fontSize="13"
                      fontWeight="800"
                      textAnchor="middle"
                    >
                      {brandName}
                    </text>
                    <text
                      x="250"
                      y="159"
                      fill="#FFFFFF"
                      opacity="0.9"
                      fontSize="9"
                      fontWeight="600"
                      textAnchor="middle"
                    >
                      {slogan}
                    </text>
                  </g>
                )}

                {(bannerPlacement === 'REAR' || bannerPlacement === 'FULL') && (
                  <g className="transition-all duration-300">
                    <rect
                      x="380"
                      y="160"
                      width="35"
                      height="75"
                      rx="3"
                      fill={brandColor}
                      stroke="#FFFFFF"
                      strokeWidth="1.5"
                    />
                    <text
                      x="397"
                      y="200"
                      fill="#FFFFFF"
                      fontSize="9"
                      fontWeight="bold"
                      textAnchor="middle"
                      transform="rotate(90 397 200)"
                    >
                      {brandName.substring(0, 8)}
                    </text>
                  </g>
                )}

                {/* Wheels */}
                <circle cx="100" cy="260" r="26" fill="#292524" stroke="#78716C" strokeWidth="3" />
                <circle cx="100" cy="260" r="12" fill="#D6D3D1" />
                <circle cx="360" cy="260" r="28" fill="#292524" stroke="#78716C" strokeWidth="3" />
                <circle cx="360" cy="260" r="14" fill="#D6D3D1" />
              </svg>
            )}
          </div>

          {/* Metric Footer */}
          <div className="grid grid-cols-3 gap-2 pt-3 border-t border-stone-200/80 text-center text-xs">
            <div className="bg-white p-2.5 rounded-lg border border-stone-200/60 shadow-xs">
              <span className="block text-stone-500 text-[11px]">Daily Commuters</span>
              <span className="text-stone-900 font-bold mt-0.5 block">8,500+ views</span>
            </div>
            <div className="bg-white p-2.5 rounded-lg border border-stone-200/60 shadow-xs">
              <span className="block text-stone-500 text-[11px]">Monthly Distance</span>
              <span className="text-stone-900 font-bold mt-0.5 block">2,400+ km</span>
            </div>
            <div className="bg-white p-2.5 rounded-lg border border-stone-200/60 shadow-xs">
              <span className="block text-stone-500 text-[11px]">Driver Payout</span>
              <span className="text-teal-700 font-bold mt-0.5 block">₹3,500 - ₹5,500</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
