import { IMAGE_COUNT } from "@/constants/image-count";
import { useImageConfigStore } from "@/context/image-config";
import { cn } from "@/utils/cn";
import { useShallow } from "zustand/shallow";

const ImageNumber = () => {
  const [number, handleNumOutPut] = useImageConfigStore(
    useShallow((state) => [state.num_outputs, state.handleNumOutPut])
  );

  return (
    <>
      <div className="text-framer-text/70 font-mediums mt-3 mb-2 text-[10px]">
        Number of Images:
      </div>

      <div className="grid grid-cols-4 gap-2">
        {IMAGE_COUNT.map((count) => {
          return (
            <div
              key={count}
              className={cn(
                "flex h-7 w-full cursor-pointer items-center justify-center rounded-md",
                count === number
                  ? "bg-framer-text-tertiary text-framer-text-reversed"
                  : "bg-framer-bg text-framer-text/70"
              )}
              onClick={() => handleNumOutPut(count)}
            >
              <span className="text-[12px] font-medium">{count}</span>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ImageNumber;
