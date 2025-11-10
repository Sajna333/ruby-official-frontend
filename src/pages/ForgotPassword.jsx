import React, { useState } from "react";
import API from "../api"; // ✅ your axios instance
import "./Form.css"; // same responsive style as Login & Register

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      // ✅ Corrected backend endpoint
      const res = await API.post("/auth/forgot-password", { email });
      setMessage(res.data.message || "Password reset link sent!");
    } catch (err) {
      console.error("Forgot Password Error:", err);
      setError(err?.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <div className="form-page">
      <div className="form-card">
        <h2>Forgot Password</h2>

        {/* ✅ Display success/error messages */}
        {message && <p className="success">{message}</p>}
        {error && <p className="error">{error}</p>}

        <form onSubmit={handleSubmit} className="form-content">
          <input
            type="email"
            placeholder="Enter your registered email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button type="submit" disabled={!email}>
            Send Reset Link
          </button>
        </form>
      </div>
    </div>
  );
}
