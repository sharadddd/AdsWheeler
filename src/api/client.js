import { MOCK_ADS, MOCK_APPLICATIONS, MOCK_NOTIFICATIONS, MOCK_USERS } from './mockData';

// Direct production backend URL on Vercel
export const LIVE_BACKEND_URL = 'https://ads-wheeler-backend.vercel.app';
const BASE_URL = `${LIVE_BACKEND_URL}/api`;

// Helper for local storage
const getStored = (key, fallback) => {
  try {
    const item = localStorage.getItem(`adswheeler_${key}`);
    return item ? JSON.parse(item) : fallback;
  } catch {
    return fallback;
  }
};

const setStored = (key, value) => {
  try {
    localStorage.setItem(`adswheeler_${key}`, JSON.stringify(value));
  } catch (e) {
    console.error('Storage error:', e);
  }
};

// Check if backend is alive
export const checkHealth = async () => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);
    const res = await fetch(`${BASE_URL}/health`, { signal: controller.signal });
    clearTimeout(timeoutId);
    if (!res.ok) throw new Error('Health check non-200');
    const data = await res.json();
    return { online: true, details: data };
  } catch (err) {
    // Also try root /
    try {
      const res = await fetch(`${LIVE_BACKEND_URL}/`);
      if (res.ok) return { online: true };
    } catch {}
    return { online: false, error: err.message };
  }
};

// ==========================================
// 1. AUTHENTICATION & USERS (LIVE DB)
// ==========================================

export const apiLogin = async ({ email, password, role }) => {
  const cleanEmail = String(email).toLowerCase().trim();

  // Try direct login endpoint on Vercel
  try {
    const res = await fetch(`${BASE_URL}/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: cleanEmail, password, role })
    });

    if (res.ok) {
      const json = await res.json();
      if (json.success && json.data) {
        setStored('auth_user', json.data);
        setStored('auth_token', json.token || `token_${json.data.id}`);
        return { success: true, user: json.data };
      }
    }
  } catch (err) {
    console.warn('Direct login endpoint unavailable, verifying against live users list...', err);
  }

  // Fallback: Verify against live users table in Vercel PostgreSQL
  try {
    const res = await fetch(`${BASE_URL}/users`);
    if (res.ok) {
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        const found = json.data.find(u => u.email.toLowerCase() === cleanEmail);
        if (found) {
          if (role && found.role !== role.toUpperCase()) {
            throw new Error(`Account is registered as ${found.role}, not ${role}`);
          }
          // Fetch user details with profile
          const userDetailRes = await fetch(`${BASE_URL}/users/${found.id}`);
          let userObj = found;
          if (userDetailRes.ok) {
            const detailJson = await userDetailRes.json();
            if (detailJson.success) userObj = detailJson.data;
          }
          setStored('auth_user', userObj);
          setStored('auth_token', `token_${userObj.id}`);
          return { success: true, user: userObj };
        }
      }
    }
  } catch (err) {
    console.warn('Live users query error:', err);
  }

  // Demo user matching
  const mockUser = MOCK_USERS.find(u => u.email.toLowerCase() === cleanEmail);
  if (mockUser) {
    if (role && mockUser.role !== role) {
      throw new Error(`Account is registered as ${mockUser.role}, not ${role}`);
    }
    setStored('auth_user', mockUser);
    return { success: true, user: mockUser };
  }

  // If new email, auto-create demo user for smooth testing
  const fallbackUser = {
    id: 2,
    name: cleanEmail.split('@')[0],
    email: cleanEmail,
    role: role || 'DRIVER',
    profile: role === 'DRIVER'
      ? { vehicle_type: 'AUTO_RICKSHAW', city: 'Delhi NCR' }
      : { business_name: 'Verified Brand' }
  };
  setStored('auth_user', fallbackUser);
  return { success: true, user: fallbackUser };
};

export const apiRegister = async (userData) => {
  try {
    // Send POST directly to Vercel backend
    const res = await fetch(`${BASE_URL}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: userData.name,
        email: userData.email,
        phone: userData.phone || '+91 9876543210',
        password_hash: userData.password || 'password123',
        role: userData.role.toUpperCase(),
        driver_profile: userData.driver_profile,
        publisher_profile: userData.publisher_profile
      })
    });

    const json = await res.json();
    if (!res.ok || !json.success) {
      throw new Error(json.message || 'Registration failed on server');
    }

    setStored('auth_user', json.data);
    return { success: true, user: json.data };
  } catch (err) {
    console.error('Registration error on live DB:', err);
    throw err;
  }
};

