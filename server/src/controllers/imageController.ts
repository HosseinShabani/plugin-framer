import { Request, Response } from "express";
import { generateImages } from "../services/aiService";
import { imageGenerationRequestSchema } from "../schemas";

/**
 * Controller for generating images based on website analysis
 */
export const generateWebsiteImages = async (req: Request, res: Response) => {
  try {
    // Validate the request body
    const validationResult = imageGenerationRequestSchema.safeParse(req.body);

    if (!validationResult.success) {
      return res.status(400).json({
        success: false,
        message: "Invalid request data",
        errors: validationResult.error.errors,
      });
    }

    // Extract the data from the validated request
    const {
      websiteAnalysis,
      userRequests,
      imageStyle = "",
      go_fast = true,
      megapixels = "1",
      num_outputs = 4,
      aspect_ratio = "1:1",
      output_format = "webp",
      output_quality = 80,
      num_inference_steps = 4,
    } = validationResult.data;

    // Generate the images
    const images = await generateImages(
      websiteAnalysis,
      userRequests,
      imageStyle,
      go_fast,
      megapixels,
      num_outputs,
      aspect_ratio,
      output_format,
      output_quality,
      num_inference_steps
    );

    // Return the generated images
    return res.status(200).json({
      success: true,
      data: {
        images,
        message: `Successfully generated ${images.length} images`,
      },
    });
  } catch (error) {
    console.error("Error in generateWebsiteImages:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while generating images",
      error: (error as Error).message,
    });
  }
};
