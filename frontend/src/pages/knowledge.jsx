import React, { useEffect, useState } from "react";
import axios from "axios";

const Knowledge = () => {
  console.log("Knowledge page mounted");
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    axios
      .get("/api/knowledge")
      .then((res) => setArticles(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h2>Knowledge Base</h2>
      {articles.map((article) => (
        <div key={article._id}>
          <h3>{article.title}</h3>
          <p>{article.content}</p>
          {article.tags?.length > 0 && (
            <p>
              <strong>Tags:</strong> {article.tags.join(", ")}
            </p>
          )}
          <hr />
        </div>
      ))}
    </div>
  );
};

export default Knowledge;
