import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate(); // ✅ Must live here
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
      console.log("Login response:", res.data);

      const token = res.data.token;
      const decoded = JSON.parse(atob(token.split(".")[1]));
      // Store token and role
      localStorage.setItem("token", token);
      localStorage.setItem("role", decoded.role);

      // ✅ Redirect based on role
      if (decoded.role === "admin") {
        console.log(
          "Redirecting to:",
          decoded.role === "admin" ? "/admin/AdminDashboard" : "/Register",
        );

        navigate("/admin/AdminDashboard");
      } else {
        navigate("/knowledge");
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
