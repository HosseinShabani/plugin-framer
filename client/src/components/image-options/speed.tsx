import { IMAGE_SPEED } from "@/constants/image-speed";
import { useImageConfigStore } from "@/context/image-config";
import { cn } from "@/utils/cn";
import { useShallow } from "zustand/shallow";

const ImageSpeed = () => {
  const [go_fast, handleGoFast] = useImageConfigStore(
    useShallow((state) => [state.go_fast, state.handleGoFast])
  );

  return (
    <>
      <div className="text-framer-text/70 font-mediums mt-3 mb-2 text-[10px]">Speed:</div>

      <div className="grid grid-cols-4 gap-2">
        {IMAGE_SPEED.map((sp) => {
          return (
            <div
              key={sp.title}
              className={cn(
                "flex h-7 w-full cursor-pointer items-center justify-center rounded-md",
                sp.value === go_fast
                  ? "bg-framer-text-tertiary text-framer-text-reversed"
                  : "bg-framer-bg text-framer-text/70"
              )}
              onClick={() => handleGoFast(sp.value)}
            >
              <span className="text-[12px] font-medium">{sp.title}</span>
            </div>
          );
        })}
      </div>
    </>
  );
};
export default ImageSpeed;
