import { Button } from "@/components/ui/button";
import { Icon } from "@/components/icon";
import { useGalleryStore } from "@/context/gallery";
import { useShallow } from "zustand/shallow";
import { toast } from "sonner";
import { framer } from "framer-plugin";

const InfoItem = ({ title }: { title: string | number }) => {
  return (
    <div className="bg-framer-bg-tertiary min-w-[30px] rounded-2xl px-1.5 py-1 text-center text-[10px] font-semibold">
      {title}
    </div>
  );
};

const FEATURES = ["aspect_ratio", "output_format"];

const URL = import.meta.env.VITE_API_IMAGE_ADDRESS;

const SelectedImage = () => {
  const { setImage, image } = useGalleryStore(useShallow((state) => state));

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(image?.input?.prompt || "");
    toast.success("Prompt copied to clipboard");
  };

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

  const handleInsert = async () => {
    if (!image?.url) {
      return;
    }

    try {
      await framer.addImage({
        image: `${URL}${image?.url}`,
        name: "My image",
        altText: "Alt description",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full">
      <div
        onClick={() => {
          setImage(null);
        }}
        className="mb-5 flex cursor-pointer items-center gap-2"
      >
        <Icon name="arrow-left" className="stroke-framer-text size-3" />
        Back to Gallery
      </div>
      <div className="bg-framer-bg-tertiary relative flex min-h-[390px] w-full items-center justify-center rounded-xl py-2.5">
        <img
          src={`${URL}${image?.url}`}
          alt={`Generated image `}
          className="h-full w-2/5 rounded-[20px] object-cover select-none"
        />
      </div>
      <span className="text-framer-text/70 text-[10px] font-medium">
        Prompt:
      </span>
      <div className="flex items-center justify-between gap-4">
        <span className="text-framer-text truncate text-sm font-medium text-nowrap">
          {image?.input?.prompt}
        </span>

        <Button
          onClick={handleCopyPrompt}
          variant="contained"
          color="gray"
          size="icon"
        >
          <Icon name="copy" className="stroke-framer-text-secondary" />
        </Button>
      </div>
      <div className="mt-1 flex space-x-1">
        {FEATURES.map((feature) => <InfoItem title={image?.input[feature]} />)}
      </div>
      <hr className="my-2 opacity-30" />
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <Button
            onClick={() => {
              handleInsert();
            }}
            variant="contained"
          >
            <Icon name="add" className="stroke-primary-foreground size-3.5" />
            Insert
          </Button>

          <Button variant="contained" className="gap-1 px-3" color="gray">
            <Icon
              name="regeneration"
              className="stroke-framer-text-secondary size-3.5"
            />
            <span className="mr-auto">Regeneration</span>
          </Button>
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="contained"
            className="size-[34px]"
            color="gray"
            size="icon"
            onClick={() => {
              downloadImage(image?.url || "");
            }}
          >
            <Icon name="download" className="stroke-framer-text-secondary" />
          </Button>

          <Button variant="contained" color="gray" size="icon">
            <Icon name="bookmark" className="stroke-framer-text-secondary" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SelectedImage;
