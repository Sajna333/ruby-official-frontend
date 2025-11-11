// src/pages/Orders.jsx
import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import { AuthContext } from "../context/AuthContext";
import "./Orders.css";

const Orders = () => {
  const { token } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if (!token) {
          setError("You must be logged in to view your orders.");
          return;
        }
        const { data } = await API.get("/orders/myorders", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("❌ Error fetching orders:", err);
        setError(err.response?.data?.message || "Failed to fetch orders.");
      }
    };
    fetchOrders();
  }, [token]);

  return (
    <div className="orders-page">
      <header className="orders-header">
        <h2>My Orders</h2>
      </header>

      {error && <div className="orders-error">{error}</div>}

      <div className="orders-list">
        {orders.length === 0 ? (
          <div className="no-orders">No orders found.</div>
        ) : (
          orders.map((o) => {
            const firstItem = o.orderItems && o.orderItems[0];
            const date = new Date(o.createdAt);
            const backend = "https://ruby-official-backend.onrender.com";

            const imageUrl = firstItem?.image?.startsWith("http")
              ? firstItem.image
              : `${backend}/uploads/${(firstItem?.image || "no-image.png")
                  .replace(/^uploads\//, "")
                  .replace(/^\/?/, "")}`;

            return (
              <div
                className="order-card"
                key={o._id}
                onClick={() => navigate(`/orders/${o._id}`)}
              >
                <img className="order-thumb" src={imageUrl} alt={firstItem?.name || "item"} />
                <div className="order-body">
                  <div className="order-title">{firstItem?.name || "Order"}</div>
                  <div className="order-meta">
                    <span className={`status ${o.isDelivered ? "delivered" : "processing"}`}>
                      {o.isDelivered ? "Delivered" : "Processing"}
                    </span>
                    <span className="dot">•</span>
                    <span className="date">{date.toDateString()}</span>
                  </div>
                  <div className="order-sub">
                    Qty: {firstItem?.qty || 1} • ₹{o.totalPrice}
                  </div>
                </div>
                <div className="order-arrow">›</div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Orders;
