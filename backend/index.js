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
app.use("/api/auth", authRoutes);
app.use("/api/knowledge", knowledgeRouter);
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ Mongo error:", err));

app.get("/", (req, res) => {
  res.send("Backend API is running 🛠️");
});

// Serve static frontend files
app.use(express.static(path.join(__dirname, "../frontend/build")));

// Catch-all route to serve React app (must be last)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
