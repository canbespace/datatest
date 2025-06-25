<ArticleCard
  title="How to Reset Password"
  tags={["account", "security"]}
  onEdit={() => handleEdit(id)}
  onDelete={() => handleDelete(id)}
  onAssignTags={(articleId, tagList) => assignTags(articleId, tagList)}
/>;
