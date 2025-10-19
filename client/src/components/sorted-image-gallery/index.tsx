import React, { useState } from "react";
import { GeneratedImage } from "@framer-plugin/shared";
import { useShallow } from "zustand/shallow";
import { useImageConfigStore } from "@/context/image-config";
import { useAppStore } from "@/context/app";
import ColumnImages from "./column-images";
import SelectedImage from "./selected-image";
import ColumnSkelton from "./column-skelton";

interface Props {
  images: GeneratedImage[];
}

export const SortedImageGallery: React.FC<Props> = ({ images }) => {
  const [loading] = useAppStore(useShallow((state) => [state.loading]));
  const [num_outputs] = useImageConfigStore(useShallow((state) => [state.num_outputs]));

  const [selectedImage, setSelectedImage] = useState<GeneratedImage | null>(null);

  const handleImageClick = (image: GeneratedImage) => {
    setSelectedImage(image === selectedImage ? null : image);
  };
  return (
    <div className="z-20 mt-3">
      {selectedImage ? (
        <SelectedImage selectedImage={selectedImage} setSelectedImage={setSelectedImage} />
      ) : loading ? (
        <ColumnSkelton array={Array(num_outputs).fill(1)} />
      ) : (
        <div className="grid grid-cols-3 gap-2">
          <ColumnImages
            handleImageClick={handleImageClick}
            images={images.filter((_, i) => i % 3 === 0)}
          />
          <ColumnImages
            handleImageClick={handleImageClick}
            images={images.filter((_, i) => i % 3 === 1)}
          />
          <ColumnImages
            handleImageClick={handleImageClick}
            images={images.filter((_, i) => i % 3 === 2)}
          />
        </div>
      )}
    </div>
  );
};
