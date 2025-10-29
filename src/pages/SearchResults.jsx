import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";

const SearchResults = () => {
  const [results, setResults] = useState([]);
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query");
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await axios.get(`${API_URL}/products?search=${query}`);
        setResults(res.data);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };
    if (query) fetchResults();
  }, [query, API_URL]);

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h2>Search Results for “{query}”</h2>
      {results.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "20px",
            marginTop: "30px",
          }}
        >
          {results.map((item) => (
            <div
              key={item._id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "10px",
                padding: "15px",
                background: "#fff",
              }}
            >
              <Link
                to={`/products/${item._id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <img
                  src={
                    item.images?.[0]
                      ? item.images[0].startsWith("http")
                        ? item.images[0]
                        : `${API_URL.replace("/api", "")}${item.images[0]}`
                      : `${API_URL.replace("/api", "")}/uploads/no-image.png`
                  }
                  alt={item.name}
                  style={{
                    width: "100%",
                    height: "180px",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />
                <h3>{item.name}</h3>
                <p>₹{item.price}</p>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
