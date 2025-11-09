import React from "react";
import { Link } from "react-router-dom";
import "./Admin.css";

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      <div className="admin-links">
        <Link to="/admin/products" className="admin-btn">Manage Products</Link>
        <Link to="/admin/orders" className="admin-btn">Manage Orders</Link>
        <Link to="/admin/users" className="admin-btn">Manage Users</Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
