import { Icon } from "@/components/icon";
import { Button } from "@/components/ui/button";
import { cn } from "@/utils/cn";
// import { GeneratedImage } from "@framer-plugin/shared";
import { useGalleryStore } from "@/context/gallery";
import { useShallow } from "zustand/shallow";
import { IGalleryImage } from "@/types/gallery-image";
import { framer } from "framer-plugin";

interface Props {
  // images: GeneratedImage[];
  images: IGalleryImage[];
}

const URL = import.meta.env.VITE_API_IMAGE_ADDRESS;

const transition = "transition-all duration-200 group-hover:scale-75";

const ColumnImages: React.FC<Props> = ({ images }) => {
  const { setImage } = useGalleryStore(useShallow((state) => state));

  const downloadImage = async (path: string) => {
    const imageUrl = `${URL}${path}`;

    const response = await fetch(imageUrl);
    const blob = await response.blob();

    const blobUrl = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = blobUrl;
    a.download = path.split("/").pop() || "image.png";

    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);
    window.URL.revokeObjectURL(blobUrl);
  };

  const handleInsert = async (path: string) => {
    try {
      await framer.addImage({
        image: `${URL}${path}`,
        name: "My image",
        altText: "Alt description",
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="grid h-fit gap-2">
      {images.map((image, index) => {
        return (
          <div
            key={index}
            className={`relative cursor-pointer overflow-hidden rounded-2xl`}
            onDoubleClick={() => setImage(image)}
          >
            <img
              src={`${URL}${image.url}`}
              alt={`Generated image ${index + 1}`}
              className="h-full w-full object-cover transition-all duration-300 hover:scale-110 hover:opacity-80"
            />

            <div className="bg-framer-bg absolute right-1.5 bottom-1.5 left-1.5 z-10 mx-auto flex h-8 w-[87px] items-center justify-between rounded-4xl px-1.5">
              <Button
                onClick={() => handleInsert(image.url)}
                variant="contained"
                size="icon-sm"
              >
                <Icon name="add" className="size-2 stroke-white" />
              </Button>
              <Button
                variant="text"
                size="icon-sm"
                className="group"
                color="gray"
              >
                <Icon
                  name="regeneration"
                  className={cn(
                    "stroke-framer-text-secondary size-4",
                    transition,
                  )}
                />
              </Button>
              <Button
                variant="text"
                size="icon-sm"
                className="group"
                color="gray"
                onClick={() => {
                  downloadImage(image.url);
                }}
              >
                <Icon
                  name="download"
                  className={cn(
                    "stroke-framer-text-secondary size-4",
                    transition,
                  )}
                />
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ColumnImages;
