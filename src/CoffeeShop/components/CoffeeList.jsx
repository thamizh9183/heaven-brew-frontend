import React, { useEffect, useState } from "react";
import {
  fetchCoffee,
  deleteCoffee,
} from "../services/CoffeeServices";
import EditCoffee from "./EditCoffee";

export default function CoffeeList({ adminView = false, token, onAddToCart }) {
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(null);

  const storedUser = localStorage.getItem("user");
  const user = storedUser && storedUser !== "undefined" ? JSON.parse(storedUser) : null;
  const isAdmin = adminView && user?.role === "admin";

  const load = async () => {
    const data = await fetchCoffee();
    setItems(data);
  };

  useEffect(() => {
    load();
  }, []);

  // Admin only: delete
  const handleDelete = async (id) => {
    if (!isAdmin) return;
    await deleteCoffee(id, token);
    setItems((prev) => prev.filter((i) => i._id !== id));
  };

  // Admin only: edit
  const handleEditClick = (item) => {
    if (!isAdmin) return;
    setEditing(item);
  };

  // User only: add to cart
  const handleAddToCart = (item) => {
    if (!user) {
      alert("Please sign in to add items to your cart.");
      return;
    }
    if (onAddToCart) onAddToCart(item);
  };

  return (
    <section className="cc-list">
      {items.length === 0 && <p className="cc-empty">No flavors yet — add one!</p>}
      <div className="cc-grid">
        {items.map((item) => (
          <article key={item._id} className="cc-card">
            {item.image ? (
              <img
                className="cc-card-img"
                src={item.image.startsWith("http") ? item.image : `http://localhost:5000/uploads/${item.image}`}
                alt={item.name}
              />
            ) : (
              <div className="cc-card-img cc-placeholder">🍨</div>
            )}

            <div className="cc-card-body">
              <h3 className="cc-card-title">{item.name}</h3>
              <p className="cc-card-flavor">{item.flavor}</p>
              <p className="cc-card-price">₹{item.price}</p>
              <div className="cc-card-actions">
                {isAdmin && (
                  <>
                    <button className="cc-btn cc-edit" onClick={() => handleEditClick(item)}>
                      Edit
                    </button>
                    <button className="cc-btn cc-delete" onClick={() => handleDelete(item._id)}>
                      Delete
                    </button>
                  </>
                )}
                {!isAdmin && (
                  <button className="cc-btn cc-primary" onClick={() => handleAddToCart(item)}>
                    Add to Cart 🛒
                  </button>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Use the separate styled Editcoffee modal */}
      {editing && isAdmin && (
        <EditCoffee
          coffee={editing}
          onClose={() => {
            setEditing(null);
            load(); // reload items after edit
          }}
        />
      )}
    </section>
  );
}
