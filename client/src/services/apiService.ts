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
export const analyzeWebsiteText = async (texts: string[]): Promise<WebsiteAnalysis> => {
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
  imageStyle?: string,

  go_fast?: boolean,
  megapixels?: string,
  num_outputs?: number,
  aspect_ratio?: string,
  output_format?: string,

  output_quality?: number,
  num_inference_steps?: number
): Promise<GeneratedImage[]> => {
  try {
    const requestData: ImageGenerationRequest = {
      websiteAnalysis: websiteAnalysis,
      userRequests: userRequests,
      imageStyle: imageStyle,

      go_fast: go_fast,
      megapixels: megapixels,
      num_outputs: num_outputs,
      aspect_ratio: aspect_ratio,
      output_format: output_format,

      output_quality: output_quality,
      num_inference_steps: num_inference_steps,
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
