// src/components/CartIcon.jsx
import React from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import "./CartIcon.css"; // optional styling

const CartIcon = () => {
  const { cart } = useCart();

  // Sum all quantities
  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <Link to="/cart" className="cart-icon">
      <FaShoppingCart size={24} />
      {itemCount > 0 && <span className="cart-count">{itemCount}</span>}
    </Link>
  );
};

export default CartIcon;
