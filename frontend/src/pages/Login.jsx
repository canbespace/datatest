import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

console.log("Login page mounted");
const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submission started"); // 测试点1
    alert("Form submission started"); // For immediate visual feedback
    if (isSubmitting) {
      console.log("Form is already submitting."); // Log for debugging
      return;
    }

    setIsSubmitting(true);
    try {
      console.log("Making API request", formData); // 测试点2
      const res = await axios.post(
        "https://datatest-b2k5.onrender.com/api/auth/login",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      console.log("API response received", res.data); // 测试点3
      alert(
        `API response received: ${res.data.token ? "Token received" : "No token"}`,
      ); // For immediate visual feedback

      const token = res.data.token;
      const decoded = JSON.parse(atob(token.split(".")[1]));
      localStorage.setItem("token", token);
      localStorage.setItem("role", decoded.role);
      console.log("Navigation starting..."); // 测试点4
      alert(
        `Navigation starting to: ${decoded.role === "admin" ? "/admin" : "/knowledge"}`,
      ); // For immediate visual feedback
      if (decoded.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/knowledge");
      }
    } catch (err) {
      console.error("Login error:", err); // 测试点5
      alert(`Login error: ${err.response?.data?.message || err.message}`); // For immediate visible feedback
      setMessage(err.response?.data?.message || "Login failed.");
    } finally {
      setIsSubmitting(false);
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
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Logging in..." : "Log In"}
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Login;
