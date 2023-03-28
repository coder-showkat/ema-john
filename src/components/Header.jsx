import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../assets/images/Logo.svg";
import "./Header.css";

export default function Header() {
  const location = useLocation();
  const [pathname, setPathname] = useState("");
  const [isNavigate, setNavigate] = useState(false);

  useEffect(() => {
    setPathname(location.pathname);
  }, [location]);

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
            <li className={`home-link ${pathname === "/" ? "active" : ""}`}>
              Home
            </li>
          </Link>
          <Link to="/order">
            <li className={pathname === "/order" ? "active" : ""}>Order</li>
          </Link>
          <Link to="/order-review">
            <li className={pathname === "/order-review" ? "active" : ""}>
              Order Review
            </li>
          </Link>
          <Link to="/manage-inventory">
            <li className={pathname === "/manage-inventory" ? "active" : ""}>
              Manage Inventory
            </li>
          </Link>
          <Link to="/login">
            <li className={pathname === "/login" ? "active" : ""}>Login</li>
          </Link>
        </ul>
      </nav>
    </header>
  );
}
