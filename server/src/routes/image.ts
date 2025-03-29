import express from "express";
import { generateWebsiteImages } from "../controllers/imageController";

const router = express.Router();

// POST /api/generate
router.post("/", generateWebsiteImages);

export { router as imageRoutes };
