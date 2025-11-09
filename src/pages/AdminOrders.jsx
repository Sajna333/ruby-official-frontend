// src/pages/AdminOrders.jsx
import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import API from "../api";
import "./Admin.css";

const AdminOrders = () => {
  const { token } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");

  // 🟢 Fetch all orders (Admin only)
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await API.get("/orders", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(data);
      } catch (error) {
        console.error("❌ Failed to fetch orders:", error);
      }
    };

    fetchOrders();
  }, [token]);

  // 🔍 Filter orders by username or email
  const filteredOrders = orders.filter((o) =>
    o.user?.name?.toLowerCase().includes(search.toLowerCase()) ||
    o.user?.email?.toLowerCase().includes(search.toLowerCase())
  );

  // 🧾 Export CSV
  const handleExport = () => {
    const csv = [
      ["User", "Product", "Price", "Shipping", "Ordered At"].join(","),
      ...orders.map((o) =>
        [
          o.user?.email || "N/A",
          o.orderItems.map((i) => i.name).join("; "),
          "₹" + o.totalPrice,
          `${o.shippingAddress?.address}, ${o.shippingAddress?.city}`,
          new Date(o.createdAt).toLocaleString(),
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "orders.csv";
    link.click();
  };

  return (
    <div className="admin-orders-page">
      <div className="admin-header">
        <h2>📦 Order Management</h2>
        <div className="admin-actions">
          <input
            type="text"
            placeholder="Search orders by username or email"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="export-btn" onClick={handleExport}>
            Export
          </button>
        </div>
        <p className="order-count">{filteredOrders.length} orders found</p>
      </div>

      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Items</th>
              <th>Total Price</th>
              <th>Shipping Info</th>
              <th>Ordered At</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  No orders found
                </td>
              </tr>
            ) : (
              filteredOrders.map((order) => (
                <tr key={order._id}>
                  <td>
                    {order.user?.name || "Unknown"} <br />
                    <small>{order.user?.email}</small>
                  </td>
                  <td>
                    {order.orderItems.map((item, idx) => (
                      <div key={idx}>
                        {item.name} × {item.qty}
                      </div>
                    ))}
                  </td>
                  <td>₹{order.totalPrice}</td>
                  <td>
                    {order.shippingAddress?.address},<br />
                    {order.shippingAddress?.city}
                  </td>
                  <td>{new Date(order.createdAt).toLocaleString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOrders;
