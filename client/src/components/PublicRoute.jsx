import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const PublicRoute = ({ children }) => {
  const { user } = useContext(AuthContext);

  if (user) {
    // If the user is logged in, redirect to the home page
    return <Navigate to="/" replace />;
  }

  // If no user is logged in, render the children components
  return children;
};

export default PublicRoute;
