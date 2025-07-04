//backend/routes/knowledge.js

const express = require("express");
const router = express.Router();
const Knowledge = require("../models/KnowledgeModel"); // Adjust path as needed
const requireAuth = require("../middleware/auth"); // ✅ checks token
const requireAdmin = require("../middleware/requireAdmin");

// GET all articles (for logged-in users)
router.get("/knowledge", requireAuth, async (req, res) => {
  try {
    const articles = await Knowledge.find();
    res.json(articles);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// POST a new article (admin only)
router.post("/", requireAuth, requireAdmin, async (req, res) => {
  try {
    const { title, content } = req.body;
    const article = new Knowledge({ title, content });
    await article.save();
    res.status(201).json(article);
  } catch (err) {
    res.status(500).json({ error: "Failed to create article" });
  }
});
module.exports = router;
