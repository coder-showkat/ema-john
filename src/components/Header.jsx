import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../assets/images/Logo.svg";
import { ToastSuccess, ToastWarning } from "../assets/utilities/Toastify";
import { AuthContext } from "../probiders/AuthProvider";
import "./Header.css";

export default function Header() {
  const { user, error, logOut } = useContext(AuthContext);
  const location = useLocation();
  const [pathname, setPathname] = useState("");
  const [isNavigate, setNavigate] = useState(false);

  useEffect(() => {
    setPathname(location.pathname);
  }, [location]);

  const handleLogout = async () => {
    await logOut();
    if (error) ToastWarning(error.message);
    else ToastSuccess("Log Out successful!");
  };

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
              Inventory
            </li>
          </Link>
          {user ? (
            <a>
              <li onClick={handleLogout}>Log Out</li>
            </a>
          ) : (
            <Link to="/login">
              <li className={pathname === "/login" ? "active" : ""}>Login</li>
            </Link>
          )}
        </ul>
      </nav>
    </header>
  );
}
