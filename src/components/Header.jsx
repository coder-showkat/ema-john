import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/images/Logo.svg";
import "./Header.css";

export default function Header() {
  const [isNavigate, setNavigate] = useState(false);

  return (
    <header className="header">
      <nav className="nav">
        <img src={Logo} alt="Logo" />
        <div className="menu-bar" onClick={() => setNavigate(!isNavigate)}>
          {isNavigate ? (
            <ion-icon name="close-outline"></ion-icon>
          ) : (
            <ion-icon name="menu-outline"></ion-icon>
          )}
        </div>
        <ul
          className={`nav-link ${isNavigate ? "navigate" : ""}`}
          onClick={() => setNavigate(false)}
        >
          <Link to="/">
            <li>Home</li>
          </Link>
          <Link to="/order">
            <li>Order</li>
          </Link>
          <Link to="/order-review">
            <li>Order Review</li>
          </Link>
          <Link to="/manage-inventory">
            <li>Manage Inventory</li>
          </Link>
          <Link to="/login">
            <li>Login</li>
          </Link>
        </ul>
      </nav>
    </header>
  );
}
