import Replicate from "replicate";
import { WebsiteAnalysis, GeneratedImage } from "@framer-plugin/shared";
import { writeFile } from "node:fs/promises";
import path from "path";

// Initialize Replicate
const replicate = new Replicate({
  auth: process.env.REPLICATE_API_KEY || "",
});

// Text analysis model - Claude 3 Haiku (better JSON formatting than Llama 3)
const TEXT_ANALYSIS_MODEL = "anthropic/claude-3.5-haiku";

// Image generation model - SDXL Lightning (faster with comparable quality)
const IMAGE_GENERATION_MODEL = "black-forest-labs/flux-schnell";

// Type for any kind of value that Replicate might return
type ReplicateResponse = any;

interface ReplicateImageOutput {
  [key: string]: unknown;
  images?: string[];
}

/**
 * Analyzes website text to determine theme, purpose, image needs, etc.
 */
export async function analyzeWebsiteText(
  texts: string[]
): Promise<WebsiteAnalysis> {
  try {
    // Join all texts with proper formatting
    const formattedTexts = texts.map((text) => `- "${text}"`).join("\n");

    // Create prompt for text analysis
    const prompt = `Analyze the following texts extracted from a website:

${formattedTexts}

Based on these texts, provide a comprehensive analysis that includes:
1. The main theme and subject of the website
2. The website type (e.g., portfolio, e-commerce, blog, corporate)
3. The website's purpose and goals
4. The likely target audience
5. What types of images would complement this website (list 5-8 specific image needs)
6. Suggest a color palette that would work well (provide 4-6 colors as hex codes)
7. Any style recommendations for images (e.g., minimalist, vibrant, corporate, artistic)

Format your response as valid JSON with the following keys: theme, type, purpose, targetAudience, imageNeeds (array), colorPalette (array of hex codes), styleRecommendations as string.`;

    // System prompt to guide the model
    const systemPrompt =
      "You are an expert web designer and content strategist who specializes in understanding website needs from text content. Provide insightful analysis in JSON format ONLY.";

    // Call the Replicate API
    const output: ReplicateResponse = await replicate.run(TEXT_ANALYSIS_MODEL, {
      input: {
        prompt,
        system_prompt: systemPrompt,
        temperature: 0.2,
        max_tokens: 1024,
      },
    });

    // Parse the output - safely handle different return types
    let jsonText = "";
    if (Array.isArray(output)) {
      jsonText = output.join("");
    } else if (typeof output === "string") {
      jsonText = output;
    } else if (output && typeof output === "object") {
      // For models that return an object with various possible structures
      const outputObj = output as Record<string, unknown>;
      if (outputObj.response && typeof outputObj.response === "string") {
        jsonText = outputObj.response;
      } else if (outputObj.output && typeof outputObj.output === "string") {
        jsonText = outputObj.output;
      } else {
        jsonText = JSON.stringify(output);
      }
    }

    // Clean up the text
    jsonText = jsonText.trim();

    // Extract JSON from the response if it's wrapped in text
    const jsonMatch = jsonText.match(/\{[\s\S]*\}/);
    const jsonString = jsonMatch ? jsonMatch[0] : jsonText;

    // Parse the JSON string
    const jsonResponse = JSON.parse(jsonString);

    return jsonResponse as WebsiteAnalysis;
  } catch (error) {
    console.error("Error analyzing website text:", error);
    throw new Error(
      `Failed to analyze website text: ${(error as Error).message}`
    );
  }
}

/**
 * Generates images based on website analysis and user requests
 */
export async function generateImages(
  websiteAnalysis: WebsiteAnalysis,
  userRequests: string = "",
  count: number = 4,
  style: string = "",
  size: string = "1024x1024"
): Promise<GeneratedImage[]> {
  try {
    const images: GeneratedImage[] = [];

    // Create base prompt from analysis

    // Parse size dimensions
    const [widthStr, heightStr] = size.split("x");
    const width = parseInt(widthStr, 10) || 1024;
    const height = parseInt(heightStr, 10) || 1024;

    // Generate the specified number of images
    for (let i = 0; i < count; i++) {
      const imageCategory =
        websiteAnalysis.imageNeeds[i % websiteAnalysis.imageNeeds.length];
      // const prompt = `${basePrompt}\n Please consider the following categories: ${websiteAnalysis.imageNeeds.join(
      //   ", "
      // )}`;

      const prompt = `Create a professional, high-quality image that would be perfect for a ${
        websiteAnalysis.type
      } website about ${websiteAnalysis.theme}. 
  The website targets ${websiteAnalysis.targetAudience} and aims to ${
        websiteAnalysis.purpose
      }.
      **Please consider the following: ${imageCategory}**
        
  Style: ${style || websiteAnalysis.styleRecommendations}
  Color palette: ${websiteAnalysis.colorPalette.join(", ")}
  ${userRequests ? `Additional requirements: ${userRequests}` : ""}
  
  *Negative prompt: low quality, blurry, distorted, deformed, ugly, bad anatomy, watermark, text, signature, logo`;

      // Add negative prompt for better quality
      // const negativePrompt =
      //   "low quality, blurry, distorted, deformed, ugly, bad anatomy, watermark, text, signature, logo";

      // Call the Replicate API for image generation
      const output: ReplicateResponse = await replicate.run(
        IMAGE_GENERATION_MODEL,
        {
          input: {
            prompt,
            num_outputs: 1,
            aspect_ratio: `1:1`,
            output_format: "png",
            guidance_scale: 7.5,
            // negative_prompt: negativePrompt,
          },
        }
      );

      // Save each generated image and create its URL
      for (const [index, item] of Object.entries(output)) {
        const filename = `image_${Date.now()}_${i}_${index}.png`;
        const filePath = path.join(__dirname, "../../public/images", filename);
        await writeFile(filePath, item as string);

        // Add the generated image to the results with its public URL
        images.push({
          url: `/images/${filename}`,
          prompt,
        });
      }
    }

    return images;
  } catch (error) {
    console.error("Error generating images:", error);
    throw new Error(`Failed to generate images: ${(error as Error).message}`);
  }
}
