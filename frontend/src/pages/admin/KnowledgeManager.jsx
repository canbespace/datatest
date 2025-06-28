import React from "react";
import KnowledgeManager from "./KnowledgeManger"; // Adjust path if needed

const KnowledgeManager = ({
  articles,
  handleEdit,
  handleDelete,
  assignTags,
}) => {
  return (
    <div>
      {articles.map((article) => (
        <ArticleCard
          key={article.id}
          title={article.title}
          tags={article.tags}
          onEdit={() => handleEdit(article.id)}
          onDelete={() => handleDelete(article.id)}
          onAssignTags={(articleId, tagList) => assignTags(articleId, tagList)}
        />
      ))}
    </div>
  );
};

export default KnowledgeManager;
