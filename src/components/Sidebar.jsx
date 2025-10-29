import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Sidebar = ({ open, onClose }) => {
  return (
    <div className={`sidebar-overlay ${open ? "open" : ""}`}>
      <div className="sidebar">
        <button className="close-btn" onClick={onClose}>✕</button>
        <nav className="sidebar-nav">
          <ul>
            <li><Link to="/" onClick={onClose}>Home</Link></li>
            <li><Link to="/products" onClick={onClose}>Products</Link></li>
            <li><Link to="/orders" onClick={onClose}>Orders</Link></li>
            <li><Link to="/contact" onClick={onClose}>Contact Us</Link></li>
            <li><Link to="/about" onClick={onClose}>About</Link></li>
            <li><Link to="/wishlist" onClick={onClose}>Wishlist</Link></li>
          </ul>
        </nav>
      </div>
      <div className="backdrop" onClick={onClose}></div>
    </div>
  );
};

export default Sidebar;
