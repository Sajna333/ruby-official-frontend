// src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import "./Home.css";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // ✅ Fetch from Render backend
        const res = await axios.get("https://ruby-official-backend.onrender.com/api/products");
        setProducts(res.data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="home-container">
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

      <section className="featured-products">
        <h2>Featured Products</h2>
        <div className="products-grid">
          {products.length > 0 ? (
            products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))
          ) : (
            <p className="no-products">No products available.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
