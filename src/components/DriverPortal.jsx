import React from 'react';
import { IndianRupee, ShieldCheck, Clock, Calendar, ArrowRight, Zap, CheckCircle2, Car } from 'lucide-react';

export default function DriverPortal({ applications, onBrowseMore, currentUser }) {
  const totalEarned = applications
    .filter((a) => a.payment_status === 'PAID')
    .reduce((sum, a) => sum + Number(a.amount || 0), 0);

  const pendingAmount = applications
    .filter((a) => a.payment_status === 'PENDING')
    .reduce((sum, a) => sum + Number(a.amount || 0), 0);

  const activeCount = applications.filter((a) => a.status === 'ACTIVE').length;

  return (
    <div className="space-y-6 my-8">
      {/* Profile Overview Card */}
      <div className="bg-white rounded-xl p-6 border border-stone-200/90 shadow-xs">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-stone-100">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-stone-100 border-2 border-stone-200 flex items-center justify-center font-bold text-stone-700 text-lg uppercase shadow-xs">
              {currentUser?.name ? currentUser.name.substring(0, 2) : 'RK'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-stone-900 font-display">
                  {currentUser?.name || 'Rajesh Kumar Sharma'}
                </h3>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Verified Driver
                </span>
              </div>
              <p className="text-xs text-stone-500 mt-0.5">
                Chassis: Bajaj RE CNG • Registration: <span className="font-semibold text-stone-700">DL 1RA 4892</span> • South Delhi Route
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onBrowseMore}
            className="py-2.5 px-4 rounded-lg bg-teal-700 hover:bg-teal-800 text-white font-semibold text-xs flex items-center gap-1.5 transition-colors self-stretch md:self-auto justify-center shadow-xs"
          >
            <span>Browse More Campaigns</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Telemetry Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
          <div className="bg-stone-50 p-4 rounded-xl border border-stone-200/60">
            <span className="text-stone-500 text-xs font-medium block mb-1">
              Total Payouts Credited
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-extrabold text-stone-900 font-display">
                ₹{totalEarned.toLocaleString('en-IN')}
              </span>
              <span className="text-xs text-emerald-700 font-medium">via UPI</span>
            </div>
            <span className="text-[11px] text-stone-500 mt-1 block">Transferred directly to bank</span>
          </div>

          <div className="bg-stone-50 p-4 rounded-xl border border-stone-200/60">
            <span className="text-stone-500 text-xs font-medium block mb-1">
              Active Vehicle Wraps
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-extrabold text-teal-700 font-display">
                {activeCount}
              </span>
              <span className="text-xs text-stone-500 font-medium">Wraps Installed</span>
            </div>
            <span className="text-[11px] text-stone-500 mt-1 block">Generating daily revenue</span>
          </div>

          <div className="bg-stone-50 p-4 rounded-xl border border-stone-200/60">
            <span className="text-stone-500 text-xs font-medium block mb-1">
              Pending Month-End Settlement
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-extrabold text-stone-900 font-display">
                ₹{pendingAmount.toLocaleString('en-IN')}
              </span>
            </div>
            <span className="text-[11px] text-stone-500 mt-1 block">Expected by cycle close</span>
          </div>
        </div>
      </div>

      {/* Applied Campaigns / Contracts Table */}
      <div className="bg-white rounded-xl p-6 border border-stone-200/90 shadow-xs">
        <div className="flex items-center justify-between pb-4 border-b border-stone-100 mb-5">
          <div>
            <h4 className="text-base font-bold text-stone-900 font-display">
              My Applied Ad Campaigns & Contracts
            </h4>
            <p className="text-xs text-stone-500 mt-0.5">
              Live tracking of wrap installations, verification, and payment statuses
            </p>
          </div>
          <span className="text-xs text-stone-600 bg-stone-100 px-2.5 py-1 rounded-full font-semibold">
            {applications.length} Applications
          </span>
        </div>

        {applications.length === 0 ? (
          <div className="py-12 text-center space-y-2">
            <p className="text-sm font-semibold text-stone-900">No active applications found</p>
            <p className="text-xs text-stone-500">Explore open campaigns to claim your first branded wrap.</p>
            <button
              onClick={onBrowseMore}
              className="mt-2 text-xs font-semibold text-teal-700 hover:underline"
            >
              Browse Open Campaigns
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {applications.map((app) => (
              <div
                key={app.id}
                className="bg-stone-50/70 hover:bg-stone-50 border border-stone-200/70 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono text-stone-400">#{app.id}</span>
                    <h5 className="font-bold text-stone-900 text-sm">
                      {app.ad_title || 'Transit Wrap Campaign'}
                    </h5>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-stone-500">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-stone-400" />
                      Applied: {new Date(Number(app.accepted_at)).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-stone-400" />
                      Term: 30 Days Active
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 md:justify-end">
                  <div>
                    <span className="text-[11px] text-stone-400 block mb-0.5">Monthly Payout</span>
                    <div className="font-bold text-stone-900 text-sm flex items-center">
                      <IndianRupee className="w-3.5 h-3.5 text-teal-700" />
                      <span>{Number(app.amount).toLocaleString('en-IN')}</span>
                    </div>
                  </div>

                  <div>
                    <span className="text-[11px] text-stone-400 block mb-0.5">Wrap Status</span>
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
                        app.status === 'ACTIVE'
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                          : app.status === 'ACCEPTED'
                          ? 'bg-blue-50 text-blue-800 border-blue-200'
                          : 'bg-stone-200/80 text-stone-700 border-stone-300'
                      }`}
                    >
                      {app.status}
                    </span>
                  </div>

                  <div>
                    <span className="text-[11px] text-stone-400 block mb-0.5">Payment</span>
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
                        app.payment_status === 'PAID'
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                          : 'bg-amber-50 text-amber-800 border-amber-200'
                      }`}
                    >
                      {app.payment_status === 'PAID' ? '✓ Settled' : '⏳ Pending'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