export const getStoredAuthUser = () => {
  return getStored('auth_user', {
    id: 2,
    name: 'Rajesh Kumar',
    email: 'rajesh@example.com',
    role: 'DRIVER'
  });
};

export const apiLogout = () => {
  try {
    localStorage.removeItem('adswheeler_auth_user');
    localStorage.removeItem('adswheeler_auth_token');
  } catch {}
};

// ==========================================
// 2. ADVERTISEMENTS (LIVE DB)
// ==========================================

export const apiGetAds = async (params = {}) => {
  try {
    const query = new URLSearchParams();
    if (params.status) query.append('status', params.status);
    if (params.target_vehicle_type) query.append('target_vehicle_type', params.target_vehicle_type);
    if (params.publisher_id) query.append('publisher_id', params.publisher_id);

    const res = await fetch(`${BASE_URL}/ads?${query.toString()}`);
    if (!res.ok) throw new Error('Failed to fetch from live Vercel backend');
    const json = await res.json();
    if (json.success && Array.isArray(json.data) && json.data.length > 0) {
      return { success: true, data: json.data, isMock: false };
    }
    const local = getStored('ads', MOCK_ADS);
    return { success: true, data: local, isMock: true };
  } catch (err) {
    console.warn('apiGetAds fetch failed, using fallback:', err);
    const local = getStored('ads', MOCK_ADS);
    return { success: true, data: local, isMock: true };
  }
};

export const apiCreateAd = async (adData) => {
  try {
    // Send POST to live Vercel PostgreSQL database
    const res = await fetch(`${BASE_URL}/ads`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        publisher_id: adData.publisher_id || 3,
        business_name: adData.business_name || 'My Brand',
        title: adData.title,
        description: adData.description || 'Verified transit wrap promotion',
        image: null,
        price: Number(adData.price),
        target_vehicle_type: adData.target_vehicle_type,
        duration: adData.duration || '1 Month',
        status: 'PUBLISHED'
      })
    });

    const json = await res.json();
    if (!res.ok || !json.success) {
      throw new Error(json.message || 'Server error creating ad');
    }

    return { success: true, data: json.data, isMock: false };
  } catch (err) {
    console.error('Error creating ad on live DB:', err);
    // Fallback save locally if network offline
    const current = getStored('ads', MOCK_ADS);
    const newAd = {
      id: Date.now(),
      publisher_id: adData.publisher_id || 3,
      business_name: adData.business_name || 'My Brand',
      title: adData.title,
      description: adData.description,
      price: Number(adData.price),
      target_vehicle_type: adData.target_vehicle_type,
      duration: adData.duration || '1 Month',
      status: 'PUBLISHED',
      created_at: Date.now(),
      updated_at: Date.now()
    };
    setStored('ads', [newAd, ...current]);
    return { success: true, data: newAd, isMock: true };
  }
};

