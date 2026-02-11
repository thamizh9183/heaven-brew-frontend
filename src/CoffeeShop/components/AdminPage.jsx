import React, { useState } from "react";
import CoffeeList from "./CoffeeList";
import AddCoffee from "./AddCoffee";
import './CoffeeSip.css';

export default function AdminPage() {
  const token = localStorage.getItem("token");
  const [refreshList, setRefreshList] = useState(false);

  const handleAddCoffee = () => {
    setRefreshList(prev => !prev); // reload coffeeList
  };

  return (
    <div className="cc-app">
      <header className="cc-header">
        <h1 className="cc-title">Admin Dashboard:Brew Heaven Cafe </h1>
      </header>

      <main className="cc-main">
        {/* Add new coffee */}
        <AddCoffee token={token} onAdd={handleAddCoffee} />

        {/* coffee cards with edit/delete */}
        <CoffeeList
          adminView={true}
          token={token}
          key={refreshList} // reload when new item is added
        />
      </main>

      <footer className="cc-footer">
        Made with magical aroma,sugar & smiles..
      </footer>
    </div>
  );
}
