import { Select } from "@/components/ui/select";
import { useSeeDream4Store } from "@/context/see-dream-4";
import { useShallow } from "zustand/shallow";

const SizeSelect = () => {
  const { size, handleSize } = useSeeDream4Store(useShallow((state) => state));
  return (
    <Select
      label="Size"
      className="w-full"
      placeholder="Select size"
      value={size}
      onChange={handleSize}
      options={["1K", "2K", "4K", "custom"].map((ar) => {
        return {
          label: ar,
          value: ar,
        };
      })}
      helperText="Image resolution: 1K (1024px), 2K (2048px), 4K (4096px), or 'custom' for specific dimensions."
    />
  );
};

export default SizeSelect;
