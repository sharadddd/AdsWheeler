import React, { useState, useMemo } from 'react';
import { Search, Plus, Car, Zap, Layers, RefreshCw, SlidersHorizontal } from 'lucide-react';
import AdCard from './AdCard';
import AdDetailSlideOver from './AdDetailSlideOver';

export default function CampaignExplorer({ ads, onApply, appliedAdIds, userRole, onOpenCreateAd, loading = false }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [vehicleFilter, setVehicleFilter] = useState('ALL'); // 'ALL' | 'AUTO_RICKSHAW' | 'E_RICKSHAW'
  const [selectedAd, setSelectedAd] = useState(null);
  const [highYieldOnly, setHighYieldOnly] = useState(false);

  const filterChips = [
    { id: 'ALL', label: 'All Campaigns', icon: Layers },
    { id: 'AUTO_RICKSHAW', label: 'Auto Rickshaw', icon: Car },
    { id: 'E_RICKSHAW', label: 'E-Rickshaw EV', icon: Zap }
  ];

  const filteredAds = useMemo(() => {
    return ads.filter((ad) => {
      const matchesSearch =
        ad.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ad.business_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ad.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (ad.city && ad.city.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesVehicle =
        vehicleFilter === 'ALL' ||
        ad.target_vehicle_type === vehicleFilter ||
        ad.target_vehicle_type === 'BOTH';

      const matchesYield = !highYieldOnly || Number(ad.price) >= 4000;

      return matchesSearch && matchesVehicle && matchesYield;
    });
  }, [ads, searchTerm, vehicleFilter, highYieldOnly]);

  return (
    <div className="space-y-6 my-10">
      {/* Title & Headline */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-display tracking-tight">
            Explore Available Campaigns
          </h2>
          <p className="text-sm text-stone-500 mt-1">
            Browse verified transit branding opportunities with guaranteed direct monthly UPI payouts.
          </p>
        </div>

        {userRole === 'PUBLISHER' && (
          <button
            onClick={onOpenCreateAd}
            className="px-4 py-2 bg-teal-700 hover:bg-teal-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs self-start md:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Launch New Campaign</span>
          </button>
        )}
      </div>

      {/* Friendly, Conversational Action & Filter Bar */}
      <div className="bg-white rounded-xl p-3 border border-stone-200/90 shadow-xs flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search campaigns, brands, or cities..."
            className="w-full bg-stone-50/70 border border-stone-200 rounded-lg pl-9 pr-3.5 py-2 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-teal-700/20 focus:border-teal-700 focus:bg-white transition-all"
          />
        </div>

        {/* Filter Chips */}
        <div className="flex items-center gap-1.5 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          {filterChips.map((chip) => {
            const Icon = chip.icon;
            const isActive = vehicleFilter === chip.id;
            return (
              <button
                key={chip.id}
                onClick={() => setVehicleFilter(chip.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-stone-900 text-white shadow-xs'
                    : 'bg-stone-100 hover:bg-stone-200 text-stone-600'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{chip.label}</span>
              </button>
            );
          })}

          {/* High Yield Filter Chip */}
          <button
            onClick={() => setHighYieldOnly(!highYieldOnly)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              highYieldOnly
                ? 'bg-teal-700 text-white shadow-xs'
                : 'bg-stone-100 hover:bg-stone-200 text-stone-600'
            }`}
          >
            <span>₹4,000+ High Yield</span>
          </button>
        </div>
      </div>

      {/* Grid Content / Skeletons / Empty States */}
      {loading ? (
        /* Soft Pulsing Skeleton Shimmer Cards */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div key={n} className="bg-white rounded-xl border border-stone-200/80 p-5 space-y-4 animate-pulse">
              <div className="flex justify-between items-center">
                <div className="w-24 h-5 bg-stone-200/70 rounded-full" />
                <div className="w-16 h-5 bg-stone-200/70 rounded-md" />
              </div>
              <div className="space-y-2">
                <div className="w-32 h-3 bg-stone-200/70 rounded" />
                <div className="w-full h-4 bg-stone-200/70 rounded" />
              </div>
              <div className="w-full h-10 bg-stone-200/50 rounded" />
              <div className="w-full h-8 bg-stone-200/70 rounded-lg pt-2" />
            </div>
          ))}
        </div>
      ) : filteredAds.length === 0 ? (
        /* Helpful Empty State */
        <div className="bg-white rounded-xl p-12 text-center border border-stone-200 shadow-xs space-y-3 max-w-lg mx-auto my-6">
          <div className="w-12 h-12 rounded-full bg-stone-100 text-stone-400 mx-auto flex items-center justify-center">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-stone-900">No campaigns found</h3>
          <p className="text-xs text-stone-500 max-w-sm mx-auto leading-relaxed">
            We couldn't find any ad campaigns matching "{searchTerm}". Try clearing your filters or search keywords.
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setVehicleFilter('ALL');
              setHighYieldOnly(false);
            }}
            className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-lg text-xs font-semibold transition-colors"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        /* Campaign Cards Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredAds.map((ad) => (
            <AdCard
              key={ad.id}
              ad={ad}
              onApply={onApply}
              isApplied={appliedAdIds.includes(ad.id)}
              userRole={userRole}
              onSelectAd={(item) => setSelectedAd(item)}
            />
          ))}
        </div>
      )}

      {/* Slide-Over Detail Sheet */}
      <AdDetailSlideOver
        ad={selectedAd}
        isOpen={Boolean(selectedAd)}
        onClose={() => setSelectedAd(null)}
        onApply={onApply}
        isApplied={selectedAd ? appliedAdIds.includes(selectedAd.id) : false}
        userRole={userRole}
      />
    </div>
  );
}
