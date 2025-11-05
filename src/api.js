// src/api.js
import axios from "axios";
import { API_URL } from "./config";

// ✅ Base URL fallback
const BASE_URL = API_URL.replace(/\/+$/, "");

// ✅ Axios instance
const API = axios.create({
  baseURL: `${BASE_URL}/api`,
  headers: { "Content-Type": "application/json" },
});

// ✅ Attach token automatically
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Global error handling
API.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    switch (status) {
      case 400:
        console.warn("⚠️ Bad Request — check your input.");
        break;
      case 401:
        console.warn("⚠️ Unauthorized — token may be invalid.");
        localStorage.removeItem("token");
        break;
      case 404:
        console.warn("⚠️ API route not found.");
        break;
      case 500:
        console.error("❌ Internal Server Error — check backend logs.");
        break;
      default:
        console.error("⚠️ API error:", error.message);
    }
    return Promise.reject(error);
  }
);

export default API;
