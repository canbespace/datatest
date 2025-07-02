import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

console.log("Login page mounted");
const Login = () => {
  const navigate = useNavigate(); // ✅ Must live here
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("App Loaded");
    try {
      console.log("开始提交表单");
      const res = await axios.post(
        "https://datatest-b2k5.onrender.com/api/auth/login",
        formData,
      );
      console.log("登录成功");
      const token = res.data.token;
      console.log("已获取到token:", token);
      const decoded = JSON.parse(atob(token.split(".")[1]));
      // Store token and role
      localStorage.setItem("token", token);
      localStorage.setItem("role", decoded.role);
      console.log("已存储token和role是： ", decoded.role, token);
      // ✅ Redirect based on role
      if (decoded.role === "admin") {
        alert("Redirecting to admin dashboard!");
        navigate("/admin");
      } else {
        navigate("/knowledge"); // 或其他普通用户页面
      }
    } catch (err) {
      setMessage(err.response?.data?.message || "Login failed.");
    }
  };
  return (
    <div style={{ border: "1px solid red", padding: "1rem", width: "300px" }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Log In</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Login;
