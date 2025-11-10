// src/components/LoginModal.jsx
import React, { useState } from "react";
import "./LoginModal.css"; // We'll create responsive styles

const LoginModal = () => {
  const [mobile, setMobile] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!mobile || mobile.length !== 10) {
      setMessage("Please enter a valid 10-digit mobile number");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      // ✅ Replace with your backend API route
      const response = await fetch("http://localhost:5000/api/user/mobile-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "Login failed");

      setMessage("Login successful! Redirecting...");
      console.log(data);

      // Optional: store token or redirect
      // localStorage.setItem("token", data.token);
      // window.location.href = "/";
    } catch (err) {
      console.error(err);
      setMessage(err.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-modal-container">
      <div className="login-modal-card">
        <h2>Welcome to RUBY OFFICIAL</h2>
        <form onSubmit={handleLogin}>
          <label>Mobile Number</label>
          <div className="mobile-input-wrapper">
            <span>+91</span>
            <input
              type="text"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              placeholder="Enter mobile number"
            />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {message && <p className="login-message">{message}</p>}
      </div>
    </div>
  );
};

export default LoginModal;
