import { Button } from "../ui/button";
import { Icon } from "../ui/Icon";
import { GeneratedImage } from "@framer-plugin/shared";

const InfoItem = ({ title }: { title: string | number }) => {
  return (
    <div className="bg-framer-bg-tertiary min-w-[30px] rounded-2xl px-1.5 py-1 text-center text-[10px] font-semibold">
      {title}
    </div>
  );
};

type Props = {
  selectedImage: GeneratedImage;
  setSelectedImage: React.Dispatch<React.SetStateAction<GeneratedImage | null>>;
};

const SelectedImage = ({ selectedImage, setSelectedImage }: Props) => {
  return (
    <div className="w-full">
      <div
        onClick={() => {
          setSelectedImage(null);
        }}
        className="mb-5 flex cursor-pointer items-center gap-2"
      >
        <Icon name="arrow-left" className="stroke-framer-text size-3" />
        Back to Gallery
      </div>
      <div className="bg-framer-bg-tertiary relative flex min-h-[390px] w-full items-center justify-center rounded-xl py-2.5">
        <img
          src={selectedImage.url}
          alt={`Generated image `}
          className="h-full w-2/5 rounded-[20px] object-cover select-none"
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
        <InfoItem title="Realistic" />
        <InfoItem title="1:3" />
      </div>
      <hr className="my-2 opacity-30" />
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <Button
            transition
            leftIcon={<Icon name="add" className="stroke-white" />}
            variant="contained"
            className="text-xs"
          >
            Insert
          </Button>

          <Button
            leftIcon={<Icon name="regeneration" className="stroke-framer-text-secondary" />}
            variant="outlined"
            transition
            className="text-xs"
            color="gray"
          >
            Regeneration
          </Button>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="outlined" transition color="gray" className="w-[34px] px-1">
            <Icon name="download" className="stroke-framer-text-secondary" />
          </Button>

          <Button variant="outlined" transition color="gray" className="w-[34px] px-1">
            <Icon name="bookmark" className="stroke-framer-text-secondary" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SelectedImage;
