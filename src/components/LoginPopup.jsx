// src/components/LoginPopup.jsx
import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import API from "../api";
import "./LoginPopup.css";

const LoginPopup = ({ isOpen, onClose }) => {
  const [isRegister, setIsRegister] = useState(false); // Toggle between Login/Register
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);

  if (!isOpen) return null; // Don’t render when closed

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (isRegister) {
        // 🔹 Register user
        const res = await API.post("/user/register", {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        });
        login(res.data.user, res.data.token);
      } else {
        // 🔹 Login user
        const res = await API.post("/user/login", {
          email: formData.email,
          password: formData.password,
        });
        login(res.data.user, res.data.token);
      }

      onClose(); // Close popup after success
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong. Try again.");
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup-box">
        <button className="close-btn" onClick={onClose}>
          ✖
        </button>

        <h2>{isRegister ? "Create Account" : "Welcome Back"}</h2>
        <p className="popup-subtitle">
          {isRegister
            ? "Sign up to start shopping with us!"
            : "Login to access your account."}
        </p>

        {error && <p className="error-text">{error}</p>}

        <form onSubmit={handleSubmit}>
          {isRegister && (
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit" className="popup-btn">
            {isRegister ? "Sign Up" : "Login"}
          </button>
        </form>

        <p className="toggle-text">
          {isRegister ? (
            <>
              Already have an account?{" "}
              <span
                className="toggle-link"
                onClick={() => setIsRegister(false)}
              >
                Login
              </span>
            </>
          ) : (
            <>
              Don’t have an account?{" "}
              <span
                className="toggle-link"
                onClick={() => setIsRegister(true)}
              >
                Sign up
              </span>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default LoginPopup;
