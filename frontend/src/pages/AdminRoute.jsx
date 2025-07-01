// AdminRoute.jsx
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // Optional: add basic token and role check
  if (!token || role !== "admin") {
    return <Navigate to="./admin/AdminDashboard" replace />;
  }

  return children;
};

export default AdminRoute;
