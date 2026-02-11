import React, { useState } from "react";
import { signup } from "../services/authService";
import { useNavigate, Link } from "react-router-dom"; 
import "./CoffeeSip.css";

const Signup = () => {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data, error } = await signup(form); //  destructure response

    if (error) {
      alert(error); // show backend validation / network error
      return;
    }
    const user = data.user;
    if (user.role === "user") {
      localStorage.setItem("isuser", "true");
      navigate("/Home");
    } else {
      localStorage.removeItem("isuser");
      navigate("/products");
    }
    // Success
    alert("Signup successful! Please sign in.");
    navigate("/signin");
  };

  return (
   <div className="cc-app">
     <div className="auth-box">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Username"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />
        <button type="submit">Register</button>
      </form>

      {/* 👇 Link to Signin page */}
      <p style={{ marginTop: "16px", fontSize: "0.95rem" }}>
        Already have an account?{" "}
        <Link
          to="/signin"
          style={{
            color: "#ff69b4",
            fontWeight: "bold",
            textDecoration: "none",
          }}
        >
          Sign in here
        </Link>
      </p>
    </div>
   </div>
  );
};

export default Signup;
