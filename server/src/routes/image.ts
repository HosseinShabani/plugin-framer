import express from "express";
import { generateImage, generateImageFake } from "../controllers/imageController";

const router = express.Router();

// POST /api/generate
router.post("/gen", generateImage);
router.post("/gen-fake", generateImageFake);

export { router as imageRoutes };
