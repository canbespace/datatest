// index.js This is the main entry point for the Node.js Express server—a central hub that wires everything together

const express = require("express"); //Handle routing and HTTP methods
const mongoose = require("mongoose"); //Connect to your MongoDB database
const cors = require("cors"); //Allow cross-origin requests
const dotenv = require("dotenv"); //Load environment variables like MONGO_URI and PORT from a .env file (dotenv)
const authRoutes = require("./routes/auth.js"); //Handles user authentication (register/login).

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const knowledgeRoutes = require("./routes/knowledge"); //Handles knowledge-based CRUD endpoints (with access control)

app.use("/api/knowledge", knowledgeRoutes);
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ Mongo error:", err));

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Backend API is running 🛠️");
});
