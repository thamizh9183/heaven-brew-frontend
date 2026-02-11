import React, { useState } from "react";
import { createCoffee } from "../services/CoffeeServices";

export default function AddCoffee({ onAdd, token }) {
  const [name, setName] = useState("");
  const [flavor, setFlavor] = useState("");
  const [price, setPrice] = useState("");
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Adding...");

    // Prepare FormData
    const fd = new FormData();
    fd.append("name", name);
    fd.append("flavor", flavor);
    fd.append("price", price);
    if (file) fd.append("image", file);

    try {
      // Call backend service with admin token
      const newCoffee= await createCoffee(fd, token);

      setStatus("Added successfully!");
      setName("");
      setFlavor("");
      setPrice("");
      setFile(null);

      // Notify parent component
      if (onAdd) onAdd(newCoffee);
    } catch (err) {
      console.error(err);
      setStatus(err.message || "Error adding coffee.");
    }
  };

  return (
    <form className="cc-form" onSubmit={handleSubmit} autoComplete="off">
      <input
        className="cc-input"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name (e.g.,coffee)"
        required
      />
      <input
        className="cc-input"
        value={flavor}
        onChange={(e) => setFlavor(e.target.value)}
        placeholder="Flavor (car....)"
        required
      />
      <input
        className="cc-input"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Price"
        type="number"
        required
      />
      <input
        className="cc-file"
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <button className="cc-btn cc-primary" type="submit">
        Add Flavor
      </button>
      <p className="cc-status">{status}</p>
    </form>
  );
}
