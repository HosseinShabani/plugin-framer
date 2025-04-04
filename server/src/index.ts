// Load environment variables
import "dotenv/config";
import express from "express";
import cors from "cors";
import path from "path";
import { createSuccessResponse } from "@framer-plugin/shared";
import { analyzeRoutes } from "./routes/analyze";
import { imageRoutes } from "./routes/image";

// Create Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Ensure public/images directory exists
import fs from "fs";
const publicImagesDir = path.join(__dirname, "../public/images");
if (!fs.existsSync(publicImagesDir)) {
  fs.mkdirSync(publicImagesDir, { recursive: true });
}

// Middleware
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Serve static files from public directory
app.use("/images", express.static(path.join(__dirname, "../public/images")));

// Routes
app.use("/api/analyze", analyzeRoutes);
app.use("/api/generate", imageRoutes);

// Health check route
app.get("/health", (req, res) => {
  res.status(200).json(createSuccessResponse({ status: "ok" }));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
