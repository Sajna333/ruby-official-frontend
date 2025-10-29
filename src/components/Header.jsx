import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiMenu,
  FiSearch,
  FiShoppingCart,
  FiX,
  FiUser,
} from "react-icons/fi";
import { useCart } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import "./Header.css";

const Header = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const { cart } = useCart();
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);

  const handleLoginClick = () => navigate("/login");
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // 🔍 Fetch products when typing
  useEffect(() => {
    const fetchSearchResults = async () => {
      if (searchTerm.trim() === "") {
        setSearchResults([]);
        return;
      }
      try {
        const res = await axios.get(
          `http://localhost:5000/api/products?search=${searchTerm}`
        );
        setSearchResults(res.data);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };
    const delayDebounce = setTimeout(fetchSearchResults, 400);
    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

  // ✅ Handle product click (correct route)
  const handleProductClick = (id) => {
    setSearchOpen(false);
    setSearchTerm("");
    setSearchResults([]);
    setTimeout(() => navigate(`/products/${id}`), 150); // fixed route path
  };

  return (
    <>
      <header className="header">
        <div className="header-left">
          <button onClick={() => setSidebarOpen(!sidebarOpen)}>
            <FiMenu size={24} />
          </button>
        </div>

        <div className="header-center">
          <Link to="/" className="brand-name">
            RUBY OFFICIAL
          </Link>
        </div>

        <div className="header-right">
          <button onClick={() => setSearchOpen(!searchOpen)}>
            <FiSearch size={22} />
          </button>

          <Link to="/cart" className="cart-link">
            <FiShoppingCart size={22} />
            {itemCount > 0 && <span className="cart-count">{itemCount}</span>}
          </Link>

          {user ? (
            <>
              <span className="user-name">
                <FiUser /> {user.name || "User"}
              </span>
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <button className="login-btn-header" onClick={handleLoginClick}>
              Login
            </button>
          )}
        </div>
      </header>

      {/* Sidebar */}
      <div
        className={`sidebar-overlay ${sidebarOpen ? "visible" : ""}`}
        onClick={() => setSidebarOpen(false)}
      ></div>

      <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <button className="close-btn" onClick={() => setSidebarOpen(false)}>
          <FiX size={24} />
        </button>
        <nav className="sidebar-nav">
          <Link to="/" onClick={() => setSidebarOpen(false)}>
            Home
          </Link>
          <Link to="/products" onClick={() => setSidebarOpen(false)}>
            Products
          </Link>
          <Link to="/orders" onClick={() => setSidebarOpen(false)}>
            Orders
          </Link>
          <Link to="/about" onClick={() => setSidebarOpen(false)}>
            About
          </Link>
          <Link to="/contact" onClick={() => setSidebarOpen(false)}>
            Contact
          </Link>
        </nav>
      </div>

      {/* Search Bar */}
      {searchOpen && (
        <div className="search-container">
          <div className="search-bar-modern">
            <input
              type="text"
              placeholder="Search for products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              autoFocus
            />
            {searchTerm && (
              <FiX
                className="close-icon"
                onClick={() => setSearchTerm("")}
                size={18}
              />
            )}
          </div>

          {/* Search Results Dropdown */}
          {searchTerm && (
            <div className="search-dropdown">
              {searchResults.length > 0 ? (
                searchResults.map((product) => (
                  <div
                    key={product._id}
                    className="search-item"
                    onClick={() => handleProductClick(product._id)}
                  >
                    <img
                      src={
                        product.images?.length
                          ? `http://localhost:5000${product.images[0]}`
                          : "https://via.placeholder.com/50"
                      }
                      alt={product.name}
                    />
                    <span>{product.name}</span>
                  </div>
                ))
              ) : (
                <p className="no-results">No products found</p>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Header;
