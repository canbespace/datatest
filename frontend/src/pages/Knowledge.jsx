//frontend/src/pages/Knowledge.jsx
//This file defines the Knowledge page component, which fetches and displays knowledge articles.

import React, { useEffect } from "react";
import axios from "axios";

const Knowledge = () => {
  useEffect(() => {
    console.log("Knowledge page mounted"); // ✅ checkpoint 1

    const token = localStorage.getItem("token"); // or however you store it

    axios
      .get("https://datatest-b2k5.onrender.com/api/knowledge", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log("Articles fetched:", res.data);
        // Optionally store in state
      })
      .catch((err) => {
        console.error("Error fetching knowledge articles:", err);
      });
  }, []);

  return (
    <div>
      <h1>Knowledge Base</h1>
      {/* render articles here */}
    </div>
  );
};

export default Knowledge;
