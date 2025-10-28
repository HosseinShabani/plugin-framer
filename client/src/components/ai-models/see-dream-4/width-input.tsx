import { Input } from "@/components/ui/input";
import { useSeeDream4Store } from "@/context/see-dream-4";
import { useShallow } from "zustand/shallow";

const WidthInput = () => {
  const { width, handleWidth } = useSeeDream4Store(useShallow((state) => state));

  return (
    <Input
      label="Width"
      fullWidth
      placeholder="Enter width"
      helperText="Range: 1024-4096 pixels."
      type="number"
      value={width}
      onChange={(e) => handleWidth(Number(e.target.value))}
    />
  );
};

export default WidthInput;
