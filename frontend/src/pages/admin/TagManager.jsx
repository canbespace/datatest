import React from "react";
import TagManager from "./TagManager"; // Adjust path if it's in a different folder

const TagManager = ({ existingTags, createTag, deleteTag, updateTag }) => {
  return (
    <TagEditor
      tags={existingTags}
      onCreate={(name) => createTag(name)}
      onDelete={(id) => deleteTag(id)}
      onEdit={(id, newName) => updateTag(id, newName)}
    />
  );
};

export default TagManager;
