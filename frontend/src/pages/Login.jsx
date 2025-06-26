import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
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
      if (token) {
        const decoded = JSON.parse(atob(token.split(".")[1]));
        localStorage.setItem("token", token);
        localStorage.setItem("role", decoded.role);
        // Redirect after storing
        const navigate = useNavigate();
        if (decoded.role === "admin") {
          setMessage("Login successful!Redirecting");
          navigate("/AdminDashboard");
        } else {
          setMessage("No priviledge!Redirecting");
          navigate("/Register");
        }
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
