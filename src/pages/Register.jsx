// src/pages/Register.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../api";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const { name, email, password, confirmPassword } = formData;

    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const data = await registerUser(name, email, password);

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify({
        _id: data._id,
        name: data.name,
        email: data.email,
      }));

      setSuccess("Registration successful! Redirecting...");

      setTimeout(() => navigate("/"), 1500);

    } catch (err) {
      console.error("Register Error:", err);
      setError(
        err.response?.data?.message ||
        "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <div style={{ textAlign: "center", marginBottom: "28px" }}>
          <h2 style={titleStyle}>Create Account</h2>
          <p style={subtitleStyle}>Join Ruby Official today</p>
        </div>

        {error && (
          <div style={errorBoxStyle}>
            ⚠️ {error}
          </div>
        )}

        {success && (
          <div style={successBoxStyle}>
            ✅ {success}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div style={fieldStyle}>
            <label style={labelStyle}>Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your full name"
              style={inputStyle}
              autoComplete="name"
            />
          </div>

          <div style={fieldStyle}>
            <label style={labelStyle}>Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              style={inputStyle}
              autoComplete="email"
            />
          </div>

          <div style={fieldStyle}>
            <label style={labelStyle}>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Min. 6 characters"
              style={inputStyle}
              autoComplete="new-password"
            />
          </div>

          <div style={fieldStyle}>
            <label style={labelStyle}>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Repeat your password"
              style={inputStyle}
              autoComplete="new-password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              ...buttonStyle,
              opacity: loading ? 0.7 : 1,
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Creating Account..." : "Register"}
          </button>
        </form>

        <p style={bottomTextStyle}>
          Already have an account?{" "}
          <Link to="/login" style={linkStyle}>
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

const containerStyle = {
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#f9f9f9",
  padding: "20px",
};

const cardStyle = {
  backgroundColor: "#ffffff",
  borderRadius: "12px",
  boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
  padding: "40px 36px",
  width: "100%",
  maxWidth: "420px",
};

const titleStyle = {
  fontSize: "26px",
  fontWeight: "700",
  color: "#1a1a1a",
  margin: "0 0 6px 0",
};

const subtitleStyle = {
  fontSize: "14px",
  color: "#888",
  margin: 0,
};

const fieldStyle = {
  marginBottom: "18px",
};

const labelStyle = {
  display: "block",
  fontSize: "13px",
  fontWeight: "600",
  color: "#444",
  marginBottom: "6px",
};

const inputStyle = {
  display: "block",
  width: "100%",
  padding: "11px 14px",
  border: "1px solid #ddd",
  borderRadius: "8px",
  fontSize: "14px",
  color: "#1a1a1a",
  backgroundColor: "#fafafa",
  boxSizing: "border-box",
  outline: "none",
  transition: "border-color 0.2s",
};

const buttonStyle = {
  width: "100%",
  padding: "13px",
  backgroundColor: "#556b2f",
  color: "#ffffff",
  border: "none",
  borderRadius: "8px",
  fontSize: "15px",
  fontWeight: "600",
  marginTop: "8px",
  transition: "opacity 0.2s",
};

const errorBoxStyle = {
  backgroundColor: "#fff0f0",
  border: "1px solid #fcc",
  borderRadius: "8px",
  padding: "10px 14px",
  marginBottom: "18px",
  fontSize: "13px",
  color: "#c0392b",
};

const successBoxStyle = {
  backgroundColor: "#f0fff4",
  border: "1px solid #b2f5c8",
  borderRadius: "8px",
  padding: "10px 14px",
  marginBottom: "18px",
  fontSize: "13px",
  color: "#276749",
};

const bottomTextStyle = {
  textAlign: "center",
  marginTop: "20px",
  fontSize: "14px",
  color: "#666",
};

const linkStyle = {
  color: "#556b2f",
  fontWeight: "600",
  textDecoration: "none",
};

export default Register;