import React, { useState } from "react";
import CoffeeList from "./CoffeeShop/components/CoffeeList";
import AddCoffee from "./CoffeeShop/components/AddCoffee";
import './CoffeeShop/components/CoffeeSip.css';

function CoffeeCup() {
  const storedUser = localStorage.getItem("user");
  const user = storedUser && storedUser !== "undefined" ? JSON.parse(storedUser) : null;
  const isAdmin = user?.role === "admin";
  const token = localStorage.getItem("token");

  // Only admin can access
  if (!isAdmin) {
    return (
      <div className="cc-app">
        <header className="cc-header">
          <h1 className="cc-title">Access Denied</h1>
        </header>
        <main className="cc-main">
          <p>You do not have permission to view this page.</p>
        </main>
      </div>
    );
  }

  // Refresh coffeeList after adding a new coffee
  const [refreshList, setRefreshList] = useState(false);
  const handleAddCoffee = () => setRefreshList(prev => !prev);

  return (
    <div className="cc-app">
      <header className="cc-header">
        <h1 className="cc-title">Admin: Coffee world</h1>
      </header>

      <main className="cc-main">
        {/* Admin: Add new coffee */}
        <AddCoffee token={token} onAdd={handleAddCoffee} />

        {/* Admin: Manage coffee (edit/delete only) */}
        <CoffeeList
          adminView={true}   // Admin mode
          token={token}
          key={refreshList}  // Force reload when new item is added
        />
      </main>

      <footer className="cc-footer">
        Made with Rich Aroma and Tasty Collections.
      </footer>
    </div>
  );
}

export default CoffeeCup;
