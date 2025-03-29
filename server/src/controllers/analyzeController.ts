import { Request, Response } from "express";
import { analyzeWebsiteText } from "../services/aiService";
import { websiteTextAnalysisSchema } from "../schemas";

/**
 * Controller for analyzing website text
 */
export const analyzeWebsiteContent = async (req: Request, res: Response) => {
  try {
    // Validate the request body
    const validationResult = websiteTextAnalysisSchema.safeParse(req.body);

    if (!validationResult.success) {
      return res.status(400).json({
        success: false,
        message: "Invalid request data",
        errors: validationResult.error.errors,
      });
    }

    // Extract the texts array from the validated request
    const { texts } = validationResult.data;

    // Analyze the website text
    const analysis = await analyzeWebsiteText(texts);

    // Return the analysis results
    return res.status(200).json({
      success: true,
      data: analysis,
    });
  } catch (error) {
    console.error("Error in analyzeWebsiteContent:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while analyzing the website content",
      error: (error as Error).message,
    });
  }
};
