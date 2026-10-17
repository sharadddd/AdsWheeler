export const MOCK_USERS = [
  {
    id: 1,
    name: "Zomato Quick B2B",
    email: "ads@zomato.com",
    phone: "+919811223344",
    role: "PUBLISHER",
    profile_image: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=120&q=80",
    profile: {
      business_name: "Zomato Food Delivery",
      business_category: "Food & Beverage",
      business_address: "Cyber City, Gurugram, NCR",
      contact_phone: "+919811223344"
    }
  },
  {
    id: 2,
    name: "Rajesh Kumar Sharma",
    email: "rajesh.auto@gmail.com",
    phone: "+919876543210",
    role: "DRIVER",
    profile_image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80",
    profile: {
      vehicle_type: "AUTO_RICKSHAW",
      vehicle_registration_number: "DL 1RA 4892",
      driving_licence_number: "DL-142018009182",
      city: "New Delhi (Connaught Place & South Delhi)",
      availability_status: true
    }
  },
  {
    id: 3,
    name: "Mukesh Yadav",
    email: "mukesh.erickshaw@gmail.com",
    phone: "+919876543211",
    role: "DRIVER",
    profile_image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80",
    profile: {
      vehicle_type: "E_RICKSHAW",
      vehicle_registration_number: "UP 16 ER 7102",
      driving_licence_number: "UP-162020003411",
      city: "Noida / Greater Noida",
      availability_status: true
    }
  }
];

export const MOCK_ADS = [
  {
    id: 1,
    publisher_id: 1,
    business_name: "Zomato Gold",
    title: "Zomato Gold Dining Festival: Flat 50% Off",
    description: "Full vehicle back panel wrap & passenger-side canopy branding for high-density metro routes. Monthly payouts directly to your UPI.",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80",
    price: 3800.00,
    target_vehicle_type: "AUTO_RICKSHAW",
    duration: "1 Month",
    status: "PUBLISHED",
    created_at: Date.now() - 86400000 * 2,
    updated_at: Date.now() - 86400000 * 2,
    city: "Delhi NCR",
    impressions_estimate: "140K/month",
    slots_left: 45
  },
  {
    id: 2,
    publisher_id: 1,
    business_name: "Cult.fit Wellness",
    title: "CultPass Elite: Transform in 90 Days",
    description: "High-contrast electric neon hood sticker and driver backrest poster. Perfect for drivers commuting near residential societies & tech parks.",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=600&q=80",
    price: 4500.00,
    target_vehicle_type: "BOTH",
    duration: "3 Months",
    status: "PUBLISHED",
    created_at: Date.now() - 86400000 * 3,
    updated_at: Date.now() - 86400000 * 3,
    city: "Bengaluru & Mumbai",
    impressions_estimate: "190K/month",
    slots_left: 28
  },
  {
    id: 3,
    publisher_id: 1,
    business_name: "Amazon Prime Day",
    title: "Prime Day Mega Deals: Big Savings",
    description: "Full canopy roof-top banner & rear reflector signage. Guaranteed weekly fuel subsidy payout added on top of base amount.",
    image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=600&q=80",
    price: 5200.00,
    target_vehicle_type: "AUTO_RICKSHAW",
    duration: "1 Month",
    status: "PUBLISHED",
    created_at: Date.now() - 86400000 * 5,
    updated_at: Date.now() - 86400000 * 5,
    city: "Delhi NCR, Pune, Jaipur",
    impressions_estimate: "220K/month",
    slots_left: 12
  },
  {
    id: 4,
    publisher_id: 1,
    business_name: "Ola Electric Hub",
    title: "Switch to Green: Test Drive Ola S1 Air",
    description: "Eco-friendly branding designed specifically for E-Rickshaw side panels and rear windscreen stickers. Zero vehicle damage guarantee.",
    image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=600&q=80",
    price: 3200.00,
    target_vehicle_type: "E_RICKSHAW",
    duration: "2 Months",
    status: "PUBLISHED",
    created_at: Date.now() - 86400000 * 1,
    updated_at: Date.now() - 86400000 * 1,
    city: "Lucknow & Kanpur",
    impressions_estimate: "115K/month",
    slots_left: 60
  },
  {
    id: 5,
    publisher_id: 1,
    business_name: "Tata 1mg Healthcare",
    title: "Get Medicines Delivered in 30 Mins",
    description: "Healthcare awareness banner wrap. Includes emergency QR code for commuters to scan medicine discounts while traveling in your auto.",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80",
    price: 4100.00,
    target_vehicle_type: "AUTO_RICKSHAW",
    duration: "2 Months",
    status: "PUBLISHED",
    created_at: Date.now() - 86400000 * 6,
    updated_at: Date.now() - 86400000 * 6,
    city: "Hyderabad & Chennai",
    impressions_estimate: "160K/month",
    slots_left: 19
  },
  {
    id: 6,
    publisher_id: 1,
    business_name: "Paytm Soundbox Pro",
    title: "Accept All Payments & Audio Alerts",
    description: "Targeted merchant and daily commuter promotion on Auto hood panels. Drivers receive direct UPI bank transfer on the 1st of every month.",
    image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=600&q=80",
    price: 3600.00,
    target_vehicle_type: "BOTH",
    duration: "1 Month",
    status: "PUBLISHED",
    created_at: Date.now() - 86400000 * 4,
    updated_at: Date.now() - 86400000 * 4,
    city: "Pan-India",
    impressions_estimate: "135K/month",
    slots_left: 85
  }
];

