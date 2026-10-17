import React from 'react';
import { Search, Wrench, CreditCard } from 'lucide-react';

export default function StatsSection() {
  const steps = [
    {
      step: '01',
      title: 'Browse & Claim Verified Campaign',
      desc: 'Drivers review open campaigns matched to vehicle type and target routes with transparent monthly payouts.',
      icon: Search
    },
    {
      step: '02',
      title: 'Free Hub Wrap Installation',
      desc: 'Certified 20-minute weatherproof vinyl wrap installation conducted at regional inspection hubs at zero fee.',
      icon: Wrench
    },
    {
      step: '03',
      title: 'Drive Normal Route & Earn',
      desc: 'Daily transit route GPS mileage verification confirms active duty, triggering automated month-end UPI credit.',
      icon: CreditCard
    }
  ];

  return (
    <section className="py-12 border-t border-b border-stone-200/80 my-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Network Metrics Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-xl border border-stone-200/80 shadow-xs">
            <span className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-display block">
              12,400+
            </span>
            <span className="text-xs text-stone-500 font-medium mt-1 block">
              Verified Auto Drivers
            </span>
          </div>

          <div className="bg-white p-5 rounded-xl border border-stone-200/80 shadow-xs">
            <span className="text-2xl sm:text-3xl font-extrabold text-teal-700 font-display block">
              ₹2.4 Cr+
            </span>
            <span className="text-xs text-stone-500 font-medium mt-1 block">
              Disbursed to Drivers
            </span>
          </div>

          <div className="bg-white p-5 rounded-xl border border-stone-200/80 shadow-xs">
            <span className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-display block">
              450+
            </span>
            <span className="text-xs text-stone-500 font-medium mt-1 block">
              Active Consumer Brands
            </span>
          </div>

          <div className="bg-white p-5 rounded-xl border border-stone-200/80 shadow-xs">
            <span className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-display block">
              18.5M+
            </span>
            <span className="text-xs text-stone-500 font-medium mt-1 block">
              Monthly Street Eyeballs
            </span>
          </div>
        </div>

        {/* 3 Step Protocol */}
        <div className="space-y-6">
          <div className="border-b border-stone-100 pb-3">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-teal-700 block mb-1">
              Simple 3-Step Process
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-stone-900 font-display">
              How Drivers Start Earning Passive Income
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {steps.map((s) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.step}
                  className="bg-white rounded-xl p-5 border border-stone-200/80 shadow-xs hover:shadow-md transition-shadow duration-200 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-9 h-9 rounded-lg bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-700">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-bold text-stone-400 font-mono">
                        {s.step}
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-stone-900">
                      {s.title}
                    </h4>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      {s.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
