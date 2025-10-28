import { GeneratedImage } from "@framer-plugin/shared";
import { Button } from "../ui/button";
import { Icon } from "../ui/Icon";

interface Props {
  images: GeneratedImage[];
  handleImageClick: (image: GeneratedImage) => void;
}

const ColumnImages: React.FC<Props> = ({ images, handleImageClick }) => {
  return (
    <div className="grid h-fit gap-2">
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
              className="h-full w-full object-cover transition-all duration-300 hover:scale-105 hover:opacity-80"
            />

            <div className="bg-framer-bg-secondary absolute right-1.5 bottom-1.5 left-1.5 z-10 mx-auto flex h-8 w-[87px] items-center justify-between rounded-4xl px-1.5">
              <Button variant="contained" className="size-6 p-0" transition>
                <Icon name="add" className="size-2 stroke-white" />
              </Button>
              <Button variant="ghost" className="size-6 p-0" color="gray" transition>
                <Icon name="regeneration" className="stroke-framer-text-secondary size-4" />
              </Button>
              <Button variant="ghost" className="size-6 p-0" color="gray" transition>
                <Icon name="download" className="stroke-framer-text-secondary size-4" />
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ColumnImages;
