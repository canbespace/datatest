const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/auth");
const requireRole = require("../middleware/role");
const Knowledge = require("../models/Knowledge");

/* GET all entries (protected)
router.get("/", requireAuth, async (req, res) => {
  try {
    const entries = await Knowledge.find();
    res.json(entries);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// POST a new entry (protected)
router.post("/", requireAuth, async (req, res) => {
  const { title, content, tags } = req.body;
  try {
    const newEntry = await Knowledge.create({ title, content, tags });
    res.status(201).json(newEntry);
  } catch (err) {
    res.status(400).json({ error: "Invalid data" });
  }
}); */

router.post(
  "/",
  requireAuth,
  requireRole(["admin", "editor"]),
  async (req, res) => {
    // Only admin and editor can add entries
  },
);

router.delete("/:id", requireAuth, requireRole(["admin"]), async (req, res) => {
  // Only admin can delete
});

router.get("/", requireAuth, async (req, res) => {
  // Anyone logged in can view
});

module.exports = router;
