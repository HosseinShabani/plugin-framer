import { Select } from "@/components/ui/select";
import { useNanoBananaStore } from "@/context/nano-banana";
import { useShallow } from "zustand/shallow";

const AspectRatioSelect = () => {
  const { aspect_ratio, handleAspectRatio } = useNanoBananaStore(useShallow((state) => state));
  return (
    <Select
      label="Aspect Ratio"
      className="w-full"
      placeholder="Select aspect ratio"
      value={aspect_ratio}
      onChange={handleAspectRatio}
      options={[
        "match_input_image",
        "1:1",
        "2:3",
        "3:2",
        "3:4",
        "4:3",
        "4:5",
        "5:4",
        "9:16",
        "16:9",
        "21:9",
      ].map((ar) => {
        return {
          label: ar,
          value: ar,
        };
      })}
      leftIcon={<div className="border-framer-text-secondary h-3.5 w-2.5 rounded-xs border" />}
    />
  );
};

export default AspectRatioSelect;
