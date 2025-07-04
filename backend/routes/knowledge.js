//backend/routes/knowledge.js

const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/auth");
const Knowledge = require("../models/Knowledge"); // Your Mongoose model

// GET all articles (for logged-in users)
router.get("/", requireAuth, async (req, res) => {
  try {
    const articles = await Knowledge.find();
    res.json(articles);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Optional: POST, DELETE routes can go here too

module.exports = router;
