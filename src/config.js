// src/config.js

/**
 * ✅ Backend API URL Configuration
 * Switches automatically between development and production.
 */
export const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://your-production-domain.com" // 🔁 Replace with your deployed backend URL
    : ""; // Local backend for dev environment

/**
 * ✅ Razorpay public key (frontend use only — NOT secret key)
 */
export const RAZORPAY_KEY_ID =
  process.env.REACT_APP_RAZORPAY_KEY_ID || "rzp_test_1234567890abc"; // Replace with actual test key

/**
 * ✅ Brand / Meta Information
 */
export const WEBSITE_NAME =
  process.env.REACT_APP_WEBSITE_NAME || "Ruby Official";

export const THEME_COLOR =
  process.env.REACT_APP_THEME_COLOR || "#d81b60";

/**
 * ✅ Supported payment methods (for easy feature toggles)
 */
export const PAYMENT_METHODS = {
  razorpay: true,
  googlePay: false, // enable later if implemented
};
