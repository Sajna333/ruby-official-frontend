import React, { createContext, useContext, useState, useEffect } from "react";
import API from "../api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user")) || null);
  const [token, setToken] = useState(() => localStorage.getItem("token") || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 🔄 Persist user and token in localStorage
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

      // ✅ Correct endpoint (no extra /api)
      const { data } = await API.post("/users/login", { email, password });

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

      // ✅ Correct endpoint (no extra /api)
      const { data } = await API.post("/users/register", { name, email, password });

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

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, loading, error, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Custom hook for easy access
export const useAuth = () => useContext(AuthContext);
