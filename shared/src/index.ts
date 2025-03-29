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
  imageCount?: number;
  imageStyle?: string;
  imageSize?: string;
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
