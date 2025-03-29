import { z } from "zod";

// Schema for website text analysis request
export const websiteTextAnalysisSchema = z.object({
  texts: z
    .array(z.string())
    .min(1, { message: "At least one text element is required" })
    .describe("Array of text elements from the website"),
});

// Schema for the website analysis response
export const websiteAnalysisSchema = z.object({
  theme: z.string(),
  type: z.string(),
  purpose: z.string(),
  targetAudience: z.string(),
  imageNeeds: z.array(z.string()),
  colorPalette: z.array(z.string()),
  styleRecommendations: z.string(),
});

export type WebsiteAnalysis = z.infer<typeof websiteAnalysisSchema>;

// Schema for image generation request
export const imageGenerationRequestSchema = z.object({
  websiteAnalysis: websiteAnalysisSchema,
  userRequests: z.string().optional(),
  imageCount: z.number().min(1).max(10).default(4),
  imageStyle: z.string().optional(),
  imageSize: z.string().optional(),
});

// Schema for generated image
export const generatedImageSchema = z.object({
  url: z.string().url(),
  prompt: z.string(),
});

// Schema for image generation response
export const imageGenerationResponseSchema = z.object({
  images: z.array(generatedImageSchema),
  message: z.string(),
});
