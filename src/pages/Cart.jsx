import React, { useContext } from "react";
import { useCart } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

const Cart = () => {
  const { cart, removeFromCart, clearCart, totalPrice } = useCart();
  const navigate = useNavigate();

  if (!cart) return null;

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
      <h2 className="cart-title">Your Shopping Cart</h2>

      <div className="cart-list">
        {cart.map((item) => {
          const backendBase = "https://ruby-official-backend.onrender.com";
          const imageUrl = item.images?.[0]?.startsWith("http")
            ? item.images[0]
            : `${backendBase}/uploads/${(item.images?.[0] || "no-image.png")
                .replace(/^uploads\//, "")
                .replace(/^\/?/, "")}`;

          return (
            <div className="cart-item" key={item._id}>
              <img
                src={imageUrl}
                alt={item.name || "Product"}
                onError={(e) => {
                  e.target.src = `${backendBase}/uploads/no-image.png`;
                }}
              />
              <div className="cart-info">
                <h4>{item.name}</h4>
                <p>₹{item.price} × {item.quantity}</p>
                <p><strong>Total:</strong> ₹{item.price * item.quantity}</p>
                <button className="link" onClick={() => removeFromCart(item._id)}>Remove</button>
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
        <button className="btn primary checkout" onClick={() => navigate("/checkout")}>
          Proceed to Checkout
        </button>
        <button className="btn clear" onClick={clearCart}>
          Clear Cart
        </button>
      </div>
    </div>
  );
};

export default Cart;
