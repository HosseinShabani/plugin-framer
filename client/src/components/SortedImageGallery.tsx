import React, { useState } from "react";
import { GeneratedImage } from "@framer-plugin/shared";
import { useShallow } from "zustand/shallow";
import { useImageConfigStore } from "@/context/image-config";
import Icon from "./ui/Icon";
import { Button } from "./ui/button";
import { useAppStore } from "@/context/app";

interface SortedImageGalleryProps {
  images: GeneratedImage[];
}
interface ColImagesProps {
  images: GeneratedImage[];
  handleImageClick: (image: GeneratedImage) => void;
}

const ColImages: React.FC<ColImagesProps> = ({ images, handleImageClick }) => {
  return (
    <div className="grid gap-2  h-fit">
      {images.map((image, index) => {
        return (
          <div
            key={index}
            className={`relative cursor-pointer overflow-hidden rounded-2xl`}
            onDoubleClick={() => handleImageClick(image)}
          >
            <img
              src={image.url}
              alt={`Generated image ${index + 1}`}
              className="h-full w-full object-cover"
            />

            <div className="bg-framer-bg-secondary absolute right-1.5 bottom-1.5 left-1.5 z-10 flex h-8 items-center justify-between rounded-4xl px-1.5">
              <Button variant="contained" size="sm">
                <Icon name="add" className="stroke-white" />
              </Button>
              <Button variant="ghost" size="sm" color="gray">
                <Icon name="regeneration" className="stroke-stone-400" />
              </Button>
              <Button variant="ghost" size="sm" color="gray">
                <Icon name="upscale" className="stroke-stone-400" />
              </Button>
              <Button variant="ghost" size="sm" color="gray">
                <Icon name="download" className="stroke-stone-400" />
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const InfoItem = ({ title }: { title: string | number }) => {
  return (
    <div className="bg-framer-bg-tertiary min-w-[30px] rounded-2xl px-1.5 py-1 text-center text-[10px] font-semibold">
      {title}
    </div>
  );
};

const ColSkelton: React.FC<{ array: any[] }> = ({ array }) => {
  return (
    <div className="grid grid-cols-3 gap-2">
      {[
        array.filter((_, i) => i % 3 === 0),
        array.filter((_, i) => i % 3 === 1),
        array.filter((_, i) => i % 3 === 2),
      ].map((arr, i) => (
        <div className="grid h-fit gap-2" key={i}>
          {arr.map((_, index) => {
            return (
              <div
                key={index}
                className="h-32 w-full animate-pulse rounded-lg bg-framer-text"
                style={{
                  animationDelay: `-${index * 1000}ms`,
                }}
              ></div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export const SortedImageGallery: React.FC<SortedImageGalleryProps> = ({ images }) => {
  const [style, aspect_ratio, num_outputs] = useImageConfigStore(
    useShallow((state) => [state.style, state.aspect_ratio, state.num_outputs])
  );
  const [loading] = useAppStore(useShallow((state) => [state.loading]));

  const [selectedImage, setSelectedImage] = useState<GeneratedImage | null>(null);

  const handleImageClick = (image: GeneratedImage) => {
    setSelectedImage(image === selectedImage ? null : image);
  };
  return (
    <div className="z-20 mt-3">
      {selectedImage ? (
        <div className="w-full">
          <div className="bg-framer-bg-tertiary relative flex h-60 w-full items-center justify-center rounded-xl py-2.5">
            <Button
              onClick={() => {
                setSelectedImage(null);
              }}
              color="gray"
              className="absolute top-2 left-2"
              variant="ghost"
            >
              <Icon name="undo" className="stroke-framer-text size-3" />
            </Button>
            <img
              src={selectedImage.url}
              alt={`Generated image `}
              className="h-full w-2/5 rounded-[20px] object-cover"
            />
          </div>

          <span className="text-framer-text/70 text-[10px] font-medium">Prompt:</span>
          <div className="flex items-end justify-between gap-4">
            <span className="text-framer-text truncate text-sm font-medium text-nowrap">
              {selectedImage.prompt}
            </span>

            <div className="w-6">
              <Icon name="copy" className="stroke-stone-500" />
            </div>
          </div>

          <div className="mt-1 flex space-x-1">
            <InfoItem title={style} />
            <InfoItem title={aspect_ratio} />
          </div>

          <hr className="my-2 opacity-30" />
          <div className="flex items-center justify-between">
            <Button leftIcon={<Icon name="add" className="stroke-white" />} variant="contained">
              <span>Insert</span>
            </Button>

            <Button
              leftIcon={<Icon name="regeneration" className="stroke-stone-400" />}
              variant="contained"
              color="gray"
            >
              <span>Regeneration</span>
            </Button>

            <Button
              leftIcon={<Icon name="upscale" className="stroke-stone-400" />}
              variant="contained"
              color="gray"
            >
              <span>Upscale</span>
            </Button>
            <Button variant="contained" color="gray" className="w-[34px] px-1">
              <Icon name="download" className="stroke-stone-400" />
            </Button>

            <Button variant="contained" color="gray" className="w-[34px] px-1">
              <Icon name="bookmark" className="stroke-stone-400" />
            </Button>
          </div>
        </div>
      ) : loading ? (
        <ColSkelton array={Array(num_outputs).fill(1)} />
      ) : (
        <div className="grid grid-cols-3 gap-2">
          <ColImages
            handleImageClick={handleImageClick}
            images={images.filter((_, i) => i % 3 === 0)}
          />
          <ColImages
            handleImageClick={handleImageClick}
            images={images.filter((_, i) => i % 3 === 1)}
          />
          <ColImages
            handleImageClick={handleImageClick}
            images={images.filter((_, i) => i % 3 === 2)}
          />
        </div>
      )}
    </div>
  );
};
