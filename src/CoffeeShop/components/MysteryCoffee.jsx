import React, { useState } from "react";
import Mcoffee from"../components/Mcoffee";
const MysteryCoffee = () => {
  const [coffee, setCoffee] = useState(null);

  const getMysteryCoffee = () => {
    const random =
      Mcoffee[Math.floor(Math.random() * Mcoffee.length)];
    setCoffee(random);
  };

  return (
    <div style={{ textAlign: "center", padding: "40px" }}>
      <h1>🎲 Mystery Coffee</h1>

      <button onClick={getMysteryCoffee}>
        Reveal My Coffee ☕
      </button>

      {coffee && (
        <div style={{ marginTop: "20px" }}>
          <h2>{coffee.name}</h2>
          <p>{coffee.mood}</p>
        </div>
      )}
    </div>
  );
};

export default MysteryCoffee;
