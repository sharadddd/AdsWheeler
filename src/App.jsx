import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Info, AlertCircle } from 'lucide-react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import CampaignExplorer from './components/CampaignExplorer';
import EarningsCalculator from './components/EarningsCalculator';
import DriverPortal from './components/DriverPortal';
import AdvertiserPortal from './components/AdvertiserPortal';
import CreateAdSlideOver from './components/CreateAdSlideOver';
import AuthModal from './components/AuthModal';
import StatsSection from './components/StatsSection';
import Footer from './components/Footer';
import {
  checkHealth,
  apiGetAds,
  apiCreateAd,
  apiDeleteAd,
  apiGetApplications,
  apiCreateApplication,
  apiUpdateApplicationStatus,
  apiGetNotifications,
  apiMarkNotificationRead,
  getStoredAuthUser,
  apiLogout
} from './api/client';

export default function App() {
  const [currentRole, setCurrentRole] = useState('PUBLIC'); // 'PUBLIC' | 'DRIVER' | 'PUBLISHER'
  const [ads, setAds] = useState([]);
  const [applications, setApplications] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [backendOnline, setBackendOnline] = useState(false);
  const [loadingAds, setLoadingAds] = useState(true);

  // Authentication & Modals
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'signup'
  const [authRole, setAuthRole] = useState('DRIVER');

  // Slide-Over for Campaign Creation
  const [isCreateSlideOverOpen, setIsCreateSlideOverOpen] = useState(false);

  // Friendly Toast
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  // Initial Load
  useEffect(() => {
    const init = async () => {
      // 1. Session check
      const stored = getStoredAuthUser();
      if (stored) {
        setCurrentUser(stored);
        if (stored.role === 'PUBLISHER') setCurrentRole('PUBLISHER');
      }

      // 2. Health check
      const health = await checkHealth();
      setBackendOnline(health.online);

      // 3. Fetch Ads
      setLoadingAds(true);
      const adsRes = await apiGetAds();
      if (adsRes.success) setAds(adsRes.data);
      setLoadingAds(false);

      // 4. Fetch Applications
      const appRes = await apiGetApplications();
      if (appRes.success) setApplications(appRes.data);

      // 5. Fetch Notifications
      const notifRes = await apiGetNotifications(stored?.id || 2);
      if (notifRes.success) setNotifications(notifRes.data);
    };

    init();
  }, []);

  // Handle Authentication Success
  const handleAuthSuccess = (user) => {
    setCurrentUser(user);
    showToast(`Welcome back, ${user.name}!`);
    if (user.role === 'DRIVER') {
      setCurrentRole('DRIVER');
    } else if (user.role === 'PUBLISHER') {
      setCurrentRole('PUBLISHER');
    }
  };

  // Handle Logout
  const handleLogout = () => {
    apiLogout();
    setCurrentUser(null);
    setCurrentRole('PUBLIC');
    showToast('Logged out successfully', 'info');
  };

  // Open Auth with specific mode and role
  const handleOpenAuth = (mode = 'login', role = 'DRIVER') => {
    setAuthMode(mode);
    setAuthRole(role);
    setIsAuthOpen(true);
  };

  // Handle Driver Applying for an Ad
  const handleApplyAd = async (ad) => {
    if (!currentUser) {
      handleOpenAuth('login', 'DRIVER');
      showToast('Please sign in or create an account to apply', 'info');
      return;
    }

    const res = await apiCreateApplication({
      advertisement_id: ad.id,
      driver_id: currentUser.id || 2,
      driver_name: currentUser.name,
      ad_title: ad.title,
      amount: ad.price
    });

    if (res.success) {
      setApplications([res.data, ...applications]);

      const newNotif = {
        id: Date.now(),
        user_id: currentUser.id || 2,
        title: 'Application Submitted',
        message: `Your application for "${ad.title}" has been registered. Visit your nearest hub for installation.`,
        read_status: false,
        created_at: Date.now()
      };
      setNotifications([newNotif, ...notifications]);

      showToast(`Applied to "${ad.title}"! Monthly payout: ₹${Number(ad.price).toLocaleString('en-IN')}`);
    }
  };

  // Handle Creating a New Campaign
  const handleCreateAd = async (adData) => {
    const res = await apiCreateAd({
      ...adData,
      publisher_id: currentUser?.id || 1,
      business_name: adData.business_name || currentUser?.name || 'Enterprise Brand'
    });
    if (res.success) {
      setAds([res.data, ...ads]);
      showToast(`Campaign "${res.data.title}" is now published and active!`);
    }
  };

  // Handle Deleting Ad
  const handleDeleteAd = async (id) => {
    const res = await apiDeleteAd(id);
    if (res.success) {
      setAds(ads.filter((a) => a.id !== id));
      showToast('Campaign removed from active inventory', 'info');
    }
  };

  // Handle Updating Application Status
  const handleUpdateAppStatus = async (id, statusData) => {
    const res = await apiUpdateApplicationStatus(id, statusData);
    if (res.success) {
      setApplications(
        applications.map((app) => (app.id === id ? { ...app, ...statusData } : app))
      );
      showToast(`Application #${id} status updated to ${statusData.status || statusData.payment_status}!`);
    }
  };

  // Handle Notifications
  const handleMarkNotificationRead = async (id) => {
    await apiMarkNotificationRead(id);
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read_status: true } : n))
    );
  };

  const appliedAdIds = applications.map((a) => a.advertisement_id);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6] text-[#1C1917] font-['Plus_Jakarta_Sans',sans-serif] relative">
      {/* Friendly Toast Alert */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 14 }}
            transition={{ duration: 0.15 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <div className="px-4 py-3 rounded-xl bg-stone-900 text-white shadow-lg text-xs font-medium flex items-center gap-2.5">
              {toast.type === 'info' ? (
                <Info className="w-4 h-4 text-stone-300" />
              ) : (
                <Check className="w-4 h-4 text-emerald-400" />
              )}
              <span>{toast.message}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Daylight Navigation Header */}
      <Navbar
        currentRole={currentRole}
        onRoleChange={setCurrentRole}
        backendOnline={backendOnline}
        notifications={notifications}
        onMarkNotificationRead={handleMarkNotificationRead}
        onOpenCreateAd={() => setIsCreateSlideOverOpen(true)}
        currentUser={currentUser}
        onOpenAuth={handleOpenAuth}
        onLogout={handleLogout}
      />

      {/* Main Workspace Content with Smooth Transition */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait">
          {currentRole === 'PUBLIC' && (
            <motion.div
              key="public"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
            >
              <HeroSection
                onExploreClick={() => {
                  const el = document.getElementById('marketplace');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                onAdvertiserClick={() => {
                  if (!currentUser) handleOpenAuth('signup', 'PUBLISHER');
                  else setCurrentRole('PUBLISHER');
                }}
              />

              <StatsSection />

              <div id="marketplace">
                <CampaignExplorer
                  ads={ads}
                  onApply={handleApplyAd}
                  appliedAdIds={appliedAdIds}
                  userRole={currentRole}
                  onOpenCreateAd={() => setIsCreateSlideOverOpen(true)}
                  loading={loadingAds}
                />
              </div>

              <EarningsCalculator
                onApplyClick={() => {
                  const el = document.getElementById('marketplace');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
              />
            </motion.div>
          )}

          {currentRole === 'DRIVER' && (
            <motion.div
              key="driver"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
            >
              <DriverPortal
                applications={applications}
                onBrowseMore={() => setCurrentRole('PUBLIC')}
                currentUser={currentUser}
              />

              <CampaignExplorer
                ads={ads}
                onApply={handleApplyAd}
                appliedAdIds={appliedAdIds}
                userRole="DRIVER"
                onOpenCreateAd={() => setIsCreateSlideOverOpen(true)}
                loading={loadingAds}
              />

              <EarningsCalculator
                onApplyClick={() => {
                  const el = document.getElementById('marketplace');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
              />
            </motion.div>
          )}

          {currentRole === 'PUBLISHER' && (
            <motion.div
              key="publisher"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
            >
              <AdvertiserPortal
                ads={ads}
                applications={applications}
                onOpenCreateAd={() => setIsCreateSlideOverOpen(true)}
                onUpdateAppStatus={handleUpdateAppStatus}
                onDeleteAd={handleDeleteAd}
                currentUser={currentUser}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Slide-Over Panel for Campaign Creation */}
      <CreateAdSlideOver
        isOpen={isCreateSlideOverOpen}
        onClose={() => setIsCreateSlideOverOpen(false)}
        onCreateAd={handleCreateAd}
      />

      {/* Authentication Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onAuthSuccess={handleAuthSuccess}
        initialMode={authMode}
        initialRole={authRole}
      />

      {/* Daylight Studio Footer */}
      <Footer onRoleChange={setCurrentRole} />
    </div>
  );
}
