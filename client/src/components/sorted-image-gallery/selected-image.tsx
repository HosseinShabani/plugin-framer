import { useImageConfigStore } from "@/context/image-config";
import { useShallow } from "zustand/shallow";
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
  const [style, aspect_ratio] = useImageConfigStore(
    useShallow((state) => [state.style, state.aspect_ratio])
  );

  return (
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
        <InfoItem title={style} />
        <InfoItem title={aspect_ratio} />
      </div>

      <hr className="my-2 opacity-30" />
      <div className="flex items-center justify-between">
        <Button
          transition
          leftIcon={<Icon name="add" className="stroke-white" />}
          variant="contained"
          className="text-xs"
        >
          Insert
        </Button>

        <Button
          leftIcon={<Icon name="regeneration" className="stroke-framer-text/60" />}
          variant="outlined"
          transition
          className="text-xs"
          color="gray"
        >
          Regeneration
        </Button>

        <Button
          leftIcon={<Icon name="upscale" className="stroke-framer-text/60" />}
          variant="outlined"
          transition
          color="gray"
          className="text-xs"
        >
          Upscale
        </Button>
        <Button variant="outlined" transition color="gray" className="w-[34px] px-1">
          <Icon name="download" className="stroke-framer-text/60" />
        </Button>

        <Button variant="outlined" transition color="gray" className="w-[34px] px-1">
          <Icon name="bookmark" className="stroke-framer-text/60" />
        </Button>
      </div>
    </div>
  );
};

export default SelectedImage;
