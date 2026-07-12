// src/components/ProductCard.jsx
import React from "react";
import { useCart } from "../context/CartContext";
import { API_URL } from "../config"; // centralized backend URL
import "./ProductCard.css";

const FALLBACK_IMG =
  "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Crect width='100%25' height='100%25' fill='%23eee'/%3E%3Ctext x='50%25' y='50%25' font-size='16' text-anchor='middle' fill='%23999' dy='.3em'%3ENo Image%3C/text%3E%3C/svg%3E";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const imageUrl =
    product.images && product.images.length > 0
      ? product.images[0].startsWith("http")
        ? product.images[0]
        : `${API_URL}${product.images[0]}`
      : FALLBACK_IMG;

  return (
    <div className="product-card">
      <img
        src={imageUrl}
        alt={product.name}
        onError={(e) => {
          e.target.onerror = null; // stop retry loop
          e.target.src = FALLBACK_IMG;
        }}
      />
      <div className="product-info">
        <h3>{product.name}</h3>
        <p className="price">₹{product.price}</p>

        <div className="card-buttons">
          <button className="btn cart-btn" onClick={() => addToCart(product)}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;