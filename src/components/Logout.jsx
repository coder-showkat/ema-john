import React, { useContext } from "react";
import { AuthContext } from "../probiders/AuthProvider";
import "./Logout.css";

const Logout = () => {
  const { logOut } = useContext(AuthContext);
  return (
    <div className="inventory">
      <p>Your are already logged in.</p>
      <button onClick={() => logOut()} className="logout-btn">
        Logout
      </button>
    </div>
  );
};

export default Logout;
