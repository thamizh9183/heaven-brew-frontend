import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const CartPage = () => {
  const navigate = useNavigate();

  const [cart, setCart] = useState([]);

  useEffect(() => {
  const stored = JSON.parse(localStorage.getItem("cart")) || [];

  const normalizedCart = stored.map(item => ({
    ...item,
    quantity: item.quantity || 1, // ✅ default quantity
  }));

  setCart(normalizedCart);
  localStorage.setItem("cart", JSON.stringify(normalizedCart));
}, []);

  // ➕ Increase quantity
  const increaseQty = (id) => {
    const updatedCart = cart.map(item =>
      item._id === id
        ? { ...item, quantity: (item.quantity || 1) + 1 }
        : item
    );

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // ➖ Decrease quantity
  const decreaseQty = (id) => {
    const updatedCart = cart
      .map(item =>
        item._id === id
          ? { ...item, quantity: Math.max(1, (item.quantity || 1) - 1) }
          : item
      )
      

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // ❌ Remove item

  const removeItem = (id) => {
    const updated = cart.filter((item) => item._id !== id);
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const clearCart = () => {
    localStorage.removeItem("cart");
    setCart([]);
  };

  const total = cart.reduce((sum, item) => {
  const price = Number(item.price) || 0;
  const qty = Number(item.quantity) || 1;
  return sum + price * qty;
}, 0);


  return (
    <div style={styles.page}>
      <h1 style={styles.title}>Your Cart</h1>

      {cart.length === 0 ? (
        <p style={{ color: "#4d2336" }}>No coffee yet — go get him! </p>
      ) : (
        <>
          <div style={styles.list}>
            {cart.map((item) => (
              <div key={item._id} style={styles.card}>
                <img
                  src={
                    item.image
                      ? item.image.startsWith("http")
                        ? item.image
                        : `http://localhost:5000/uploads/${item.image}`
                      : "https://via.placeholder.com/100"
                  }
                  alt={item.name}
                  style={{ width: "100px", borderRadius: "8px" }}
                />

                <div style={styles.details}>
                  <h3>{item.name}</h3>
                  <p>₹{item.price}</p>
                  <p>Qty:{item.quantity || 1}</p>
                  </div>
                  <button
                  onClick={() =>increaseQty(item._id)}
                  style={styles.increaseQtyBtn}
                  >
                    + Add
                  </button>
                 <span style={{ margin: "0 10px" }}> </span>
                <button
                onClick={()=>decreaseQty(item._id)}
                style={styles.decreaseQtyBtn}
                >
                  -loss
                </button>
                
              <span style={{ margin: "0 10px" }}></span>
                <button
                onClick={() => removeItem(item._id)}
                  style={styles.removeBtn}
                >
                  ✖
                </button>

                
                  
              </div>
            ))}
          </div>

          <h2 style={{ color: "#4d2336" }}>Total: ₹{total}</h2>
          <button onClick={clearCart} style={styles.clearBtn}>
            Clear Cart 
          </button>
          <h2 style={{color:"#4d2336"}}>Ready to taste</h2>
          <button onClick={() => navigate("/CheckOut")}>
            Proceed to Checkout
          </button>
        </>
      )}
    </div>
  );
};

const styles = {
  page: {
    background: 'linear-gradient(135deg, #ffd4e7, #d6f0ff)',
    minHeight: "100vh",
    padding: "30px",
    fontFamily: "Poppins, sans-serif",
    textAlign: "center",
  },
  title: {
    color: "#4d2336",
    marginBottom: "25px",
  },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    maxWidth: "600px",
    margin: "0 auto",
  },
  card: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    background: "white",
    borderRadius: "12px",
    padding: "10px 15px",
    boxShadow: "0 6px 16px rgba(255,110,160,0.2)",
  },
  image: {
    width: "60px",
    height: "60px",
    borderRadius: "8px",
    objectFit: "cover",
  },
  details: { flex: 1, marginLeft: 15, textAlign: "left" },
  removeBtn: {
    background: "transparent",
    border: "none",
    color: "#ff6fa5",
    fontSize:"20px",
    cursor: "pointer",
  },
  clearBtn: {
    marginTop: "25px",
    background: "linear-gradient(90deg, #ff85b3, #ff6fa5)",
    color: "white",
    border: "none",
    padding: "10px 18px",
    borderRadius: "10px",
    fontWeight: 600,
    cursor: "pointer",
  },
  Checkoutbutton: {
    marginTop: "25px",
    background: "linear-gradient(90deg, #ff85b3, #ff6fa5)",
    color: "white",
    border: "none",
    padding: "10px 18px",
    borderRadius: "10px",
    fontWeight: 600,
    cursor: "pointer",
  },
};

export default CartPage;
