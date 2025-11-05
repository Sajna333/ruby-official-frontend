import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../config";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const baseURL = (API_URL?.trim() || "https://ruby-official-backend.onrender.com").replace(/\/+$/, "");
        const res = await axios.get(`${baseURL}/api/products`);
        setProducts(res.data);
      } catch (err) {
        console.error("❌ Failed to fetch products:", err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) return <p style={{ textAlign: "center" }}>Loading products...</p>;
  if (!products.length) return <p style={{ textAlign: "center" }}>No products found.</p>;

  return (
    <div className="products-page" style={{ padding: "20px" }}>
      <h2 style={{ color: "#556b2f", textAlign: "center" }}>Featured Products</h2>

      <div
        className="products-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        {products.map((product) => {
          const imageUrl =
            product.images && product.images.length > 0
              ? product.images[0].startsWith("http")
                ? product.images[0]
                : `${API_URL || "https://ruby-official-backend.onrender.com"}${product.images[0]}`
              : `${API_URL || "https://ruby-official-backend.onrender.com"}/uploads/no-image.png`;

          return (
            <div
              className="product-card"
              key={product._id}
              style={{
                backgroundColor: "#fff",
                borderRadius: "15px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                textAlign: "center",
                paddingBottom: "15px",
                transition: "transform 0.2s ease",
              }}
            >
              <img
                src={imageUrl}
                alt={product.name}
                style={{
                  width: "100%",
                  height: "300px",
                  objectFit: "cover",
                  borderTopLeftRadius: "15px",
                  borderTopRightRadius: "15px",
                }}
                onError={(e) => {
                  e.target.src = `${API_URL || "https://ruby-official-backend.onrender.com"}/uploads/no-image.png`;
                }}
              />
              <h3>{product.name}</h3>
              <p>₹{product.price}</p>
              <Link
                to={`/products/${product._id}`}
                className="btn"
                style={{
                  backgroundColor: "#556b2f",
                  color: "#fff",
                  padding: "8px 15px",
                  borderRadius: "5px",
                  textDecoration: "none",
                  display: "inline-block",
                }}
              >
                View Details
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Products;
