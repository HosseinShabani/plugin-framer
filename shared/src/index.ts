export interface PluginConfig {
  apiKey: string;
  endpoint: string;
}

export interface ServerResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface WebsiteAnalysis {
  theme: string;
  type: string;
  purpose: string;
  targetAudience: string;
  imageNeeds: string[];
  colorPalette: string[];
  styleRecommendations: string;
}

export interface ImageGenerationRequest {
  websiteAnalysis: WebsiteAnalysis;
  userRequests?: string;
  imageStyle?: string;

  go_fast?: boolean;
  megapixels?: string;
  num_outputs?: number;
  aspect_ratio?: string;
  output_format?: string;
  
  output_quality?: number;
  num_inference_steps?: number;
}

export interface GeneratedImage {
  url: string;
  prompt: string;
}

export interface ImageGenerationResponse {
  images: GeneratedImage[];
  message: string;
}

// Utils exports
export * from "./utils";
