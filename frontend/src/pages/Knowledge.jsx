//frontend/src/pages/Knowledge.jsx
//This file defines the Knowledge page component, which fetches and displays knowledge articles.
//It uses the useEffect hook to fetch data when the component mounts and axios to make the HTTP request.
import React, { useEffect, useState } from "react";
import axios from "axios";

const Knowledge = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    console.log("Knowledge page mounted"); // ✅ checkpoint 1

    const token = localStorage.getItem("token"); // or however you store it

    axios
      .get("https://datatest-b2k5.onrender.com/api/knowledgeRoute/knowledge", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log("Articles fetched:", res.data);
        setArticles(res.data); // ✅ store in state
      })

      .catch((err) => {
        console.error("Error fetching knowledge articles:", err);
      });
  }, []);

  return (
    <div>
      <h1>Knowledge Base</h1>
      {articles.length === 0 ? (
        <p>Loading articles...</p>
      ) : (
        <ul>
          {articles.map((article) => (
            <li key={article._id || article.id}>
              <h3>{article.title}</h3>
              <p>{article.content}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Knowledge;
