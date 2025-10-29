// src/context/CartContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Initialize cart from localStorage
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Sync cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Add product to cart
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item._id === product._id);
      if (existingItem) {
        return prevCart.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + (product.quantity || 1) }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: product.quantity || 1 }];
      }
    });
  };

  // Remove product by ID
  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item._id !== id));
  };

  // Clear entire cart
  const clearCart = () => setCart([]);

  // Total price of cart items
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Total quantity of items for cart icon
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        totalPrice,
        totalQuantity, // ✅ New helper for cart icon
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook for easy access
export const useCart = () => useContext(CartContext);
