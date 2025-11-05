// src/config.js

// ✅ Backend API URL
export const API_URL = "https://ruby-official-backend.onrender.com"; // Render backend URL

// ✅ Razorpay key
export const RAZORPAY_KEY_ID =
  process.env.REACT_APP_RAZORPAY_KEY_ID || "rzp_test_1234567890abc";

// ✅ Website info
export const WEBSITE_NAME =
  process.env.REACT_APP_WEBSITE_NAME || "Ruby Official";

export const THEME_COLOR =
  process.env.REACT_APP_THEME_COLOR || "#d81b60";

// ✅ Supported payment methods
export const PAYMENT_METHODS = {
  razorpay: true,
  googlePay: false,
};
