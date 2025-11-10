// src/pages/Cart.jsx
import React, { useContext } from "react";
import { useCart } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import "./Cart.css";
import API from "../api";

const Cart = () => {
  const { cart, removeFromCart, clearCart, totalPrice } = useCart();
  const { user, token } = useContext(AuthContext);

  const API_URL = process.env.REACT_APP_API_URL?.replace(/\/$/, "");
  const RAZORPAY_KEY = process.env.REACT_APP_RAZORPAY_KEY_ID;

  if (!cart) return null;

  const handlePayment = async () => {
    if (!user || !token) return alert("Please login before making a purchase!");

    try {
      const { data } = await API.post(
        "/payment/create-order",
        { amount: totalPrice },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const options = {
        key: RAZORPAY_KEY || "rzp_test_123456789",
        amount: data.amount,
        currency: data.currency,
        name: process.env.REACT_APP_WEBSITE_NAME || "Ruby Official",
        description: "Purchase from Ruby Official",
        image: "/logo.png",
        order_id: data.id,
        handler: async function (response) {
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
                address: "Customer address",
                city: "City",
                postalCode: "000000",
                country: "India",
              },
              paymentMethod: "Razorpay",
              paymentResult: {
                id: response.razorpay_payment_id,
                status: "Paid",
                update_time: new Date().toISOString(),
              },
              itemsPrice: totalPrice,
              shippingPrice: 0,
              taxPrice: 0,
              totalPrice: totalPrice,
              isPaid: true,
            };

            await API.post("/orders", orderPayload, {
              headers: { Authorization: `Bearer ${token}` },
            });

            alert("✅ Payment successful! Your order has been placed.");
            clearCart();
          } catch (err) {
            console.error("❌ Error saving order:", err);
            alert("Payment succeeded but failed to save order!");
          }
        },
        prefill: {
          name: user?.name || "",
          email: user?.email || "",
        },
        theme: {
          color: process.env.REACT_APP_THEME_COLOR || "#5e8cff",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
      rzp.on("payment.failed", function (response) {
        alert("❌ Payment Failed: " + (response.error?.description || "Unknown"));
      });
    } catch (err) {
      console.error("❌ Payment initiation failed:", err);
      alert("Failed to start payment. Try again!");
    }
  };

  if (cart.length === 0) {
    return (
      <div className="empty-cart">
        <h2>Your Cart is Empty 🛒</h2>
        <a href="/products" className="btn primary">Shop Now</a>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h2 className="cart-title">Cart</h2>

      <div className="cart-list">
        {cart.map((item) => {
          const image = item.images?.[0] || "uploads/no-image.png";
          const imageUrl = image.startsWith("http")
            ? image
            : `${API_URL}/${image.replace(/^\/?/, "")}`;

          return (
            <div className="cart-item" key={item._id}>
              <img src={imageUrl} alt={item.name} />
              <div className="cart-info">
                <h4>{item.name}</h4>
                <p className="qty">Qty: {item.quantity}</p>
                <p className="price">₹{item.price} each</p>
                <p className="line-total">Total: ₹{item.price * item.quantity}</p>
                <div className="cart-actions">
                  <button className="link" onClick={() => removeFromCart(item._id)}>
                    Remove
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="cart-summary">
        <div className="summary-row">
          <span>Total</span>
          <strong>₹{totalPrice}</strong>
        </div>
        <button className="btn primary checkout" onClick={handlePayment}>
          Continue to Pay
        </button>
        <button className="btn clear" onClick={clearCart}>
          Clear Cart
        </button>
      </div>
    </div>
  );
};

export default Cart;
