import React, { useState } from "react";
import { GeneratedImage } from "@framer-plugin/shared";
import { useShallow } from "zustand/shallow";
import { useImageConfigStore } from "@/context/image-config";

interface SortedImageGalleryProps {
  images: GeneratedImage[];
}
interface ColImagesProps {
  images: GeneratedImage[];
  handleImageClick: (image: GeneratedImage) => void;
}

const ColImages: React.FC<ColImagesProps> = ({ images, handleImageClick }) => {
  return (
    <div className="grid gap-2">
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

            <div className="absolute top-3.5 right-3.5">
              <svg
                width="12"
                height="14"
                viewBox="0 0 12 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.66602 0.870483H9.33398C10.3855 0.870483 11.25 1.73497 11.25 2.7865V12.5238C11.2499 12.9789 11.0936 13.1182 11.0381 13.1508C10.9807 13.1843 10.7786 13.2525 10.376 13.0336L7.00781 11.1566C6.69138 10.9798 6.32328 10.9144 5.99902 10.9144C5.71376 10.9144 5.39674 10.965 5.10938 11.0941L4.98828 11.1547L4.9834 11.1566L1.61523 13.0345H1.61426C1.21624 13.2571 1.01855 13.1869 0.963867 13.1547C0.907829 13.1215 0.750057 12.9797 0.75 12.5238V2.7865C0.75 1.73497 1.61449 0.870483 2.66602 0.870483Z"
                  stroke="white"
                  strokeOpacity="0.6"
                  strokeWidth="1.5"
                />
              </svg>
            </div>

            <div className="bg-framer-bg-secondary absolute right-1.5 bottom-1.5 left-1.5 z-10 flex h-8 items-center justify-between rounded-4xl px-1.5">
              <div className="size-6 place-content-center place-items-center rounded-full bg-[#514FE8] hover:opacity-85">
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 5H9"
                    stroke="#F7F7F7"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M5 9V1"
                    stroke="#F7F7F7"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="">
                <svg
                  width="14"
                  height="16"
                  viewBox="0 0 14 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.81494 1.07397L12.3335 3.59253L9.81494 6.11108"
                    stroke="#888888"
                    strokeWidth="1.41669"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M1 7.37024V6.11096C1 5.443 1.26535 4.8024 1.73767 4.33007C2.20999 3.85775 2.85059 3.59241 3.51855 3.59241H12.3335"
                    stroke="#888888"
                    strokeWidth="1.41669"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M3.51855 14.926L1 12.4075L3.51855 9.88892"
                    stroke="#888888"
                    strokeWidth="1.41669"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12.3335 8.62964V9.88892C12.3335 10.5569 12.0681 11.1975 11.5958 11.6698C11.1235 12.1421 10.4829 12.4075 9.81494 12.4075H1"
                    stroke="#888888"
                    strokeWidth="1.41669"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              <div className="">
                <svg
                  width="15"
                  height="14"
                  viewBox="0 0 15 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.33325 1H13.3333V5"
                    stroke="#888888"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M5.33325 13H1.33325V9"
                    stroke="#888888"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M13.3332 1L8.6665 5.66667"
                    stroke="#888888"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M1.33325 13L5.99992 8.33337"
                    stroke="#888888"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              <div className="mr-1">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13 9V11.6667C13 12.0203 12.8595 12.3594 12.6095 12.6095C12.3594 12.8595 12.0203 13 11.6667 13H2.33333C1.97971 13 1.64057 12.8595 1.39052 12.6095C1.14048 12.3594 1 12.0203 1 11.6667V9"
                    stroke="#888888"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M3.66675 5.66663L7.00008 8.99996L10.3334 5.66663"
                    stroke="#888888"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M7 9V1"
                    stroke="#888888"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
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

export const SortedImageGallery: React.FC<SortedImageGalleryProps> = ({ images }) => {
  const [style, aspect_ratio] = useImageConfigStore(
    useShallow((state) => [state.style, state.aspect_ratio])
  );

  const [selectedImage, setSelectedImage] = useState<GeneratedImage | null>(null);

  const handleImageClick = (image: GeneratedImage) => {
    setSelectedImage(image === selectedImage ? null : image);
  };
  return (
    <div className="z-20 mt-3">
      {selectedImage ? (
        <div className="w-full">
          <div className="bg-framer-bg-tertiary flex h-60 w-full items-center justify-center rounded-xl py-2.5">
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
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.3333 6H7.33333C6.59695 6 6 6.59695 6 7.33333V13.3333C6 14.0697 6.59695 14.6667 7.33333 14.6667H13.3333C14.0697 14.6667 14.6667 14.0697 14.6667 13.3333V7.33333C14.6667 6.59695 14.0697 6 13.3333 6Z"
                  stroke="#888888"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M3.33325 10H2.66659C2.31296 10 1.97382 9.85953 1.72378 9.60949C1.47373 9.35944 1.33325 9.0203 1.33325 8.66668V2.66668C1.33325 2.31305 1.47373 1.97392 1.72378 1.72387C1.97382 1.47382 2.31296 1.33334 2.66659 1.33334H8.66658C9.02021 1.33334 9.35935 1.47382 9.60939 1.72387C9.85944 1.97392 9.99992 2.31305 9.99992 2.66668V3.33334"
                  stroke="#888888"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          <div className="mt-1 flex space-x-1">
            <InfoItem title={style} />
            <InfoItem title={aspect_ratio} />
          </div>

          <hr className="my-2 opacity-30" />
          <div className="flex items-center justify-between">
            <button className="flex h-[34px] cursor-pointer items-center justify-center gap-2 rounded-[59px] bg-[#514FE8] px-3 text-sm font-semibold text-white">
              <svg
                width="10"
                height="10"
                viewBox="0 0 10 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 5H9"
                  stroke="#F7F7F7"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M5 9V1"
                  stroke="#F7F7F7"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>{" "}
              <span>Insert</span>
            </button>

            <button className="bg-framer-bg-tertiary flex h-[34px] cursor-pointer items-center justify-center gap-2 rounded-[59px] px-3 text-sm font-semibold">
              <svg
                width="14"
                height="16"
                viewBox="0 0 14 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.81494 1.07397L12.3335 3.59253L9.81494 6.11108"
                  stroke="#888888"
                  strokeWidth="1.41669"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M1 7.37024V6.11096C1 5.443 1.26535 4.8024 1.73767 4.33007C2.20999 3.85775 2.85059 3.59241 3.51855 3.59241H12.3335"
                  stroke="#888888"
                  strokeWidth="1.41669"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M3.51855 14.926L1 12.4075L3.51855 9.88892"
                  stroke="#888888"
                  strokeWidth="1.41669"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12.3335 8.62964V9.88892C12.3335 10.5569 12.0681 11.1975 11.5958 11.6698C11.1235 12.1421 10.4829 12.4075 9.81494 12.4075H1"
                  stroke="#888888"
                  strokeWidth="1.41669"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>Regeneration</span>
            </button>

            <button className="bg-framer-bg-tertiary flex h-[34px] cursor-pointer items-center justify-center gap-2 rounded-[59px] px-3 text-sm font-semibold">
              <svg
                width="15"
                height="14"
                viewBox="0 0 15 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.33325 1H13.3333V5"
                  stroke="#888888"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M5.33325 13H1.33325V9"
                  stroke="#888888"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M13.3332 1L8.6665 5.66667"
                  stroke="#888888"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M1.33325 13L5.99992 8.33337"
                  stroke="#888888"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>Upscale</span>
            </button>

            <button className="bg-framer-bg-tertiary flex h-[36px] cursor-pointer items-center justify-center gap-2 rounded-[59px] px-3 text-sm font-semibold">
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13 9V11.6667C13 12.0203 12.8595 12.3594 12.6095 12.6095C12.3594 12.8595 12.0203 13 11.6667 13H2.33333C1.97971 13 1.64057 12.8595 1.39052 12.6095C1.14048 12.3594 1 12.0203 1 11.6667V9"
                  stroke="currentcolor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M3.66675 5.66663L7.00008 8.99996L10.3334 5.66663"
                  stroke="currentcolor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M7 9V1"
                  stroke="currentcolor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button className="bg-framer-bg-tertiary flex h-[36px] cursor-pointer items-center justify-center gap-2 rounded-[59px] px-3 text-sm font-semibold">
              <svg
                width="12"
                height="14"
                viewBox="0 0 12 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.66602 0.870483H9.33398C10.3855 0.870483 11.25 1.73497 11.25 2.7865V12.5238C11.2499 12.9789 11.0936 13.1182 11.0381 13.1508C10.9807 13.1843 10.7786 13.2525 10.376 13.0336L7.00781 11.1566C6.69138 10.9798 6.32328 10.9144 5.99902 10.9144C5.71376 10.9144 5.39674 10.965 5.10938 11.0941L4.98828 11.1547L4.9834 11.1566L1.61523 13.0345H1.61426C1.21624 13.2571 1.01855 13.1869 0.963867 13.1547C0.907829 13.1215 0.750057 12.9797 0.75 12.5238V2.7865C0.75 1.73497 1.61449 0.870483 2.66602 0.870483Z"
                  stroke="currentcolor"
                  strokeOpacity="0.6"
                  strokeWidth="1.5"
                />
              </svg>
            </button>
          </div>
        </div>
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
