// src/pages/Products.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api"; // centralized API

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await API.get("/products");
        setProducts(res.data);
      } catch (err) {
        console.error("Failed to fetch products:", err.message);
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
                : `${API.defaults.baseURL.replace(/\/api$/, "")}${product.images[0]}`
              : `${API.defaults.baseURL.replace(/\/api$/, "")}/uploads/no-image.png`;

          return (
            <div
              key={product._id}
              className="product-card"
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
                  e.target.src = `${API.defaults.baseURL.replace(/\/api$/, "")}/uploads/no-image.png`;
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
