<TagEditor
  tags={existingTags}
  onCreate={(name) => createTag(name)}
  onDelete={(id) => deleteTag(id)}
  onEdit={(id, newName) => updateTag(id, newName)}
/>
