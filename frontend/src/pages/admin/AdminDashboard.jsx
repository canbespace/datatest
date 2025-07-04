// frontend/src/pages/admin/AdminDashboard.jsx
//This file defines the AdminDashboard component, which is only accessible to users with the "admin" role.
//It includes features for creating new users, managing knowledge base entries, and other administrative tasks.

import React, { useEffect, useState } from "react";
import axios from "axios";
import UserTable from "./UserTable";
import KnowledgeManager from "./KnowledgeManager";
import TagManager from "./TagManager";
import KeywordAnalytics from "./KeywordAnalytics";

const AdminDashboard = () => {
  console.log("✅ AdminDashboard mounted!");

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("https://datatest-b2k5.onrender.com/api/knowledge", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setEntries(res.data))
      .catch((err) => {
        console.error("Failed to fetch knowledge articles:", err);
        setMessage("⚠️ Could not load entries.");
      });
  }, []);

  const [entries, setEntries] = useState([]);
  const [message, setMessage] = useState("");
  const [msg, setMsg] = useState("");
  const [newUser, setNewUser] = useState({
    email: "",
    password: "",
    role: "user",
  });

  const CreateArticle = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const handleSubmit = async (e) => {
      e.preventDefault();
      const token = localStorage.getItem("token");

      try {
        const res = await axios.post(
          "https://datatest-b2k5.onrender.com/api/knowledge",
          { title, content },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        console.log("Article created:", res.data);
      } catch (err) {
        console.error("Error creating article:", err);
      }
    };

    return (
      <form onSubmit={handleSubmit}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
        />
        <button type="submit">Create Article</button>
      </form>
    );
  };

  //create an account for a new user
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "https://datatest-b2k5.onrender.com/api/auth/register",
        newUser,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      setMsg("✅ User registered!");
      setNewUser({ email: "", password: "", role: "user" });
    } catch (err) {
      setMsg("❌ Failed to register user.");
    }
  };
  //delete an article
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `https://datatest-b2k5.onrender.com/api/knowledge/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      setEntries(entries.filter((entry) => entry._id !== id));
    } catch (err) {
      setMessage("⚠️ Failed to delete entry.");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>🛡️ Admin Dashboard</h1>

      <section style={{ marginBottom: "2rem" }}>
        <h2>Create New Knowledge Article</h2>
        {CreateArticle()} {/* <-- this line actually invokes the component */}
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h2>Create New User</h2>
        <form onSubmit={handleRegister}>
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
            onChange={(e) =>
              setNewUser({ ...newUser, password: e.target.value })
            }
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
        </form>
        {msg && <p>{msg}</p>}
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h2>Knowledge Base Entries</h2>
        {message && <p>{message}</p>}
        <ul>
          {entries.map((entry) => (
            <li key={entry._id}>
              <strong>{entry.title}</strong>{" "}
              <button onClick={() => handleDelete(entry._id)}>🗑️ Delete</button>
            </li>
          ))}
        </ul>
      </section>

      {/* Feature Modules */}
      <UserTable />
      <KnowledgeManager />
      <TagManager />
      <KeywordAnalytics />
    </div>
  );
};

export default AdminDashboard;
