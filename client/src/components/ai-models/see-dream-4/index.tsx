import SizeSelect from "./size-select";
import AspectRatioSelect from "./aspect-ratio-select";
import WidthInput from "./width-input";
import HeightInput from "./height-input";
import CounterInput from "./counter-input";
import EnhancePromptSwitch from "./enhance-prompt-switch";
import SequentialImageGenerationSelect from "./sequential-image-generation-select";
import ImageInput from "./image-input";
import { useShallow } from "zustand/shallow";
import { useSeeDream4Store } from "@/context/see-dream-4";
import { GenerateButton } from "@/components/ui/generate-button";

const SeeDream4 = () => {
  const { max_images, creditPerImage } = useSeeDream4Store(useShallow((state) => state));

  return (
    <>
      <div className="grid gap-[18px]">
        <AspectRatioSelect />
        <SizeSelect />
        <WidthInput />
        <HeightInput />
        <EnhancePromptSwitch />
        <SequentialImageGenerationSelect />
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

export default SeeDream4;
