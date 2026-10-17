const BASE = 'https://ads-wheeler-backend.vercel.app/api';

async function seed() {
  console.log('--- Seeding Live Vercel Backend ---');

  // 1. Check ads
  const adsRes = await fetch(`${BASE}/ads`).then(r => r.json());
  console.log('Current live ads count:', adsRes.count);

  if (adsRes.count === 0) {
    const sampleAds = [
      {
        publisher_id: 3,
        business_name: 'Zomato Gold',
        title: 'Zomato Gold Dining Festival: Flat 50% Off',
        description: 'Full vehicle rear panel wrap & passenger canopy branding for high-density metro routes. Monthly payouts directly to UPI.',
        price: 3800.00,
        target_vehicle_type: 'AUTO_RICKSHAW',
        duration: '1 Month',
        status: 'PUBLISHED'
      },
      {
        publisher_id: 3,
        business_name: 'Cult.fit Wellness',
        title: 'CultPass Elite: Transform in 90 Days',
        description: 'High-contrast hood wrap and driver backrest poster. Targets residential societies and tech parks.',
        price: 4500.00,
        target_vehicle_type: 'BOTH',
        duration: '3 Months',
        status: 'PUBLISHED'
      },
      {
        publisher_id: 3,
        business_name: 'Amazon Prime Day',
        title: 'Prime Day Mega Deals: Big Savings',
        description: 'Full canopy roof-top banner & rear reflector wrap. Includes weekly fuel subsidy payout.',
        price: 5200.00,
        target_vehicle_type: 'AUTO_RICKSHAW',
        duration: '1 Month',
        status: 'PUBLISHED'
      },
      {
        publisher_id: 3,
        business_name: 'Ola Electric Hub',
        title: 'Switch to Green: Test Drive Ola S1 Air',
        description: 'Eco-friendly branding designed specifically for E-Rickshaw side panels and rear windscreen.',
        price: 3200.00,
        target_vehicle_type: 'E_RICKSHAW',
        duration: '2 Months',
        status: 'PUBLISHED'
      },
      {
        publisher_id: 3,
        business_name: 'Tata 1mg Healthcare',
        title: 'Get Medicines Delivered in 30 Mins',
        description: 'Healthcare awareness banner wrap with commuter QR code for medicine discounts.',
        price: 4100.00,
        target_vehicle_type: 'AUTO_RICKSHAW',
        duration: '2 Months',
        status: 'PUBLISHED'
      },
      {
        publisher_id: 3,
        business_name: 'Paytm Soundbox Pro',
        title: 'Accept All UPI Payments & Instant Audio Alerts',
        description: 'Targeted merchant promotion on Auto hood panels. Direct UPI settlement on 1st of every month.',
        price: 3600.00,
        target_vehicle_type: 'BOTH',
        duration: '1 Month',
        status: 'PUBLISHED'
      }
    ];

    for (const ad of sampleAds) {
      const res = await fetch(`${BASE}/ads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ad)
      }).then(r => r.json());
      console.log('Inserted ad:', res.data?.title || res);
    }
  }

  // 2. Check notifications
  const notifRes = await fetch(`${BASE}/notifications`).then(r => r.json());
  console.log('Current live notifications count:', notifRes.count);

  if (notifRes.count === 0) {
    const sampleNotifs = [
      {
        user_id: 2,
        title: 'Payment Credited',
        message: '₹3,800.00 has been credited to your UPI ID for Zomato Gold Campaign wrap.',
        type: 'PAYMENT'
      },
      {
        user_id: 2,
        title: 'Application Approved',
        message: 'Your application for Amazon Prime Day Mega Deals was approved! Visit hub for wrap installation.',
        type: 'CAMPAIGN'
      },
      {
        user_id: 2,
        title: 'New High Payout Campaign Near You',
        message: 'Paytm Soundbox Pro campaign is now live in Delhi NCR offering ₹3,600/month.',
        type: 'ALERT'
      }
    ];

    for (const n of sampleNotifs) {
      const res = await fetch(`${BASE}/notifications`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(n)
      }).then(r => r.json());
      console.log('Inserted notification:', res.data?.title || res);
    }
  }

  // 3. Applications
  const appRes = await fetch(`${BASE}/applications`).then(r => r.json());
  console.log('Current live applications count:', appRes.count);

  if (appRes.count === 0) {
    // Get first ad
    const freshAds = await fetch(`${BASE}/ads`).then(r => r.json());
    if (freshAds.data && freshAds.data.length > 0) {
      const appData = {
        advertisement_id: freshAds.data[0].id,
        driver_id: 2,
        amount: freshAds.data[0].price,
        status: 'ACTIVE',
        payment_status: 'PAID'
      };
      const res = await fetch(`${BASE}/applications`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(appData)
      }).then(r => r.json());
      console.log('Inserted application:', res.data?.id || res);
    }
  }

  console.log('--- Done Seeding Live Backend ---');
}

seed().catch(console.error);
