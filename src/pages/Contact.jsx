// src/pages/Contact.jsx
import React, { useState } from "react";
import API from "../api"; // ✅ your axios instance
import "./Form.css";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("");
    setError("");

    try {
      const res = await API.post("/contact", formData);
      setStatus(res.data.message || "Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to send message.");
    }
  };

  return (
    <div className="form-page">
      <div className="form-card">
        <h2>Contact Us</h2>
        <p className="contact-info">
          📞 <strong>Phone:</strong>{" "}
          <a href="tel:9544890349">9544890349</a> <br />
          📧 <strong>Email:</strong>{" "}
          <a href="mailto:sajnahashim02@gmail.com">sajnahashim02@gmail.com</a>
        </p>

        {status && <p className="success">{status}</p>}
        {error && <p className="error">{error}</p>}

        <form onSubmit={handleSubmit} className="form-content">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            rows="4"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>

          <button type="submit">Send Message</button>
        </form>
      </div>
    </div>
  );
}
