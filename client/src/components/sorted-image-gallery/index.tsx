import React, { useState } from "react";
import { GeneratedImage } from "@framer-plugin/shared";
import ColumnImages from "./column-images";
import SelectedImage from "./selected-image";
import ColumnSkelton from "./column-skelton";

interface Props {
  images: GeneratedImage[];
}

export const SortedImageGallery: React.FC<Props> = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState<GeneratedImage | null>(null);

  const handleImageClick = (image: GeneratedImage) => {
    setSelectedImage(image === selectedImage ? null : image);
  };
  return (
    <div>
      {selectedImage ? (
        <SelectedImage selectedImage={selectedImage} setSelectedImage={setSelectedImage} />
      ) : false ? (
        //loading
        <ColumnSkelton array={Array(4).fill(1)} />
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
