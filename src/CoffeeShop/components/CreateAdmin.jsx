// src/components/CreateAdmin.jsx
import React, { useState } from "react";

export default function CreateAdmin() {
  const [msg, setMsg] = useState("");

  const handleCreate = async () => {
    const res = await fetch("https://brew-heaven-cafe-backend-tk0o.onrender.com/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: "admin",
        email: "kavi@example.com",
        password: "kavi123",
        role: "admin"
      })
    });
    const data = await res.json();
    setMsg(JSON.stringify(data, null, 2));
  };

  return (
    <div>
      <h2>Create Admin Account</h2>
      <button onClick={handleCreate}>Create Admin</button>
      <pre>{msg}</pre>
    </div>
  );
}
