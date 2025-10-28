import { Select } from "@/components/ui/select";
import { useSeeDream4Store } from "@/context/see-dream-4";
import { useShallow } from "zustand/shallow";

const AspectRatioSelect = () => {
  const { aspect_ratio, handleAspectRatio } = useSeeDream4Store(useShallow((state) => state));
  return (
    <Select
      label="Aspect Ratio"
      className="w-full"
      placeholder="Select aspect ratio"
      value={aspect_ratio}
      onChange={handleAspectRatio}
      options={["match_input_image", "1:1", "4:3", "3:4", "16:9", "9:16", "3:2", "2:3", "21:9"].map(
        (ar) => {
          return {
            label: ar,
            value: ar,
          };
        }
      )}
      leftIcon={<div className="border-framer-text-secondary h-3.5 w-2.5 rounded-xs border" />}
    />
  );
};

export default AspectRatioSelect;
