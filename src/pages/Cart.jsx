// src/pages/Cart.jsx
import React, { useContext } from "react";
import { useCart } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import API from "../api";
import "./Cart.css";

const Cart = () => {
  const { cart, removeFromCart, clearCart, totalPrice } = useCart();
  const { user, token } = useContext(AuthContext);

  const API_URL = process.env.REACT_APP_API_URL;
  const RAZORPAY_KEY = process.env.REACT_APP_RAZORPAY_KEY_ID;

  if (!API_URL) {
    console.warn("⚠️ REACT_APP_API_URL is not defined. Check your .env file and restart the app.");
  }

  if (cart.length === 0) {
    return (
      <div className="empty-cart">
        <h2>Your Cart is Empty 🛒</h2>
        <Link to="/products" className="btn">
          Shop Now
        </Link>
      </div>
    );
  }

  const handlePayment = async () => {
    if (!user) {
      alert("Please login before making a purchase!");
      return;
    }

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
              })),
              shippingAddress: {
                address: "12 Main Street",
                city: "Kochi",
                postalCode: "682001",
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
          contact: "9999999999",
        },
        theme: {
          color: process.env.REACT_APP_THEME_COLOR || "#4a5d25",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

      rzp.on("payment.failed", function (response) {
        alert("❌ Payment Failed: " + response.error.description);
      });
    } catch (err) {
      console.error("❌ Payment initiation failed:", err);
      alert("Failed to start payment. Try again!");
    }
  };

  return (
    <div className="cart-container">
      <h2 className="cart-title">Your Shopping Cart</h2>

      {cart.map((item) => {
        const safeApiUrl = (API_URL || "").replace("/api", "");

        const imageUrl =
          item.images?.length > 0
            ? item.images[0].startsWith("http")
              ? item.images[0]
              : `${safeApiUrl}/${item.images[0]
                  .replace(/^\/?api\//, "")
                  .replace(/^\//, "")}`
            : `${safeApiUrl}/uploads/no-image.png`;

        return (
          <div key={item._id} className="cart-item">
            <img src={imageUrl} alt={item.name || "Product"} />
            <div className="cart-item-info">
              <h4>{item.name || "Unnamed Product"}</h4>
              <p>
                ₹{item.price} × {item.quantity}
              </p>
              <p>
                <strong>Total:</strong> ₹{item.price * item.quantity}
              </p>
            </div>
            <div className="cart-item-actions">
              <button
                className="remove-btn"
                onClick={() => removeFromCart(item._id)}
              >
                Remove
              </button>
            </div>
          </div>
        );
      })}

      <div className="cart-summary">
        <h3>Total: ₹{totalPrice}</h3>
        <button className="checkout-btn" onClick={handlePayment}>
          Proceed to Pay
        </button>
        <button className="clear-btn" onClick={clearCart}>
          Clear Cart
        </button>
      </div>
    </div>
  );
};

export default Cart;
