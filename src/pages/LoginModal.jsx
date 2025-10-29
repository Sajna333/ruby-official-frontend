// src/components/LoginModal.jsx
import React, { useState } from "react";
import axios from "axios";

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

      // ✅ Adjust to your backend route
      const { data } = await axios.post("http://localhost:5000/api/user/mobile-login", {
        mobile,
      });

      setMessage("Login successful! Redirecting...");
      console.log(data);

      // Optional: save token or redirect
      // localStorage.setItem("token", data.token);
      // window.location.href = "/";
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-modal">
      <h2>Welcome to RUBY OFFICIAL</h2>
      <form onSubmit={handleLogin}>
        <label>Mobile Number</label>
        <div style={{ display: "flex", gap: "8px" }}>
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

      {message && <p>{message}</p>}
    </div>
  );
};

export default LoginModal;
