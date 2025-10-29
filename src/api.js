import axios from "axios";
import { API_URL } from "./config";

// ✅ Base URL fallback (works for both local & hosted)
const BASE_URL = (API_URL?.trim() || "http://localhost:5000").replace(/\/+$/, "");

// ✅ Create axios instance with base URL
const API = axios.create({
  baseURL: `${BASE_URL}/api`, // all requests start with /api
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Automatically attach token if available
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
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
        console.warn("⚠️ Bad Request — Check your input data.");
        break;
      case 401:
        console.warn("⚠️ Unauthorized — token may be expired or invalid.");
        localStorage.removeItem("token");
        break;
      case 404:
        console.warn("⚠️ API route not found — verify your endpoint path.");
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
