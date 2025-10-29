// src/components/ProductCard.jsx
import React from "react";
import { useCart } from "../context/CartContext";
import { API_URL } from "../config"; // centralized backend URL
import "./ProductCard.css";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const imageUrl =
    product.images && product.images.length > 0
      ? product.images[0].startsWith("http")
        ? product.images[0]
        : `${API_URL}${product.images[0]}`
      : `${API_URL}/uploads/no-image.png`;

  return (
    <div className="product-card">
      <img src={imageUrl} alt={product.name} />
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
