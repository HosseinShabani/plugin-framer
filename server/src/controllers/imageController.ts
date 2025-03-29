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
      imageCount = 4,
      imageStyle = "",
      imageSize = "1024x1024",
    } = validationResult.data;

    // Generate the images
    const images = await generateImages(
      websiteAnalysis,
      userRequests,
      imageCount,
      imageStyle,
      imageSize
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
