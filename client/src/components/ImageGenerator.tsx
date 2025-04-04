import React, { useState } from "react";
import { WebsiteAnalysis, GeneratedImage } from "@framer-plugin/shared";
import { Button } from "./Button";
import { Card } from "./Card";
import { generateImages } from "../services/apiService";
import { saveGeneratedImages } from "../utils/storage";

interface ImageGeneratorProps {
  websiteAnalysis: WebsiteAnalysis;
  onImagesGenerated?: (images: GeneratedImage[]) => void;
}

export const ImageGenerator: React.FC<ImageGeneratorProps> = ({
  websiteAnalysis,
  onImagesGenerated,
}) => {
  const [userRequests, setUserRequests] = useState("");
  const [imageCount, setImageCount] = useState(4);
  const [imageStyle, setImageStyle] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    setIsGenerating(true);
    setError(null);

    try {
      const images = await generateImages(
        websiteAnalysis,
        userRequests,
        imageCount,
        imageStyle
      );

      // Save images to local storage
      saveGeneratedImages(images);

      // Notify parent component
      if (onImagesGenerated) {
        onImagesGenerated(images);
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to generate images"
      );
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Card title="Generate Images" className="mb-4">
      <div className="space-y-3">
        <div>
          <label
            htmlFor="imageCount"
            className="block text-xs font-medium mb-1"
          >
            Number of Images
          </label>
          <select
            id="imageCount"
            className="w-full text-sm rounded border border-gray-300 px-2 py-1"
            value={imageCount}
            onChange={(e) => setImageCount(Number(e.target.value))}
            disabled={isGenerating}
          >
            <option value="1">1 Image</option>
            <option value="2">2 Images</option>
            <option value="3">3 Images</option>
            <option value="4">4 Images</option>
            <option value="6">6 Images</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="imageStyle"
            className="block text-xs font-medium mb-1"
          >
            Style (Optional)
          </label>
          <input
            id="imageStyle"
            type="text"
            className="w-full text-sm rounded border border-gray-300 px-2 py-1"
            placeholder="e.g., Minimalist, Vibrant, Corporate..."
            value={imageStyle}
            onChange={(e) => setImageStyle(e.target.value)}
            disabled={isGenerating}
          />
        </div>

        <div>
          <label
            htmlFor="userRequests"
            className="block text-xs font-medium mb-1"
          >
            Additional Requirements (Optional)
          </label>
          <textarea
            id="userRequests"
            className="w-full text-sm rounded border border-gray-300 px-2 py-1"
            placeholder="Describe any specific requirements for the images..."
            rows={3}
            value={userRequests}
            onChange={(e) => setUserRequests(e.target.value)}
            disabled={isGenerating}
          />
        </div>

        {error && (
          <div className="text-red-500 text-xs p-2 bg-red-50 rounded border border-red-100">
            {error}
          </div>
        )}

        <Button
          variant="primary"
          fullWidth
          isLoading={isGenerating}
          onClick={handleGenerate}
        >
          {isGenerating ? "Generating..." : "Generate Images"}
        </Button>
      </div>
    </Card>
  );
};
