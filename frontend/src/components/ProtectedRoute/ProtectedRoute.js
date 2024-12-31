import React from "react";
import { Route, Navigate } from "react-router-dom";

const ProtectedRoute = ({ element }) => {
  const token = localStorage.getItem("access_token"); // Check if token exists

  if (token) {
    return element;
  }

  // If no token, redirect to login page
  return <Navigate to="/login" />;
};
export default ProtectedRoute;
