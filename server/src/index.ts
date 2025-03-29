// Load environment variables
require("dotenv").config();

import express from "express";
import cors from "cors";
import { analyzeRoutes } from "./routes/analyze";
import { imageRoutes } from "./routes/image";

// Create Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Routes
app.use("/api/analyze", analyzeRoutes);
app.use("/api/generate", imageRoutes);

// Health check route
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
