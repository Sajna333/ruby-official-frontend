import React from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaHeart, FaSearch } from "react-icons/fa";
import "./Navbar.css";

const Navbar = () => {
  return (
    <header className="navbar">
      {/* ✅ Left Menu */}
      <div className="nav-left">
        <h2 className="logo">Ruby Official</h2>
        <nav className="menu">
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/orders">Orders</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/about">About</Link>
        </nav>
      </div>

      {/* ✅ Right Menu */}
      <div className="nav-right">
        <div className="search-container">
          <FaSearch className="icon" />
          <input type="text" placeholder="Search dresses..." />
        </div>
        <Link to="/wishlist" className="icon-link">
          <FaHeart />
        </Link>
        <Link to="/cart" className="icon-link">
          <FaShoppingCart />
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
