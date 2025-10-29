// src/pages/Orders.jsx
import React, { useEffect, useState, useContext } from "react";
import API from "../api";
import { AuthContext } from "../context/AuthContext";

const Orders = () => {
  const { token } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if (!token) {
          setError("You must be logged in to view your orders.");
          return;
        }

        const { data } = await API.get("/orders/myorders"); // ✅ uses token automatically
        setOrders(data);
      } catch (err) {
        console.error("❌ Error fetching orders:", err);
        setError(err.response?.data?.message || "Failed to fetch orders.");
      }
    };

    fetchOrders();
  }, [token]);

  return (
    <div style={{ padding: "20px" }}>
      <h2>My Orders</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <table border="1" cellPadding="10" style={{ marginTop: "20px", width: "100%" }}>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Total Price</th>
              <th>Payment Method</th>
              <th>Paid</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>₹{order.totalPrice}</td>
                <td>{order.paymentMethod}</td>
                <td>{order.isPaid ? "✅ Yes" : "❌ No"}</td>
                <td>{new Date(order.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Orders;
