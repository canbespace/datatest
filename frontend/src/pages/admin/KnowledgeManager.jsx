import React from "react";

const KnowledgeManager = ({
  articles,
  handleEdit,
  handleDelete,
  assignTags,
}) => {
  return (
    <div>
      {articles.map((article) => (
        <KnowledgeManager
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
