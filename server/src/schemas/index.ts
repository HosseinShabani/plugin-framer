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
  imageStyle: z.string().optional(),
  go_fast: z.boolean().optional().default(true),
  megapixels: z.string().optional().default("1"),
  num_outputs: z.number().min(1).max(6).default(4),
  aspect_ratio: z.string().optional().default("1:1"),
  output_format: z.string().optional().default("webp"),
  output_quality: z.number().min(1).max(100).optional().default(80),
  num_inference_steps: z.number().min(1).max(4).optional().default(4),
});

// Schema for image generation request
export const imageGenerationWithoutAnalysisRequestSchema = z.object({
  userRequests: z.string().optional(),
  imageStyle: z.string().optional(),
  go_fast: z.boolean().optional().default(true),
  megapixels: z.string().optional().default("1"),
  num_outputs: z.number().min(1).max(6).default(4),
  aspect_ratio: z.string().optional().default("1:1"),
  output_format: z.string().optional().default("webp"),
  output_quality: z.number().min(1).max(100).optional().default(80),
  num_inference_steps: z.number().min(1).max(4).optional().default(4),
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
