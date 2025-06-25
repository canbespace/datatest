// src/pages/AdminRoute.js
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  useEffect(() => {
    if (!token) {
      console.log("未登录，跳转到 /login");
      navigate("/login", { replace: true });
    } else if (role !== "admin") {
      console.log("非管理员，跳转到 /knowledge");
      navigate("/knowledge", { replace: true });
    }
  }, [navigate, token, role]);

  // 只有权限通过时才渲染 children
  return token && role === "admin" ? children : null;
};

export default AdminRoute;
