import React from "react";

const TagManager = ({ existingTags, createTag, deleteTag, updateTag }) => {
  return (
    <TagManager
      tags={existingTags}
      onCreate={(name) => createTag(name)}
      onDelete={(id) => deleteTag(id)}
      onEdit={(id, newName) => updateTag(id, newName)}
    />
  );
};

export default TagManager;
