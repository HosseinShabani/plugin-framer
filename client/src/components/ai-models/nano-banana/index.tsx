import AspectRatioSelect from "./aspect-ratio-select";
import CounterInput from "./counter-input";
import { GenerateButton } from "@/components/ui/generate-button";
import { useShallow } from "zustand/shallow";
import { useNanoBananaStore } from "@/context/nano-banana";
import OutputFormatSelect from "./output-format-select";
import ImageInput from "./image-input";

const NanoBanana = () => {
  const { max_images, creditPerImage } = useNanoBananaStore(useShallow((state) => state));

  return (
    <>
      <div className="grid gap-[18px]">
        <AspectRatioSelect />
        <OutputFormatSelect />
        <ImageInput />
      </div>
      <div className="mt-10" />
      <div className="flex gap-2">
        <CounterInput />
        <GenerateButton credits={max_images * creditPerImage} />
      </div>
    </>
  );
};

export default NanoBanana;
