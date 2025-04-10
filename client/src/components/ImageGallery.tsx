import React, { useState } from "react";
import { framer } from "framer-plugin";
import { GeneratedImage } from "@framer-plugin/shared";
import { Card, Button } from "./ui";

interface ImageGalleryProps {
  images: GeneratedImage[];
  isLoading?: boolean;
}

export const ImageGallery: React.FC<ImageGalleryProps> = ({ images, isLoading = false }) => {
  const [selectedImage, setSelectedImage] = useState<GeneratedImage | null>(null);
  const [isInserting, setIsInserting] = useState(false);

  if (isLoading) {
    return (
      <Card title="Generated Images">
        <div className="grid grid-cols-2 gap-2">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="aspect-square animate-pulse rounded bg-gray-200" />
          ))}
        </div>
      </Card>
    );
  }

  if (images.length === 0) {
    return (
      <Card title="Generated Images">
        <div className="py-6 text-center text-sm text-gray-500">
          No images generated yet. Configure and generate images above.
        </div>
      </Card>
    );
  }

  const handleImageClick = (image: GeneratedImage) => {
    setSelectedImage(image === selectedImage ? null : image);
  };

  const insertSelectedImage = async () => {
    if (!selectedImage) return;

    setIsInserting(true);

    try {
      await framer.addImage({
        image: selectedImage.url,
        name: "AI Generated Image",
        altText: selectedImage.prompt,
      });
    } catch (error) {
      console.error("Error inserting image:", error);
    } finally {
      setIsInserting(false);
    }
  };

  return (
    <Card
      title="Generated Images"
      footer={
        selectedImage && (
          <div className="flex items-center justify-between">
            <div className="max-w-[150px] truncate text-xs">
              <span className="font-medium">Selected:</span> {selectedImage.url.split("/").pop()}
            </div>
            <Button
              variant="primary"
              onClick={insertSelectedImage}
              isLoading={isInserting}
              className="py-1 text-xs"
            >
              Insert
            </Button>
          </div>
        )
      }
    >
      <div className="grid grid-cols-2 gap-2">
        {images.map((image, index) => (
          <div
            key={index}
            className={`relative aspect-square cursor-pointer overflow-hidden rounded border-2 ${
              selectedImage === image ? "border-blue-500" : "border-transparent"
            } `}
            onClick={() => handleImageClick(image)}
          >
            <img
              src={image.url}
              alt={`Generated image ${index + 1}`}
              className="h-full w-full object-cover"
            />
            <div className="bg-opacity-50 absolute right-0 bottom-0 bg-black px-1 text-xs text-white">
              {index + 1}
            </div>
          </div>
        ))}
      </div>

      {selectedImage && (
        <div className="mt-3 rounded bg-gray-100 p-2 text-xs">
          <p className="font-medium">Prompt:</p>
          <p className="mt-1 text-gray-700">{selectedImage.prompt}</p>
        </div>
      )}
    </Card>
  );
};
