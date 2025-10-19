import { OUTPUT_FORMAT } from "@/constants/output-format";
import { useImageConfigStore } from "@/context/image-config";
import { cn } from "@/utils/cn";
import { useShallow } from "zustand/shallow";

const ImageOutputFormat = () => {
  const [format, handleOutPutFormat] = useImageConfigStore(
    useShallow((state) => [state.output_format, state.handleOutPutFormat])
  );

  return (
    <>
      <div className="text-framer-text/70 font-mediums mt-3 mb-2 text-[10px]">Output Format:</div>

      <div className="grid grid-cols-4 gap-2">
        {OUTPUT_FORMAT.map((fmt) => {
          return (
            <div
              key={fmt}
              className={cn(
                "flex h-7 w-full cursor-pointer items-center justify-center rounded-md",
                fmt === format
                  ? "bg-framer-text-tertiary text-framer-text-reversed"
                  : "bg-framer-bg text-framer-text/70"
              )}
              onClick={() => handleOutPutFormat(fmt)}
            >
              <span className="text-[12px] font-medium">{fmt}</span>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ImageOutputFormat;
