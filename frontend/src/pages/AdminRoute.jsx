// AdminRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const role = localStorage.getItem("role");
  return role === "admin" ? children : <Navigate to="/unauthorized" replace />;
};

export default AdminRoute;
