//AdminDashboard.js

import React, { useEffect, useState } from "react";
import axios from "axios";
e.preventDefault(); //

const AdminDashboard = () => {
  const [entries, setEntries] = useState([]);
  const [message, setMessage] = useState("");
  const [msg, setMsg] = useState("");
  const [newUser, setNewUser] = useState({
    email: "",
    password: "",
    role: "user",
  });

  const handleRegister = async (e) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post("/api/auth/register", newUser, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMsg("✅ User registered!");
      setNewUser({ email: "", password: "", role: "user" });
    } catch (err) {
      setMsg("❌ Failed to register user.");
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`/api/knowledge/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEntries(entries.filter((entry) => entry._id !== id));
    } catch (err) {
      setMessage("⚠️ Failed to delete entry.");
    }
  };

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const token = localStorage.getItem("token");
        const role = localStorage.getItem("role");

        if (role !== "admin") {
          setMessage("🚫 Access denied: Admins only.");
          return;
        }

        const res = await axios.get("/api/knowledge", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEntries(res.data);
      } catch (err) {
        setMessage("⚠️ Error loading entries.");
      }
    };

    fetchEntries();
  }, []);

  return (
    <div style={{ padding: "1rem" }}>
      <h2>🛡️ Admin Dashboard</h2>

      {/* Registration Form */}
      <form onSubmit={handleRegister} style={{ marginBottom: "2rem" }}>
        <h4>Create New User</h4>
        <input
          type="email"
          placeholder="User Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={newUser.password}
          onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
          required
        />
        <select
          value={newUser.role}
          onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
        >
          <option value="user">User</option>
          <option value="editor">Editor</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit">Create User</button>
        {msg && <p>{msg}</p>}
      </form>

      {/* Knowledge Entries */}
      {message && <p>{message}</p>}
      <h4>Knowledge Base Entries</h4>
      <ul>
        {entries.map((entry) => (
          <li key={entry._id}>
            <strong>{entry.title}</strong>
            <button onClick={() => handleDelete(entry._id)}>🗑️ Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
