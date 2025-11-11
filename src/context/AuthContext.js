// src/context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import API from "../api";

// 🔐 Create global auth context
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // ✅ Safe JSON parsing function
  const safeParse = (key, isJson = true) => {
    try {
      const value = localStorage.getItem(key);
      if (!value || value === "undefined" || value === "null") return null;
      return isJson ? JSON.parse(value) : value;
    } catch (error) {
      console.warn(`⚠️ Failed to parse localStorage key "${key}":`, error);
      localStorage.removeItem(key); // remove corrupted entry
      return null;
    }
  };

  // ✅ Initialize user/token safely
  const [user, setUser] = useState(() => safeParse("user"));
  const [token, setToken] = useState(() => safeParse("token", false));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 🔄 Persist user and token in localStorage safely
  useEffect(() => {
    if (user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user");
  }, [user]);

  useEffect(() => {
    if (token) localStorage.setItem("token", token);
    else localStorage.removeItem("token");
  }, [token]);

  // ✅ LOGIN
  const login = async (email, password) => {
    try {
      setLoading(true);
      setError(null);

      const { data } = await API.post("/auth/login", { email, password });

      setUser(data.user);
      setToken(data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);

      return data;
    } catch (err) {
      const msg = err.response?.data?.message || "Login failed";
      setError(msg);
      throw new Error(msg);
    } finally {
      setLoading(false);
    }
  };

  // ✅ REGISTER
  const register = async (name, email, password) => {
    try {
      setLoading(true);
      setError(null);

      const { data } = await API.post("/auth/register", {
        name,
        email,
        password,
      });

      setUser(data.user);
      setToken(data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);

      return data;
    } catch (err) {
      const msg = err.response?.data?.message || "Registration failed";
      setError(msg);
      throw new Error(msg);
    } finally {
      setLoading(false);
    }
  };

  // ✅ LOGOUT
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  // ✅ Context value
  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        register,
        logout,
        loading,
        error,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Custom hook for easy access
export const useAuth = () => useContext(AuthContext);
