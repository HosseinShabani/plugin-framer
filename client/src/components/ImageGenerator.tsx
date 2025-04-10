import React, { useState } from "react";
import { WebsiteAnalysis, GeneratedImage } from "@framer-plugin/shared";
import { Card, Button } from "./ui";
import { generateImages } from "../services/apiService";
import { saveGeneratedImages } from "../utils/storage";
import { IMAGE_COUNT } from "../constants/image-count";

interface ImageGeneratorProps {
  websiteAnalysis: WebsiteAnalysis;
  onImagesGenerated?: (images: GeneratedImage[]) => void;
}

export const ImageGenerator: React.FC<ImageGeneratorProps> = ({
  websiteAnalysis,
  onImagesGenerated,
}) => {
  const [userRequests, setUserRequests] = useState("");
  const [imageCount, setImageCount] = useState(IMAGE_COUNT[3]);
  const [imageStyle, setImageStyle] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    setIsGenerating(true);
    setError(null);

    try {
      const images = await generateImages(websiteAnalysis, userRequests, imageCount, imageStyle);

      // Save images to local storage
      saveGeneratedImages(images);

      // Notify parent component
      if (onImagesGenerated) {
        onImagesGenerated(images);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to generate images");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Card title="Generate Images" className="mb-4">
      <div className="space-y-3">
        <div>
          <label htmlFor="imageCount" className="mb-1 block text-xs font-medium">
            Number of Images
          </label>
          <select
            id="imageCount"
            className="bg-framer-bg w-full rounded border border-gray-300 px-2 py-1 text-sm"
            value={imageCount}
            onChange={(e) => setImageCount(Number(e.target.value))}
            disabled={isGenerating}
          >
            {IMAGE_COUNT.map((count) => {
              return (
                <option key={count} value={count}>
                  {count} Image
                </option>
              );
            })}
          </select>
        </div>

        <div>
          <label htmlFor="imageStyle" className="mb-1 block text-xs font-medium">
            Style (Optional)
          </label>
          <input
            id="imageStyle"
            type="text"
            className="w-full rounded border border-gray-300 px-2 py-1 text-sm"
            placeholder="e.g., Minimalist, Vibrant, Corporate..."
            value={imageStyle}
            onChange={(e) => setImageStyle(e.target.value)}
            disabled={isGenerating}
          />
        </div>

        <div>
          <label htmlFor="userRequests" className="mb-1 block text-xs font-medium">
            Additional Requirements (Optional)
          </label>
          <textarea
            id="userRequests"
            className="w-full rounded border border-gray-300 px-2 py-1 text-sm"
            placeholder="Describe any specific requirements for the images..."
            rows={3}
            value={userRequests}
            onChange={(e) => setUserRequests(e.target.value)}
            disabled={isGenerating}
          />
        </div>

        {error && (
          <div className="rounded border border-red-100 bg-red-50 p-2 text-xs text-red-500">
            {error}
          </div>
        )}

        <Button variant="primary" fullWidth isLoading={isGenerating} onClick={handleGenerate}>
          {isGenerating ? "Generating..." : "Generate Images"}
        </Button>
      </div>
    </Card>
  );
};
