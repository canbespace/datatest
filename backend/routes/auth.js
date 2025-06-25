//This auth.js file defines authentication-related routes for a Node.js app using Express and MongoDB. It handles user registration and login, which are the backbone of most authentication systems.

const express = require("express"); //Framework to build the routes.
const bcrypt = require("bcryptjs"); //Used to hash passwords for secure storage.
const jwt = require("jsonwebtoken"); //Used to issue JWT tokens when a user logs in.
const User = require("../models/User.js"); //Imports the user schema/model
const requireAuth = require("../middleware/auth"); //protects routes that need a logged-in user.

const router = express.Router();

// Register, checks if user exists, hashes password, and saves new user
router.post("/register", async (req, res) => {
  try {
    const { email, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const hashed = await bcrypt.hash(password, 10); // hash the password

    const newUser = new User({
      email,
      password: hashed,
      role: role || "user", // this line sets role dynamically
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Registration failed" });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "User not found" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json({ message: "Incorrect password" });

  // 💡 Include role in the token payload
  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" },
  );

  res.status(200).json({ token });
});

// routes/knowledge.js
module.exports = router;
