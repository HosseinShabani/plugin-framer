import { ASPECT_RATIO } from "@/constants/aspect-ratio";
import { useImageConfigStore } from "@/context/image-config";
import { cn } from "@/utils/cn";
import { useShallow } from "zustand/shallow";

const ImageAspectRatio = () => {
  const [aspect_ratio, handleAspectRatio] = useImageConfigStore(
    useShallow((state) => [state.aspect_ratio, state.handleAspectRatio])
  );

  return (
    <>
      <div className="text-framer-text/70 font-mediums mt-3 mb-2 text-[10px]">Aspect Ratio:</div>

      <div className="grid grid-cols-10 gap-2">
        {ASPECT_RATIO.map((ar) => {
          return (
            <div
              key={ar}
              className={cn(
                "flex h-7 w-7 cursor-pointer items-center justify-center rounded-md",
                ar === aspect_ratio
                  ? "bg-framer-text-tertiary text-framer-text-reversed"
                  : "bg-framer-bg text-framer-text/70"
              )}
              onClick={() => handleAspectRatio(ar)}
            >
              <span className="text-[10px] font-medium">{ar}</span>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ImageAspectRatio;
