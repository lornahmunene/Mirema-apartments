// Navbar.js
import React from "react";
import { Link } from "react-router-dom";
import './Navbar.css'; // Import the navbar-specific CSS (optional)

const Navbar = () => {
  return (
    <header className="navbar">
      <Link to="/" className="navbar-link">Home</Link>
      <Link to="/apartments" className="navbar-link">Apartments</Link>
      <Link to="/payments" className="navbar-link">Payments</Link>
      <Link to="/login" className="navbar-link">Login</Link>
    </header>
  );
};

export default Navbar;
