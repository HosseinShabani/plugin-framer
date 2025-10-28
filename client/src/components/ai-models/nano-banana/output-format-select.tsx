import { Select } from "@/components/ui/select";
import { useNanoBananaStore } from "@/context/nano-banana";
import { useShallow } from "zustand/shallow";

const OutputFormatSelect = () => {
  const { output_format, handleOutputFormat } = useNanoBananaStore(useShallow((state) => state));
  return (
    <Select
      label="Output Format"
      className="w-full"
      placeholder="Select output format"
      value={output_format}
      onChange={handleOutputFormat}
      options={["jpg", "png"].map((ar) => {
        return {
          label: ar,
          value: ar,
        };
      })}
    />
  );
};

export default OutputFormatSelect;
