/* knowledge.js this is the protected API layer for managing knowledge data. It only allows certain actions based on user roles, giving you control over who can create, read, and delete knowledge entries. */

const express = require("express");
const router = express.Router();
const Knowledge = require("../models/Knowledge");
const requireAuth = require("../middleware/auth");
const requireRole = require("../middleware/role");

router.post(
  "/",
  requireAuth,
  requireRole(["admin", "editor"]),
  async (req, res) => {
    try {
      const { title, content, tags } = req.body;
      const newEntry = new Knowledge({ title, content, tags });
      await newEntry.save();
      res.status(201).json(newEntry);
    } catch (err) {
      res.status(500).json({ message: "Failed to create entry" });
    }
  },
);

router.delete("/:id", requireAuth, requireRole(["admin"]), async (req, res) => {
  try {
    await Knowledge.findByIdAndDelete(req.params.id);
    res.json({ message: "Entry deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete entry" });
  }
});

router.get("/", async (req, res) => {
  try {
    const entries = await Knowledge.find().sort({ createdAt: -1 });
    res.json(entries);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch entries" });
  }
});

module.exports = router;
