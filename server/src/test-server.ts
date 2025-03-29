/**
 * Test script to verify server functionality
 *
 * Run this script with:
 * npx ts-node src/test-server.ts
 */

import dotenv from "dotenv";
import { analyzeWebsiteText, generateImages } from "./services/aiService";

// Load environment variables
dotenv.config();

// Sample website texts from a design portfolio
const sampleTexts = [
  "We specialize in crafting exceptional digital experiences to help our clients achieve their business goals.",
  "Product Design Experience",
  "We strive to bring innovation and creativity to every project we undertake.",
  "Our team of experts works closely with our clients to understand their needs and deliver outstanding solutions.",
  "We don't just create brands; we craft unforgettable experiences that leave a lasting impression.",
  "With over 70 awards in design and digital innovation, we have a proven track record of delivering recognition and success for our partners.",
  "Web Design, UX & UI Design, Brand Identity, Interaction Design, Video Production, Animation, Illustration",
];

async function runTest() {
  console.log("Starting server test...");
  console.log("\n--- Testing Text Analysis ---");
  console.log("Analyzing sample website texts...");

  try {
    // Test the text analysis
    const analysis = await analyzeWebsiteText(sampleTexts);
    console.log("\nAnalysis Result:");
    console.log(JSON.stringify(analysis, null, 2));

    // Test image generation with a small count
    console.log("\n--- Testing Image Generation ---");
    console.log("Generating a test image based on the analysis...");

    const images = await generateImages(
      analysis,
      "Use a modern, clean design style",
      1, // Just generate one image for testing
      "minimalist",
      "512x512" // Smaller size for faster testing
    );

    console.log("\nImage Generation Result:");
    console.log(JSON.stringify(images, null, 2));

    console.log("\nTest completed successfully!");
  } catch (error) {
    console.error("Test failed with error:", error);
    process.exit(1);
  }
}

// Run the test
runTest().catch(console.error);
