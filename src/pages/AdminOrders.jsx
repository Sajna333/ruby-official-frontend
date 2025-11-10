// src/pages/AdminOrders.jsx
import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import API from "../api";
import "./Admin.css";

const AdminOrders = () => {
  const { token } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await API.get("/orders", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("❌ Failed to fetch orders:", error);
      }
    };
    if (token) fetchOrders();
  }, [token]);

  const filteredOrders = orders.filter((o) =>
    (o.user?.name || o.user?.email || "")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const handleExport = () => {
    const csvRows = [
      ["User", "Email", "Products", "Total Price", "Shipping", "Ordered At"].join(
        ","
      ),
      ...filteredOrders.map((o) =>
        [
          `"${o.user?.name || "N/A"}"`,
          `"${o.user?.email || "N/A"}"`,
          `"${o.orderItems?.map((i) => i.name).join("; ") || ""}"`,
          `₹${o.totalPrice || 0}`,
          `"${(o.shippingAddress?.address || "")}, ${(o.shippingAddress?.city || "")}"`,
          `"${new Date(o.createdAt).toLocaleString()}"`,
        ].join(",")
      ),
    ];
    const blob = new Blob([csvRows.join("\n")], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "orders.csv";
    link.click();
  };

  return (
    <div className="admin-page">
      <header className="admin-top">
        <h1>Order Management</h1>
        <div className="admin-controls">
          <input
            aria-label="search orders"
            placeholder="Search by username or email"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="admin-search"
          />
          <button className="btn export" onClick={handleExport}>
            Export
          </button>
        </div>
      </header>

      <p className="admin-count">{filteredOrders.length} orders</p>

      <div className="table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Items</th>
              <th>Total</th>
              <th>Shipping</th>
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
                  <td className="user-col">
                    <div className="user-name">{order.user?.name || "Unknown"}</div>
                    <div className="user-email">{order.user?.email}</div>
                  </td>
                  <td>
                    <div className="items-list">
                      {order.orderItems?.map((it, i) => (
                        <div key={i} className="item-line">
                          {it.name} × {it.qty || it.quantity || 1}
                        </div>
                      ))}
                    </div>
                  </td>
                  <td>₹{order.totalPrice || 0}</td>
                  <td>
                    {order.shippingAddress?.address}
                    <br />
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
