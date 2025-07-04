//A backend setup for storing knowledge entries—could be for a wiki, blog, note-taking app, or even a learning database.

const mongoose = require("mongoose");

const knowledgeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  tags: [String],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Knowledge", knowledgeSchema);
