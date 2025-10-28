import { Select } from "@/components/ui/select";
import { useSeeDream4Store } from "@/context/see-dream-4";
import { useShallow } from "zustand/shallow";

const SequentialImageGenerationSelect = () => {
  const { sequential_image_generation, handleSequentialImageGeneration } = useSeeDream4Store(
    useShallow((state) => state)
  );
  return (
    <Select
      helperText="Group image generation mode. 'disabled' generates a single image. 'auto' lets the model decide whether to generate multiple related images (e.g., story scenes, character variations)."
      label="Sequential Image Generation"
      className="w-full"
      placeholder="Select sequential image generation"
      value={sequential_image_generation}
      onChange={handleSequentialImageGeneration}
      options={["disabled", "auto"].map((ar) => {
        return {
          label: ar,
          value: ar,
        };
      })}
    />
  );
};

export default SequentialImageGenerationSelect;
