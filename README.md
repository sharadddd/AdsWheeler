# 🛺 AdsWheeler - Transit & Rickshaw Ad Network Frontend

A modern, high-conversion frontend built with **React, Vite, Tailwind CSS, and Lucide Icons** for the AdsWheeler Transit Advertising Platform.

---

## ✨ Impressive Visual Features & Effects

1. **Interactive 3D/SVG Rickshaw Ad Simulator**:
   - Live custom vector renderings of **Bajaj CNG Auto Rickshaw** & **Electric Toto E-Rickshaw**.
   - Custom branding input (Type any Brand name, slogan, choose theme colors, toggle between Top Hood wrap, Rear panel wrap, or Full body wrap).
   - Real-time road glow effects and animated mockups.

2. **Interactive Driver Income Calculator**:
   - Dynamic slider for daily driving distance (40km - 150km/day).
   - Selection between Auto Rickshaw and E-Rickshaw.
   - Live animated estimation of monthly guaranteed payouts (₹3,000 - ₹6,500/mo) and annual bonuses.

3. **Multi-Role Experience Switcher**:
   - 🌐 **Marketplace & Simulator**: Public live ad catalog with filters for vehicle type (`AUTO_RICKSHAW`, `E_RICKSHAW`, `BOTH`), price sorting, and search.
   - 🛺 **Driver Portal**: Track enrolled wraps, verification badge, UPI payment statuses (`PAID` vs `PENDING`), and active contracts.
   - 📢 **Advertiser Hub**: Metrics dashboard (live reach, active drivers, total impressions), driver application review with 1-click approvals, and campaign management.

4. **Celebration Effects & Micro-Interactions**:
   - Confetti bursts on applying for campaigns or publishing ads.
   - Glassmorphism UI with ambient neon glow orbs.
   - Live backend health indicator (`GET /api/health`).
   - Built-in graceful offline demo mode that preserves user interactions in `localStorage` if PostgreSQL/Express isn't running yet.

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Connect to Backend
Make sure your backend server is running in `AdsWheelerBackend` on port `5001`:
```bash
cd ../AdsWheelerBackend
npm run dev
```
The frontend automatically proxies `/api` calls to `http://localhost:5001`.
