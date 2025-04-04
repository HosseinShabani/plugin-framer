import React, { useState } from "react";
import { framer } from "framer-plugin";
import { GeneratedImage } from "@framer-plugin/shared";
import { Button } from "./Button";
import { Card } from "./Card";

interface ImageGalleryProps {
  images: GeneratedImage[];
  isLoading?: boolean;
}

export const ImageGallery: React.FC<ImageGalleryProps> = ({
  images,
  isLoading = false,
}) => {
  const [selectedImage, setSelectedImage] = useState<GeneratedImage | null>(
    null
  );
  const [isInserting, setIsInserting] = useState(false);

  if (isLoading) {
    return (
      <Card title="Generated Images">
        <div className="grid grid-cols-2 gap-2">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="aspect-square bg-gray-200 animate-pulse rounded"
            />
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
            <div className="text-xs truncate max-w-[150px]">
              <span className="font-medium">Selected:</span>{" "}
              {selectedImage.url.split("/").pop()}
            </div>
            <Button
              variant="primary"
              onClick={insertSelectedImage}
              isLoading={isInserting}
              className="text-xs py-1"
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
            className={`
              relative aspect-square cursor-pointer rounded overflow-hidden border-2
              ${
                selectedImage === image
                  ? "border-blue-500"
                  : "border-transparent"
              }
            `}
            onClick={() => handleImageClick(image)}
          >
            <img
              src={image.url}
              alt={`Generated image ${index + 1}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 right-0 bg-black bg-opacity-50 text-white text-xs px-1">
              {index + 1}
            </div>
          </div>
        ))}
      </div>

      {selectedImage && (
        <div className="mt-3 p-2 bg-gray-100 rounded text-xs">
          <p className="font-medium">Prompt:</p>
          <p className="mt-1 text-gray-700">{selectedImage.prompt}</p>
        </div>
      )}
    </Card>
  );
};
