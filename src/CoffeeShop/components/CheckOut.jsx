import React from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

  const Checkout = () => {
  const navigate = useNavigate();
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const placeOrder = async () => {
    if (cart.length === 0) {
      alert("Cart is empty");
      return;
    }
    const OrderItems = cart.map(item => ({
    Coffee: item._id, // must be MongoDB _id of coffee
    quantity: item.quantity || 1,
  
  }));

  const total = cart.reduce((sum, item) => {
  const price = Number(item.price) || 0;
  const qty = Number(item.quantity) || 1;
  return sum + price * qty;
}, 0);

  try {
    await API.post("/order", { items: OrderItems, total });
    localStorage.removeItem("cart");
    alert("Order placed successfully ✅");
  } catch (err) {
    
    alert("Order failed ❌");
  }
};
   return (
    <div>
      <h2>Checkout</h2>

      {cart.map(item => (
        <p key={item._id}>
          {item.name} - ₹{item.price} Qty:{item.quantity}
        </p>
      ))}
    <button onClick={placeOrder}>Place Order</button>
    </div>
  );
};


export default Checkout;
