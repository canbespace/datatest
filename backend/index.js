// backend index.js This is the main entry point for the Node.js Express server—a central hub that wires everything together
const authRoutes = require("./routes/auth");
const express = require("express"); //Handle routing and HTTP methods
const app = express();
const mongoose = require("mongoose"); //Connect to your MongoDB database
const cors = require("cors"); //Allow cross-origin requests
const dotenv = require("dotenv"); //Load environment variables like MONGO_URI and PORT from a .env file (dotenv)
dotenv.config();
const knowledgeRouter = require("./routes/knowledgeRoute"); // adjust the path as needed
const path = require("path");

const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: ["http://tokee.info", "https://tokee.info"], // ← your actual website domains
    credentials: true,
  }),
);

app.use(express.json());

// API routes should come first
app.use("/api/auth", authRoutes);
app.use("/api/knowledge", knowledgeRouter);

// Basic health check route
app.get("/api", (req, res) => {
  res.send("Backend API is running 🛠️");
});

// Serve static files from the React app build directory
app.use(express.static(path.join(__dirname, "../frontend/build")));

// Catch-all handler: send back React's index.html file for any non-API routes
// This MUST come last, after all other routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ Mongo error:", err));

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
