import {
  WebsiteAnalysis,
  ServerResponse,
  GeneratedImage,
  ImageGenerationRequest,
} from "@framer-plugin/shared";

// Default API endpoint - can be configured later
const API_ENDPOINT = "http://localhost:3000";

/**
 * Analyzes website text content
 */
export const analyzeWebsiteText = async (
  texts: string[]
): Promise<WebsiteAnalysis> => {
  try {
    const response = await fetch(`${API_ENDPOINT}/api/analyze`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ texts }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result: ServerResponse<WebsiteAnalysis> = await response.json();

    if (!result.success || !result.data) {
      throw new Error(result.error || "Failed to analyze website text");
    }

    return result.data;
  } catch (error) {
    console.error("Error analyzing website text:", error);
    throw error;
  }
};

/**
 * Generates images based on website analysis and optional parameters
 */
export const generateImages = async (
  websiteAnalysis: WebsiteAnalysis,
  userRequests?: string,
  imageCount: number = 4,
  imageStyle?: string,
  imageSize: string = "1024x1024"
): Promise<GeneratedImage[]> => {
  try {
    const requestData: ImageGenerationRequest = {
      websiteAnalysis,
      userRequests,
      imageCount,
      imageStyle,
      imageSize,
    };

    const response = await fetch(`${API_ENDPOINT}/api/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result: ServerResponse<{
      images: GeneratedImage[];
      message: string;
    }> = await response.json();

    if (!result.success || !result.data) {
      throw new Error(result.error || "Failed to generate images");
    }

    return result.data.images.map((image) => ({
      ...image,
      url: `${API_ENDPOINT}${image.url}`,
    }));
  } catch (error) {
    console.error("Error generating images:", error);
    throw error;
  }
};
