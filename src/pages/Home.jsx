// src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import API from "../api"; // centralized API instance
import ProductCard from "../components/ProductCard";
import "./Home.css";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch products using centralized API
        const res = await API.get("/products");
        setProducts(res.data);
      } catch (err) {
        console.error("Failed to fetch products:", err);

        // Show user-friendly error
        if (err.response) {
          setError(
            `Error ${err.response.status}: ${err.response.data.message || "Failed to load products"}`
          );
        } else {
          setError("Network error: Failed to fetch products. Please try again later.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section
        className="hero-section"
        style={{
          backgroundImage: 'url("/assets/images/hero-background.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="hero-overlay">
          <div className="hero-text">
            <h1>Ruby Official</h1>
            <p>Elegant. Custom. Timeless — Discover your perfect fit.</p>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="featured-products">
        <h2>Featured Products</h2>

        {loading ? (
          <p>Loading products...</p>
        ) : error ? (
          <p style={{ color: "red" }}>{error}</p>
        ) : products.length === 0 ? (
          <p>No products available.</p>
        ) : (
          <div className="products-grid">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