export const MOCK_APPLICATIONS = [
  {
    id: 101,
    advertisement_id: 1,
    driver_id: 2,
    ad_title: "Zomato Gold Dining Festival: Flat 50% Off",
    ad_price: 3800.00,
    driver_name: "Rajesh Kumar Sharma",
    driver_phone: "+919876543210",
    accepted_at: Date.now() - 86400000 * 10,
    start_date: Date.now() - 86400000 * 8,
    end_date: Date.now() + 86400000 * 22,
    status: "ACTIVE",
    payment_status: "PAID",
    amount: 3800.00
  },
  {
    id: 102,
    advertisement_id: 3,
    driver_id: 2,
    ad_title: "Amazon Prime Day Mega Deals",
    ad_price: 5200.00,
    driver_name: "Rajesh Kumar Sharma",
    driver_phone: "+919876543210",
    accepted_at: Date.now() - 86400000 * 1,
    start_date: Date.now(),
    end_date: Date.now() + 86400000 * 30,
    status: "ACCEPTED",
    payment_status: "PENDING",
    amount: 5200.00
  },
  {
    id: 103,
    advertisement_id: 4,
    driver_id: 3,
    ad_title: "Switch to Green: Test Drive Ola S1 Air",
    ad_price: 3200.00,
    driver_name: "Mukesh Yadav",
    driver_phone: "+919876543211",
    accepted_at: Date.now() - 86400000 * 3,
    start_date: null,
    end_date: null,
    status: "PENDING",
    payment_status: "PENDING",
    amount: 3200.00
  }
];

export const MOCK_NOTIFICATIONS = [
  {
    id: 1,
    user_id: 2,
    title: "Payment Received! 💰",
    message: "₹3,800.00 has been credited to your UPI ID for Zomato Gold Campaign wrap.",
    type: "PAYMENT",
    read_status: false,
    created_at: Date.now() - 3600000 * 4
  },
  {
    id: 2,
    user_id: 2,
    title: "Application Approved 🎉",
    message: "Your application for Amazon Prime Day Mega Deals was approved! Visit hub for wrap installation.",
    type: "CAMPAIGN",
    read_status: false,
    created_at: Date.now() - 3600000 * 18
  },
  {
    id: 3,
    user_id: 2,
    title: "New High Payout Campaign Near You",
    message: "Paytm Soundbox Pro campaign is now live in Delhi NCR offering ₹3,600/month.",
    type: "ALERT",
    read_status: true,
    created_at: Date.now() - 86400000 * 2
  }
];
