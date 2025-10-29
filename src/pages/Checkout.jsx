import React from "react";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const navigate = useNavigate();

  const handlePlaceOrder = () => {
    localStorage.removeItem("cart");
    alert("Order placed successfully!");
    navigate("/orders");
  };

  return (
    <div style={{ padding:"50px", textAlign:"center" }}>
      <h2>Checkout</h2>
      <p>Payment method: Cash on delivery (demo)</p>
      <button onClick={handlePlaceOrder} style={{ padding:"10px 20px", backgroundColor:"#556b2f", color:"#fff", border:"none", borderRadius:"5px" }}>Place Order</button>
    </div>
  );
};

export default Checkout;
