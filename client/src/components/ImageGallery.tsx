import React, { useState } from "react";
import { framer } from "framer-plugin";
import { GeneratedImage } from "@framer-plugin/shared";
import { Card, Button } from "./ui";

interface ImageGalleryProps {
  images: GeneratedImage[];
}

export const ImageGallery: React.FC<ImageGalleryProps> = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState<GeneratedImage | null>(null);
  const [isInserting, setIsInserting] = useState(false);

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
        // image: 'https://www.pngmart.com/files/1/Adorable-Cat-PNG.png',
        // image: 'https://cdn.leonardo.ai/users/f91950b7-d7e5-4ef0-8df1-7af1097af3a1/generations/2d77ae49-310c-4cb8-ac83-2f8ea8413e74/Leonardo_Kino_XL_Coffee_Latte_0.jpg',
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
