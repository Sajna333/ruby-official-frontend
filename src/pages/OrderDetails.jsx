// src/pages/OrderDetails.jsx
import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api";
import { AuthContext } from "../context/AuthContext";
import "./OrderDetails.css";

const OrderDetails = () => {
  const { token } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [error, setError] = useState("");
  const [rating, setRating] = useState(0);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const { data } = await API.get(`/orders/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrder(data);
      } catch (err) {
        console.error("❌ Error fetching order:", err);
        setError(err.response?.data?.message || "Failed to fetch order details.");
      }
    };
    fetchOrder();
  }, [id, token]);

  if (error) return <div className="order-error">{error}</div>;
  if (!order) return <div className="loading">Loading...</div>;

  const firstItem = order.orderItems[0];
  const backend = "https://ruby-official-backend.onrender.com";
  const imageUrl = firstItem?.image?.startsWith("http")
    ? firstItem.image
    : `${backend}/uploads/${(firstItem?.image || "no-image.png")
        .replace(/^uploads\//, "")
        .replace(/^\/?/, "")}`;

  return (
    <div className="order-details-page">
      <button className="back-btn" onClick={() => navigate("/orders")}>← Back</button>

      <div className="order-details-card">
        <img src={imageUrl} alt={firstItem?.name} className="detail-image" />
        <div className="order-info">
          <h3>{firstItem?.name}</h3>
          <p><strong>Price:</strong> ₹{firstItem?.price}</p>
          <p><strong>Quantity:</strong> {firstItem?.qty}</p>
          <p><strong>Total:</strong> ₹{order.totalPrice}</p>
        </div>
      </div>

      <div className="delivery-status">
        <h4>{order.isDelivered ? "Delivered ✅" : "Processing ⏳"}</h4>
        <p>Order Date: {new Date(order.createdAt).toDateString()}</p>
        {order.isDelivered && (
          <p>Delivered on: {new Date(order.deliveredAt).toDateString()}</p>
        )}
      </div>

      <div className="rating-section">
        <h4>Rate your experience</h4>
        <div className="stars">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              onClick={() => setRating(star)}
              className={rating >= star ? "filled" : ""}
            >
              ★
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
