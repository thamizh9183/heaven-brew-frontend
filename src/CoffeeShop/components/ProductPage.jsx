import React, { useEffect, useState } from "react";
import { fetchCoffee} from "../services/CoffeeServices";
import { useNavigate } from "react-router-dom";

const ProductPage = () => {
  const [coffee, setCoffee] = useState([]);
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadCoffee = async () => {
      const data = await fetchCoffee();
      setCoffee(data);
    };
    loadCoffee();

    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const addToCart = (coffee) => {
    const token = localStorage.getItem("token");

    //  Require sign-in before adding to cart
    if (!token) {
      alert("Please sign in first to add items to your cart ☕");
      navigate("/signin");
      return;
    }

    const updatedCart = [...cart,coffee];
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    alert(`${coffee.name} added to cart! 🍵`);
  };

  return (
    <div style={styles.page} >
      <h1 style={styles.title}>Fantastic Coffee Collection</h1>
      <p style={styles.subtitle}>Rich Aroma and Tasty flavors </p>

      <div style={styles.grid}>
        {coffee.map((item) => (
          <div key={item._id} style={styles.card}>
            <img
              src={
                item.image
                  ? item.image.startsWith("http")
                    ? item.image
                    : `http://localhost:5000/uploads/${item.image}`
                  : "https://via.placeholder.com/180"
              }
              alt={item.name}
              style={styles.image}
            />

            <h3 style={styles.name}>{item.name}</h3>
            <p style={styles.desc}>{item.description}</p>
            <p style={styles.price}>₹{item.price}</p>
            <button
              style={styles.btn}
              onMouseOver={(e) =>
                (e.target.style.background =
                  "linear-gradient(90deg, #ff9ecb, #ff75b2)")
              }
              onMouseOut={(e) =>
                (e.target.style.background =
                  "linear-gradient(90deg, #ff85b3, #ff6fa5)")
              }
              onClick={() => addToCart(item)}
            >
              Add to Cart 
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  page: {
   background: 'linear-gradient(135deg, #ffd4e7, #d6f0ff)',
    minHeight: "100vh",
    padding: "40px 24px",
    fontFamily: "'Poppins', sans-serif",
    textAlign: "center",
  },
  title: {
    color: "#4d2336",
    marginBottom: "10px",
    fontSize: "2.3rem",
    letterSpacing: "0.5px",
  },
  subtitle: {
    color: "#66344d",
    marginBottom: "35px",
    fontSize: "1.1rem",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "28px",
    justifyContent: "center",
  },
  card: {
    background: "rgba(255, 255, 255, 0.8)",
    borderRadius: "18px",
    boxShadow: "0 8px 22px rgba(255, 130, 160, 0.25)",
    padding: "20px",
    transition: "all 0.3s ease",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
  },
  image: {
    width: "100%",
    height: "180px",
    borderRadius: "14px",
    objectFit: "cover",
    marginBottom: "14px",
    boxShadow: "0 4px 14px rgba(255, 100, 150, 0.15)",
  },
  name: {
    color: "#4d2336",
    fontSize: "1.2rem",
    marginBottom: "8px",
  },
  desc: {
    color: "#70425d",
    fontSize: "0.95rem",
    marginBottom: "10px",
  },
  price: {
    color: "#fc5108",
    fontWeight: "bold",
    marginBottom: "14px",
    fontSize: "1rem",
  },
  btn: {
    background: "linear-gradient(90deg, #c6611d, #cb8559)",
    color: "white",
    border: "none",
    borderRadius: "12px",
    padding: "10px 16px",
    cursor: "pointer",
    fontWeight: 600,
    transition: "all 0.25s ease",
    boxShadow: "0 6px 16px rgba(255,110,160,0.25)",
  },
};

export default ProductPage;
