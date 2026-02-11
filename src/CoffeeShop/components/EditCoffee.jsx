import React, { useState } from "react";
import { updateCoffee } from "../services/CoffeeServices";

export default function EditCoffee({ coffee, onClose }) {
  const [name, setName] = useState(coffee.name);
  const [flavor, setFlavor] = useState(coffee.flavor);
  const [price, setPrice] = useState(coffee.price);
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");

  // Get token from localStorage
  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Saving...");

    const fd = new FormData();
    fd.append("name", name);
    fd.append("flavor", flavor);
    fd.append("price", price);
    if (file) fd.append("image", file);

    try {
      await updateCoffee(coffee._id, fd, token); //  pass token
      setStatus("Updated!");
      setTimeout(onClose, 500);
    } catch (err) {
      setStatus("Error updating: " + err.message);
    }
  };

  const styles = {
    modal: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      background: "rgba(255, 182, 193, 0.35)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000,
    },
    box: {
      background: "linear-gradient(90deg, #87cefa, #b0e0ff)", 
      padding: "30px",
      borderRadius: "20px",
      boxShadow: "0 12px 28px rgba(255,105,180,0.25)",
      width: "320px",
      textAlign: "center",
      fontFamily: "'Poppins', sans-serif",
      color: "#4d2336",
    },
    input: {
      width: "100%",
      padding: "10px 12px",
      margin: "8px 0",
      borderRadius: "12px",
      border: "1px solid #ffb6c1",
      outline: "none",
      fontSize: "1rem",
    },
    fileInput: {
      margin: "10px 0",
      fontSize: "0.9rem",
      color: "#66344d",
    },
    button: {
      padding: "10px 18px",
      margin: "8px 6px",
      border: "none",
      borderRadius: "12px",
      cursor: "pointer",
      fontWeight: 600,
      color: "black",
      background: "linear-gradient(90deg, #baff85ff, #76ff37ff)",
      transition: "all 0.3s ease",
    },
    cancelBtn: {
      padding: "10px 18px",
      margin: "8px 6px",
      border: "none",
      borderRadius: "12px",
      cursor: "pointer",
      fontWeight: 600,
      color: "black",
      background: "linear-gradient(90deg, #ff85b3, #ff6fa5)",
      transition: "all 0.3s ease",
    },
    status: {
      marginTop: "12px",
      fontSize: "0.95rem",
      fontWeight: "500",
    },
    heading: {
      marginBottom: "18px",
      fontSize: "1.4rem",
      fontWeight: "600",
    },
  };

  return (
    <div style={styles.modal}>
      <div style={styles.box}>
        <h3 style={styles.heading}>Edit coffee flavour!!</h3>
        <form onSubmit={handleSubmit}>
          <input
            style={styles.input}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            required
          />
          <input
            style={styles.input}
            value={flavor}
            onChange={(e) => setFlavor(e.target.value)}
            placeholder="Flavor"
            required
          />
          <input
            style={styles.input}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            type="number"
            placeholder="Price"
            required
          />
          <input
            style={styles.fileInput}
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <div>
            <button type="submit" style={styles.button}>
              Save
            </button>
            <button type="button" onClick={onClose} style={styles.cancelBtn}>
              Cancel
            </button>
          </div>
        </form>
        <p style={styles.status}>{status}</p>
      </div>
    </div>
  );
}
