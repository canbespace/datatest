// src/pages/AdminRoute.js
import React from "react";
import { Navigate } from "react-router-dom";

// Protects routes for admin users only
const AdminRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  console.log("AdminRoute检查：", { token, role }); // 🚨 调试
  // Not logged in
  if (!token) return <Navigate to="/login" replace />;

  // Not an admin
  if (role !== "admin") return <Navigate to="/knowledge" replace />;

  return children;
};

export default AdminRoute;
