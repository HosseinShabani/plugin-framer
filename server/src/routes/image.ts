import express from "express";
import { generateWebsiteImages, generateWebsiteImagesWithoutAnalysis } from "../controllers/imageController";

const router = express.Router();

// POST /api/generate
router.post("/", generateWebsiteImages);
router.post("/without-analysis", generateWebsiteImagesWithoutAnalysis);

export { router as imageRoutes };
