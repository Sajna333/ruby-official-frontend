// src/App.js
import React from "react";
import { Routes, Route } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";

import Header from "./components/Header";
import Footer from "./components/Footer";
import ErrorBoundary from "./components/ErrorBoundary";

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Profile from "./pages/Profile";
import Orders from "./pages/Orders";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Checkout from "./pages/Checkout";
import AddProduct from "./pages/AddProduct";
import Login from "./pages/Login";

// ✅ New Admin Page Imports
import AdminDashboard from "./pages/AdminDashboard";
import AdminProducts from "./pages/AdminProducts";
import AdminOrders from "./pages/AdminOrders";

const App = () => {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <CartProvider>
          <Header />
          <main style={{ minHeight: "80vh" }}>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />

              {/* User Routes */}
              <Route path="/profile" element={<Profile />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:id" element={<ProductDetails />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/add-product" element={<AddProduct />} />

              {/* ✅ Admin Routes */}
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/products" element={<AdminProducts />} />
              <Route path="/admin/orders" element={<AdminOrders />} />
            </Routes>
          </main>
          <Footer />
        </CartProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
};

export default App;
