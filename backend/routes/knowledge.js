const express = require("express");
const router = express.Router(); // ✅ fixes the error
const Knowledge = require("../models/Knowledge");

router.get("/", async (req, res) => {
  try {
    const articles = await Knowledge.find();
    res.json(articles);
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

module.exports = router;
