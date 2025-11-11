import React, { useContext, useState } from "react";
import { useCart } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import API from "../api";
import "./Checkout.css";

const Checkout = () => {
  const { cart, clearCart, totalPrice } = useCart();
  const { token, user } = useContext(AuthContext);
  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    address: "",
    city: "",
    postalCode: "",
    phone: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const orderPayload = {
        orderItems: cart.map((item) => ({
          product: item._id,
          name: item.name,
          qty: item.quantity,
          price: item.price,
          image: item.images?.[0] || "",
        })),
        shippingAddress: {
          address: form.address,
          city: form.city,
          postalCode: form.postalCode,
          country: "India",
        },
        paymentMethod: "Razorpay",
        itemsPrice: totalPrice,
        shippingPrice: 0,
        taxPrice: 0,
        totalPrice,
        isPaid: false,
      };

      await API.post("/orders", orderPayload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("✅ Order placed successfully!");
      clearCart();
      window.location.href = "/orders";
    } catch (error) {
      console.error("❌ Order failed:", error);
      alert("Something went wrong while placing your order.");
    }
  };

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        <h2>Order Summary</h2>
        <p>Estimated Delivery: <strong>3–5 days</strong></p>
        <p>Items: {cart.length}</p>
        <p>Total: ₹{totalPrice}</p>

        <form onSubmit={handleSubmit}>
          <h3>Shipping Info</h3>
          <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
          <input name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
          <input name="address" placeholder="Address" value={form.address} onChange={handleChange} required />
          <input name="city" placeholder="City" value={form.city} onChange={handleChange} required />
          <input name="postalCode" placeholder="Postal Code" value={form.postalCode} onChange={handleChange} required />
          <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} required />
          <button className="btn primary">Complete Purchase</button>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
