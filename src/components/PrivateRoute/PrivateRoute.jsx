import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../probiders/AuthProvider";
import LoadingSpinner from "../LoadingSpinner";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) return <LoadingSpinner />;

  if (!user)
    return <Navigate to="/login" replace={true} state={location.pathname} />;

  return children;
};

export default PrivateRoute;
