import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode"; // 🔐 Safer than atob()

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "https://datatest-b2k5.onrender.com/api/auth/login",
        formData,
      );

      const token = res.data.token;
      const decoded = jwtDecode(token); // ✅ Proper JWT decoding

      // 🚨 Avoid localStorage in production (use httpOnly cookies)
      localStorage.setItem("token", token);
      localStorage.setItem("role", decoded.role);

      // 🔒 Remove token logs in production!
      if (process.env.NODE_ENV === "development") {
        console.log("User role:", decoded.role);
      }

      // ✅ Redirect logic
      if (decoded.role === "admin") {
        navigate("/AdminDashboard");
      } else {
        navigate("/knowledge"); // Now non-admins redirect too
      }
    } catch (err) {
      setMessage(err.response?.data?.message || "Login failed.");
      console.error("Login error:", err);
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
      {message && <p style={{ color: "red" }}>{message}</p>}
    </div>
  );
};

export default Login;
