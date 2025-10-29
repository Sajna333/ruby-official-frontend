import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api";
import { AuthContext } from "../context/AuthContext";
import "./Login.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // ✅ Correct endpoint (no /api)
      const res = await API.post("/users/register", { name, email, password });

      if (res.data.user) {
        localStorage.setItem("token", res.data.token);
        setUser(res.data.user);
      }

      navigate("/");
    } catch (err) {
      console.error("Registration error:", err);
      setError(err?.response?.data?.message || "Registration failed. Try again.");
    }
  };

  return (
    <div className="login-container">
      <h2>Create an Account</h2>
      {error && <p className="error">{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Create Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Sign Up</button>
      </form>

      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default Register;