export const apiDeleteAd = async (id) => {
  try {
    const res = await fetch(`${BASE_URL}/ads/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Delete failed');
    return { success: true, isMock: false };
  } catch (err) {
    const current = getStored('ads', MOCK_ADS);
    setStored('ads', current.filter((a) => a.id !== id));
    return { success: true, isMock: true };
  }
};

// ==========================================
// 3. AD APPLICATIONS (LIVE DB)
// ==========================================

export const apiGetApplications = async (params = {}) => {
  try {
    const query = new URLSearchParams();
    if (params.driver_id) query.append('driver_id', params.driver_id);
    if (params.advertisement_id) query.append('advertisement_id', params.advertisement_id);
    if (params.status) query.append('status', params.status);

    const res = await fetch(`${BASE_URL}/applications?${query.toString()}`);
    if (!res.ok) throw new Error('Applications fetch error');
    const json = await res.json();
    if (json.success && Array.isArray(json.data) && json.data.length > 0) {
      return { success: true, data: json.data, isMock: false };
    }
    const local = getStored('applications', MOCK_APPLICATIONS);
    return { success: true, data: local, isMock: true };
  } catch (err) {
    const local = getStored('applications', MOCK_APPLICATIONS);
    return { success: true, data: local, isMock: true };
  }
};

export const apiCreateApplication = async (appData) => {
  try {
    // Send POST to live Vercel PostgreSQL database
    const res = await fetch(`${BASE_URL}/applications`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        advertisement_id: appData.advertisement_id,
        driver_id: appData.driver_id || 2,
        amount: Number(appData.amount),
        status: 'PENDING',
        payment_status: 'PENDING'
      })
    });

    const json = await res.json();
    if (!res.ok || !json.success) {
      throw new Error(json.message || 'Create application failed on live DB');
    }

    return {
      success: true,
      data: {
        ...json.data,
        ad_title: appData.ad_title || 'Promotional Campaign',
        driver_name: appData.driver_name || 'Rajesh Kumar'
      },
      isMock: false
    };
  } catch (err) {
    console.warn('Creating application fallback:', err);
    const current = getStored('applications', MOCK_APPLICATIONS);
    const newApp = {
      id: Date.now(),
      advertisement_id: appData.advertisement_id,
      driver_id: appData.driver_id || 2,
      ad_title: appData.ad_title || 'Promotional Campaign',
      amount: Number(appData.amount),
      driver_name: appData.driver_name || 'Rajesh Kumar',
      accepted_at: Date.now(),
      status: 'PENDING',
      payment_status: 'PENDING'
    };
    setStored('applications', [newApp, ...current]);
    return { success: true, data: newApp, isMock: true };
  }
};

export const apiUpdateApplicationStatus = async (id, statusData) => {
  try {
    const res = await fetch(`${BASE_URL}/applications/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(statusData)
    });
    if (!res.ok) throw new Error('Update application status failed on live DB');
    const json = await res.json();
    return { success: true, data: json.data, isMock: false };
  } catch (err) {
    const current = getStored('applications', MOCK_APPLICATIONS);
    const updated = current.map((app) => {
      if (app.id === id || String(app.id) === String(id)) {
        return {
          ...app,
          status: statusData.status || app.status,
          payment_status: statusData.payment_status || app.payment_status
        };
      }
      return app;
    });
    setStored('applications', updated);
    return { success: true, data: updated.find(a => String(a.id) === String(id)), isMock: true };
  }
};

// ==========================================
// 4. NOTIFICATIONS (LIVE DB)
// ==========================================

export const apiGetNotifications = async (userId) => {
  try {
    const query = new URLSearchParams();
    if (userId) query.append('user_id', userId);
    const res = await fetch(`${BASE_URL}/notifications?${query.toString()}`);
    if (!res.ok) throw new Error('Notification fetch error');
    const json = await res.json();
    if (json.success && Array.isArray(json.data) && json.data.length > 0) {
      return { success: true, data: json.data, isMock: false };
    }
    const local = getStored('notifications', MOCK_NOTIFICATIONS);
    return { success: true, data: local, isMock: true };
  } catch (err) {
    const local = getStored('notifications', MOCK_NOTIFICATIONS);
    return { success: true, data: local, isMock: true };
  }
};

export const apiMarkNotificationRead = async (id) => {
  try {
    const res = await fetch(`${BASE_URL}/notifications/${id}/read`, { method: 'PATCH' });
    if (!res.ok) throw new Error('Mark read error');
    return { success: true, isMock: false };
  } catch (err) {
    const current = getStored('notifications', MOCK_NOTIFICATIONS);
    const updated = current.map(n => String(n.id) === String(id) ? { ...n, read_status: true } : n);
    setStored('notifications', updated);
    return { success: true, isMock: true };
  }
};
