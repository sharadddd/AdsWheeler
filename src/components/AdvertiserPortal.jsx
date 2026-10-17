import React from 'react';
import { Users, Plus, Trash2, IndianRupee, Layers, CheckCircle2 } from 'lucide-react';

export default function AdvertiserPortal({
  ads,
  applications,
  onOpenCreateAd,
  onUpdateAppStatus,
  onDeleteAd,
  currentUser
}) {
  const totalCampaigns = ads.length;
  const totalApplications = applications.length;
  const approvedDrivers = applications.filter((a) => a.status === 'ACTIVE' || a.status === 'ACCEPTED').length;

  return (
    <div className="space-y-6 my-8">
      {/* Brand Header */}
      <div className="bg-white rounded-xl p-6 border border-stone-200/90 shadow-xs">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-stone-100">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-stone-100 border-2 border-stone-200 flex items-center justify-center font-bold text-stone-700 text-lg uppercase shadow-xs">
              {currentUser?.name ? currentUser.name.substring(0, 2) : 'ZG'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-stone-900 font-display">
                  {currentUser?.name || 'Zomato Food Delivery'}
                </h3>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-teal-50 text-teal-800 border border-teal-200">
                  Verified Publisher
                </span>
              </div>
              <p className="text-xs text-stone-500 mt-0.5">
                Targeting High-Traffic Routes across Delhi NCR, Mumbai & Bengaluru
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onOpenCreateAd}
            className="py-2.5 px-4 rounded-lg bg-teal-700 hover:bg-teal-800 text-white font-semibold text-xs flex items-center gap-1.5 transition-colors self-stretch md:self-auto justify-center shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Launch New Campaign</span>
          </button>
        </div>

        {/* Telemetry Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mt-6">
          <div className="bg-stone-50 p-4 rounded-xl border border-stone-200/60">
            <span className="text-stone-500 text-xs font-medium block mb-1">
              Active Campaigns
            </span>
            <span className="text-2xl font-extrabold text-stone-900 font-display">
              {totalCampaigns}
            </span>
            <span className="text-[11px] text-stone-500 mt-1 block">Live in marketplace</span>
          </div>

          <div className="bg-stone-50 p-4 rounded-xl border border-stone-200/60">
            <span className="text-stone-500 text-xs font-medium block mb-1">
              Enrolled Drivers
            </span>
            <span className="text-2xl font-extrabold text-teal-700 font-display">
              {approvedDrivers} Autos
            </span>
            <span className="text-[11px] text-stone-500 mt-1 block">Active on road routes</span>
          </div>

          <div className="bg-stone-50 p-4 rounded-xl border border-stone-200/60">
            <span className="text-stone-500 text-xs font-medium block mb-1">
              Monthly Eyeballs
            </span>
            <span className="text-2xl font-extrabold text-stone-900 font-display">
              850k+
            </span>
            <span className="text-[11px] text-stone-500 mt-1 block">Total street impressions</span>
          </div>

          <div className="bg-stone-50 p-4 rounded-xl border border-stone-200/60">
            <span className="text-stone-500 text-xs font-medium block mb-1">
              Driver Applications
            </span>
            <span className="text-2xl font-extrabold text-stone-700 font-display">
              {totalApplications}
            </span>
            <span className="text-[11px] text-stone-500 mt-1 block">Ready for review</span>
          </div>
        </div>
      </div>

      {/* Driver Applications Review */}
      <div className="bg-white rounded-xl p-6 border border-stone-200/90 shadow-xs">
        <div className="pb-4 border-b border-stone-100 mb-5">
          <h4 className="text-base font-bold text-stone-900 font-display">
            Driver Allocation Ledger
          </h4>
          <p className="text-xs text-stone-500 mt-0.5">
            Approve driver wrap applications and disburse monthly UPI payments
          </p>
        </div>

        {applications.length === 0 ? (
          <p className="text-xs text-stone-400 py-6 text-center">No driver applications pending.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-50 text-stone-600 border-b border-stone-200">
                <tr>
                  <th className="py-2.5 px-4 font-semibold">Driver Details</th>
                  <th className="py-2.5 px-4 font-semibold">Target Campaign</th>
                  <th className="py-2.5 px-4 font-semibold">Monthly Payout</th>
                  <th className="py-2.5 px-4 font-semibold">Wrap Status</th>
                  <th className="py-2.5 px-4 font-semibold">Settlement</th>
                  <th className="py-2.5 px-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {applications.map((app) => (
                  <tr key={app.id} className="hover:bg-stone-50/60 transition-colors">
                    <td className="py-3 px-4 font-medium text-stone-900">
                      <div>{app.driver_name || 'Driver Rajesh'}</div>
                      <div className="text-[11px] text-stone-500">{app.driver_phone || '+91 9876543210'}</div>
                    </td>
                    <td className="py-3 px-4 text-stone-700 max-w-xs truncate">
                      {app.ad_title}
                    </td>
                    <td className="py-3 px-4 font-bold text-stone-900">
                      ₹{Number(app.amount).toLocaleString('en-IN')}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
                          app.status === 'ACTIVE'
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                            : app.status === 'ACCEPTED'
                            ? 'bg-blue-50 text-blue-800 border-blue-200'
                            : 'bg-stone-100 text-stone-700 border-stone-200'
                        }`}
                      >
                        {app.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
                          app.payment_status === 'PAID'
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                            : 'bg-amber-50 text-amber-800 border-amber-200'
                        }`}
                      >
                        {app.payment_status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right space-x-1.5">
                      {app.status === 'PENDING' && (
                        <button
                          onClick={() => onUpdateAppStatus(app.id, { status: 'ACCEPTED' })}
                          className="px-2.5 py-1 bg-teal-700 hover:bg-teal-800 text-white rounded-md text-xs font-semibold transition-colors"
                        >
                          Approve
                        </button>
                      )}
                      {app.status === 'ACCEPTED' && (
                        <button
                          onClick={() => onUpdateAppStatus(app.id, { status: 'ACTIVE' })}
                          className="px-2.5 py-1 bg-emerald-700 hover:bg-emerald-800 text-white rounded-md text-xs font-semibold transition-colors"
                        >
                          Mark Active
                        </button>
                      )}
                      {app.payment_status === 'PENDING' && (
                        <button
                          onClick={() => onUpdateAppStatus(app.id, { payment_status: 'PAID' })}
                          className="px-2.5 py-1 bg-stone-900 hover:bg-stone-800 text-white rounded-md text-xs font-semibold transition-colors"
                        >
                          Pay UPI
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Posted Campaigns */}
      <div className="bg-white rounded-xl p-6 border border-stone-200/90 shadow-xs">
        <h4 className="text-base font-bold text-stone-900 font-display mb-4">
          Manage Your Campaigns ({ads.length})
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {ads.map((ad) => (
            <div key={ad.id} className="bg-stone-50/70 p-4 rounded-xl border border-stone-200/70 space-y-2">
              <div className="flex justify-between items-start text-xs">
                <span className="px-2 py-0.5 rounded bg-white text-stone-700 border border-stone-200 font-medium">
                  {ad.target_vehicle_type}
                </span>
                <span className="font-bold text-stone-900">
                  ₹{Number(ad.price).toLocaleString('en-IN')}/mo
                </span>
              </div>
              <h5 className="font-bold text-stone-900 text-xs line-clamp-1">{ad.title}</h5>
              <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">{ad.description}</p>
              <div className="pt-2 border-t border-stone-200/60 flex items-center justify-between text-xs text-stone-500">
                <span>Duration: {ad.duration || '1 Month'}</span>
                <button
                  onClick={() => onDeleteAd(ad.id)}
                  className="text-red-600 hover:text-red-700 font-medium flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
