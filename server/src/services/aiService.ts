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
  style: string = "",
  go_fast: boolean = true,
  megapixels: string = "1",
  num_outputs: number = 4,
  aspect_ratio: string = "1:1",
  output_format: string = "webp",
  output_quality?: number,
  num_inference_steps?: number
): Promise<GeneratedImage[]> {
  try {
    const images: GeneratedImage[] = [];

    // Parse size dimensions

    // Generate the specified number of images
    for (let i = 0; i < num_outputs; i++) {
      const imageCategory =
        websiteAnalysis.imageNeeds[i % websiteAnalysis.imageNeeds.length];
      // const prompt = `${basePrompt}\n Please consider the following categories: ${websiteAnalysis.imageNeeds.join(
      //   ", "
      // )}`;

      const prompt2 = `Create a professional, high-quality, visually striking image suitable for a ${websiteAnalysis.type} website about ${websiteAnalysis.theme}. 
        The image should be purely visual with no text, menus, or UI elements. It should focus on ${imageCategory} and appeal to ${websiteAnalysis.targetAudience}, while conveying ${websiteAnalysis.purpose}.

        Key requirements:
        - Absolutely no text, no labels, and no menu elements
        - No UI components and no interface-like features
        - Pure visual composition only

        Style: ${style || websiteAnalysis.styleRecommendations}
        Color palette: ${websiteAnalysis.colorPalette.join(", ")}
        ${userRequests ? `Additional requirements: ${userRequests}` : ""}

        The image should be clean, modern, and suitable for use as a hero image or background.`;

      const prompt1 = `Create a professional, high-quality, visually striking image suitable for a ${websiteAnalysis.type} website about ${websiteAnalysis.theme}. 
        The image should be purely visual with no text, menus, or UI elements. It should focus on ${imageCategory} and appeal to ${websiteAnalysis.targetAudience}, while conveying ${websiteAnalysis.purpose}.

        Key requirements:
        - Absolutely no text, labels, or menu elements
        - No UI components or interface-like features
        - Pure visual composition only

        Style: ${style || websiteAnalysis.styleRecommendations}
        Color palette: ${websiteAnalysis.colorPalette.join(", ")}
        ${userRequests ? `Additional requirements: ${userRequests}` : ""}

        The image should be clean, modern, and suitable for use as a hero image or background.`;

      let styleSpecificInstructions = "";
      if (style === "Portrait") {
        styleSpecificInstructions =
          "The image should be a professional portrait photograph, focusing on human subjects with excellent lighting and composition.";
      } else if (style === "Realistic") {
        styleSpecificInstructions =
          "The image should be a highly realistic representation, almost indistinguishable from a high-quality photograph.";
      } else if (style === "3D Render") {
        styleSpecificInstructions =
          "The image should be a sophisticated 3D rendered scene with realistic lighting and textures.";
      } else if (style === "Illustration") {
        styleSpecificInstructions =
          "The image should be a stylized illustration with artistic interpretation and creative composition.";
      } else if (style === "Photo") {
        styleSpecificInstructions =
          "The image should be a professional, high-resolution photograph with excellent composition and lighting.";
      } else if (style === "Vector") {
        styleSpecificInstructions =
          "The image should be a clean vector graphic with smooth shapes and bold colors.";
      }

      const prompt = `Create a **pure visual, text-free** ${style.toLowerCase()} image for a ${websiteAnalysis.type} website about ${websiteAnalysis.theme}.  

        ### **❗ ABSOLUTELY NO TEXT, LABELS, OR UI ELEMENTS ❗**  
        - **Strictly prohibited:** Any words, letters, numbers, symbols, icons, buttons, menus, or interface-like elements.  
        - **If text is present, the image is WRONG.**  
        - **100% visual-only composition** focusing on ${imageCategory}.  

        ### **Style-Specific Execution (${style}):**  
        ${styleSpecificInstructions}  

        ### **Critical Requirements:**  
        ✅ **No text whatsoever**—not even hidden or subtle text.  
        ✅ **No UI, HUD, menus, buttons, or icons**—completely clean.  
        ✅ **Appeals to:** ${websiteAnalysis.targetAudience}  
        ✅ **Conveys:** ${websiteAnalysis.purpose}  
        ✅ **Color palette:** ${websiteAnalysis.colorPalette.join(", ")}  

        ### **Additional Notes:**  
        - **Failure example:** If the image has even a single letter, number, or UI element, it fails the requirements.  
        - **Style:** ${style} (${styleSpecificInstructions})  
        ${userRequests ? `- **Custom requests:** ${userRequests}` : ""}  

        **Final reminder: This image must be 100% text-free—DO NOT GENERATE TEXT!**`;
      console.log(prompt);

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
            aspect_ratio: aspect_ratio,
            output_format: output_format,
            go_fast: go_fast,
            megapixels: megapixels,
            // guidance_scale: 7.5,
            // negative_prompt: negativePrompt,
          },
        }
      );

      // Save each generated image and create its URL
      for (const [index, item] of Object.entries(output)) {
        const filename = `image_${Date.now()}_${i}_${index}.${output_format}`;
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

export async function generateImagesWithoutAnalysis(
  userRequests: string = "",
  style: string = "",
  go_fast: boolean = true,
  megapixels: string = "1",
  num_outputs: number = 4,
  aspect_ratio: string = "1:1",
  output_format: string = "webp",
  output_quality: number = 80,
  num_inference_steps: number = 4
): Promise<GeneratedImage[]> {
  try {
    const images: GeneratedImage[] = [];

    const styleSpecification: Record<string, string> = {
      Portrait:
        "The image should be a professional portrait photograph, focusing on human subjects with excellent lighting and composition.",
      Realistic:
        "The image should be a highly realistic representation, almost indistinguishable from a high-quality photograph.",
      "3D Render":
        "The image should be a sophisticated 3D rendered scene with realistic lighting and textures.",
      Illustration:
        "The image should be a stylized illustration with artistic interpretation and creative composition.",
      Photo:
        "The image should be a professional, high-resolution photograph with excellent composition and lighting.",
      Vector:
        "The image should be a clean vector graphic with smooth shapes and bold colors.",
    };

    // Generate the specified number of images
    for (let i = 0; i < num_outputs; i++) {
      const prompt = `Create a ${userRequests} image.  

        ### **Style-Specific Execution (${style}):**  
        ${styleSpecification[style]}`;

      console.log(prompt);

      // Call the Replicate API for image generation
      const output: ReplicateResponse = await replicate.run(
        IMAGE_GENERATION_MODEL,
        {
          input: {
            prompt,
            num_outputs: 1,
            aspect_ratio: aspect_ratio,
            output_format: output_format,
            go_fast: go_fast,
            megapixels: megapixels,
            output_quality: output_quality,
            num_inference_steps: num_inference_steps,
            // guidance_scale: 7.5,
            // negative_prompt: negativePrompt,
          },
        }
      );

      // Save each generated image and create its URL
      for (const [index, item] of Object.entries(output)) {
        const filename = `image_${Date.now()}_${i}_${index}.${output_format}`;
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
