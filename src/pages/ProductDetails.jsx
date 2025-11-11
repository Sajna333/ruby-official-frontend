// src/pages/ProductDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import axios from "axios";
import { API_URL } from "../config"; // centralized backend URL
import "./ProductDetails.css";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error(err);
        setError("❌ Product not found or server error.");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <p>Loading product...</p>;
  if (error) return <p>{error}</p>;
  if (!product) return <p>No product found.</p>;

  const getImageUrl = (imgPath) => {
    if (!imgPath) return `${API_URL}/uploads/no-image.jpg`;
    if (imgPath.startsWith("http")) return imgPath;
    return `${API_URL}${imgPath}`;
  };

  const imageUrl =
    product.images && product.images.length > 0
      ? getImageUrl(product.images[0])
      : `${API_URL}/uploads/no-image.jpg`;

  const handleAddToCart = () => {
    addToCart({ ...product, quantity });
    alert("✅ Product added to your cart!");
  };

  const handleBuyNow = () => {
    addToCart({ ...product, quantity });
    navigate("/checkout");
  };

  return (
    <div className="product-details-container">
      <div className="product-image">
        <img src={imageUrl} alt={product.name} />
      </div>

      <div className="product-info">
        <h2>{product.name}</h2>
        <p className="price">
          <span className="old-price">
            ₹{product.oldPrice || product.price + 500}
          </span>
          ₹{product.price}
        </p>
        <p className="stock-msg">🚚 Hurry up! Limited stock available</p>
        <p className="description">{product.description}</p>

        <div className="color-section">
          <strong>Color:</strong> All colors available
        </div>

        <div className="quantity-section">
          <strong>Quantity:</strong>
          <div className="quantity-controls">
            <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>−</button>
            <span>{quantity}</span>
            <button onClick={() => setQuantity(quantity + 1)}>+</button>
          </div>
        </div>

        <div className="buttons">
          <button className="btn add-btn" onClick={handleAddToCart}>
            Add to Cart
          </button>
          <button className="btn buy-btn" onClick={handleBuyNow}>
            Buy It Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
