import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Compass, LayoutDashboard, Globe, Check, LogOut, User, Car } from 'lucide-react';

export default function Navbar({
  currentRole,
  onRoleChange,
  backendOnline,
  notifications,
  onMarkNotificationRead,
  onOpenCreateAd,
  currentUser,
  onOpenAuth,
  onLogout
}) {
  const [showNotifications, setShowNotifications] = useState(false);
  const unreadCount = notifications.filter((n) => !n.read_status).length;

  const roles = [
    { id: 'PUBLIC', label: 'Marketplace', icon: Globe },
    { id: 'DRIVER', label: 'Driver Dashboard', icon: Car },
    { id: 'PUBLISHER', label: 'Advertiser Hub', icon: LayoutDashboard }
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-stone-200/80 bg-[#FAF9F6]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo & Name */}
        <div
          onClick={() => onRoleChange('PUBLIC')}
          className="flex items-center gap-2.5 cursor-pointer select-none"
        >
          <div className="w-8 h-8 rounded-lg bg-teal-700 flex items-center justify-center text-white shadow-xs">
            <Car className="w-4 h-4" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-base font-bold text-stone-900 tracking-tight font-display">
              AdsWheeler
            </span>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-teal-50 text-teal-800 border border-teal-200">
              Transit
            </span>
          </div>
        </div>

        {/* Center: Segmented Pill Tabs */}
        <nav className="hidden md:flex items-center bg-stone-100 p-1 rounded-lg border border-stone-200/60">
          {roles.map((role) => {
            const Icon = role.icon;
            const isActive = currentRole === role.id;
            return (
              <button
                key={role.id}
                onClick={() => onRoleChange(role.id)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200 ease-out flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-white text-stone-900 shadow-xs font-semibold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{role.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Stack: Notifications & User Session */}
        <div className="flex items-center gap-2.5">
          {/* Backend Status Pill */}
          <div
            className={`hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium border ${
              backendOnline
                ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                : 'bg-stone-100 text-stone-600 border-stone-200'
            }`}
            title="Connected to https://ads-wheeler-backend.vercel.app"
          >
            <span className={`w-1.5 h-1.5 rounded-full ${backendOnline ? 'bg-emerald-600' : 'bg-stone-400'}`} />
            <span>{backendOnline ? 'Live Vercel DB' : 'Connecting...'}</span>
          </div>

          {/* Notifications Button */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 rounded-lg bg-white hover:bg-stone-50 text-stone-600 hover:text-stone-900 border border-stone-200 shadow-xs transition-colors relative"
              aria-label="Toggle notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-teal-700" />
              )}
            </button>

            {/* Notification Drawer */}
            <AnimatePresence>
              {showNotifications && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-2 w-80 sm:w-88 bg-white rounded-xl border border-stone-200 shadow-lg p-4 z-50"
                >
                  <div className="flex items-center justify-between pb-3 border-b border-stone-100 mb-3">
                    <span className="text-xs font-bold text-stone-900">Notifications</span>
                    <span className="text-[11px] text-stone-500">{unreadCount} unread</span>
                  </div>

                  <div className="space-y-2 max-h-72 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <p className="text-xs text-stone-400 text-center py-4">No new alerts.</p>
                    ) : (
                      notifications.map((n) => (
                        <div
                          key={n.id}
                          onClick={() => onMarkNotificationRead(n.id)}
                          className={`p-2.5 rounded-lg border text-xs cursor-pointer transition-colors ${
                            n.read_status
                              ? 'bg-stone-50/50 border-stone-100 text-stone-500'
                              : 'bg-teal-50/40 border-teal-200 text-stone-800'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-semibold text-stone-900">{n.title}</span>
                            {!n.read_status && <span className="w-1.5 h-1.5 rounded-full bg-teal-700" />}
                          </div>
                          <p className="text-[11px] text-stone-600 leading-normal">{n.message}</p>
                        </div>
                      ))
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* User Profile / Login Button */}
          {currentUser ? (
            <div className="flex items-center gap-2 pl-1 border-l border-stone-200">
              <div className="flex items-center gap-2 p-1 pl-1.5 pr-2.5 rounded-lg bg-white border border-stone-200 shadow-xs">
                <div className="w-6 h-6 rounded-full bg-stone-100 border border-stone-200 flex items-center justify-center text-xs font-bold text-stone-700 uppercase">
                  {currentUser.name ? currentUser.name.substring(0, 1) : 'U'}
                </div>
                <div className="hidden sm:block text-left text-xs">
                  <span className="font-semibold text-stone-900 block leading-tight truncate max-w-[100px]">
                    {currentUser.name?.split(' ')[0]}
                  </span>
                  <span className="text-[10px] text-stone-500 block leading-tight">
                    {currentUser.role}
                  </span>
                </div>
              </div>

              <button
                onClick={onLogout}
                title="Log out"
                className="p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => onOpenAuth('login')}
              className="px-3 py-1.5 rounded-lg bg-teal-700 hover:bg-teal-800 text-white font-semibold text-xs transition-colors shadow-xs"
            >
              Log In
            </button>
          )}
        </div>
      </div>

      {/* Mobile Segmented Bar */}
      <div className="flex md:hidden items-center justify-around bg-stone-100 p-1.5 border-t border-stone-200/80 text-xs">
        {roles.map((role) => (
          <button
            key={role.id}
            onClick={() => onRoleChange(role.id)}
            className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
              currentRole === role.id ? 'bg-white text-stone-900 shadow-xs font-semibold' : 'text-stone-500'
            }`}
          >
            {role.label}
          </button>
        ))}
      </div>
    </header>
  );
}
