import React from 'react';
import { ShieldCheck, Car } from 'lucide-react';

export default function Footer({ onRoleChange }) {
  return (
    <footer className="border-t border-stone-200/80 bg-white text-stone-500 text-xs pt-12 pb-8 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-teal-700 flex items-center justify-center text-white">
                <Car className="w-3.5 h-3.5" />
              </div>
              <span className="text-sm font-bold text-stone-900 font-display">
                AdsWheeler Technologies
              </span>
            </div>
            <p className="text-xs text-stone-500 leading-relaxed font-sans">
              Smart transit advertising network connecting Indian auto rickshaw drivers with premier brands for high-visibility outdoor campaigns.
            </p>
          </div>

          {/* Column 1 */}
          <div className="space-y-2.5">
            <span className="text-xs font-semibold text-stone-900 block">For Drivers</span>
            <ul className="space-y-1.5 text-xs">
              <li>
                <button onClick={() => onRoleChange('DRIVER')} className="hover:text-teal-700 transition-colors">
                  Driver Earnings Dashboard
                </button>
              </li>
              <li>
                <button onClick={() => onRoleChange('PUBLIC')} className="hover:text-teal-700 transition-colors">
                  Browse Active Campaigns
                </button>
              </li>
              <li className="text-stone-400">Installation Hub Locations</li>
              <li className="text-stone-400">Direct UPI Payout Help</li>
            </ul>
          </div>

          {/* Column 2 */}
          <div className="space-y-2.5">
            <span className="text-xs font-semibold text-stone-900 block">For Advertisers</span>
            <ul className="space-y-1.5 text-xs">
              <li>
                <button onClick={() => onRoleChange('PUBLISHER')} className="hover:text-teal-700 transition-colors">
                  Advertiser Console
                </button>
              </li>
              <li>
                <button onClick={() => onRoleChange('PUBLIC')} className="hover:text-teal-700 transition-colors">
                  Interactive Vehicle Simulator
                </button>
              </li>
              <li className="text-stone-400">Metro Route Heatmaps</li>
              <li className="text-stone-400">Impression & CPM Reports</li>
            </ul>
          </div>

          {/* Column 3: Active Cities */}
          <div className="space-y-2.5">
            <span className="text-xs font-semibold text-stone-900 block">Active Metros</span>
            <div className="flex flex-wrap gap-1.5 pt-0.5">
              {['Delhi NCR', 'Mumbai', 'Bengaluru', 'Noida', 'Gurugram', 'Hyderabad', 'Pune'].map((city) => (
                <span key={city} className="px-2 py-0.5 rounded bg-stone-100 border border-stone-200 text-[11px] text-stone-600 font-medium">
                  {city}
                </span>
              ))}
            </div>
            <p className="text-[11px] text-stone-500 pt-2 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-700" /> Powered by Express REST API & PostgreSQL
            </p>
          </div>
        </div>

        <div className="pt-6 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-stone-400">
          <div>
            © {new Date().getFullYear()} AdsWheeler Technologies Pvt Ltd. All rights reserved.
          </div>
          <div>
            Built with effortless, clean design for India's transit mobility
          </div>
        </div>
      </div>
    </footer>
  );
}
