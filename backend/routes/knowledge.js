/* this is the protected API layer for managing knowledge data. It only allows certain actions based on user roles, giving you control over who can create, read, and delete knowledge entries. */

const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/auth"); //Middleware that ensures the user is logged in.
const requireRole = require("../middleware/role"); //Middleware that restricts access based on user roles.

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
