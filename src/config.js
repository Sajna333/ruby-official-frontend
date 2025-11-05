// src/config.js

// ✅ Backend API URL (Render deployment)
export const API_URL = "https://ruby-official-backend.onrender.com"; 

// ✅ Razorpay key (frontend only — do NOT expose secret)
export const RAZORPAY_KEY_ID =
  process.env.REACT_APP_RAZORPAY_KEY_ID || "rzp_test_1234567890abc";

// ✅ Website / Brand information
export const WEBSITE_NAME =
  process.env.REACT_APP_WEBSITE_NAME || "Ruby Official";

export const THEME_COLOR =
  process.env.REACT_APP_THEME_COLOR || "#d81b60";

// ✅ Supported payment methods
export const PAYMENT_METHODS = {
  razorpay: true,
  googlePay: false,
};
