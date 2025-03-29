import express from "express";
import { analyzeWebsiteContent } from "../controllers/analyzeController";

const router = express.Router();

// POST /api/analyze
router.post("/", analyzeWebsiteContent);

export { router as analyzeRoutes };
