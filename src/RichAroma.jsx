import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./TastyHouse"; 
import AboutPage from "./CoffeeShop/components/About"; 
import CoffeeCup from "./CoffeeCup";
import ProductPage from "./CoffeeShop/components/ProductPage";
import CartPage from "./CoffeeShop/components/CartPage";
import Signup from "./CoffeeShop/components/Signup";
import Signin from "./CoffeeShop/components/Signin";
import AdminPage from "./CoffeeShop/components/AdminPage"; // Admin dashboard main page
import AdminLogin from "./CoffeeShop/components/AdminLogin";
import AdminDashboard from "./CoffeeShop/components/AdminDashboard"; // Admin: user list
import NavBar from "./CoffeeShop/components/NavBar";
import ProtectedRoute from "./CoffeeShop/components/ProtectedRoute";
import Checkout from "./CoffeeShop/components/CheckOut";
import MysteryCoffee from "./CoffeeShop/components/MysteryCoffee";
function RichAroma() {
  return (
    <Router>
      <NavBar />

      <Routes>
        {/* Public user routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/mystery" element={<MysteryCoffee />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />

        {/* Admin login */}
        <Route path="/admin-login" element={<AdminLogin />} />

        {/* Admin protected routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute adminOnly={true}>
              <AdminPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute adminOnly={true}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/Coffeecup"
          element={
            <ProtectedRoute adminOnly={true}>
              <CoffeeCup/>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default RichAroma;
