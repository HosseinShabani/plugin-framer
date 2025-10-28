import { Input } from "@/components/ui/input";
import { useSeeDream4Store } from "@/context/see-dream-4";
import { useShallow } from "zustand/shallow";

const HeightInput = () => {
  const { height, handleHeight } = useSeeDream4Store(useShallow((state) => state));

  return (
    <Input
      label="Height"
      fullWidth
      placeholder="Enter height"
      helperText="Range: 1024-4096 pixels."
      type="number"
      value={height}
      onChange={(e) => handleHeight(Number(e.target.value))}
    />
  );
};

export default HeightInput;
