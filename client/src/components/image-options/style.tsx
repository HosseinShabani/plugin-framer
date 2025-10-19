import { IMAGE_STYLES } from "@/constants/image-styles";
import { useImageConfigStore } from "@/context/image-config";
import { cn } from "@/utils/cn";
import { useShallow } from "zustand/shallow";
import realisticImg from "@/assets/img/realistic-image.webp";

const ImageStyles = () => {
  const [style, handleStyle] = useImageConfigStore(
    useShallow((state) => [state.style, state.handleStyle])
  );

  return (
    <>
      <div className="text-framer-text/70 font-mediums mt-3 mb-2 text-[10px]">Styles:</div>

      <div className="scrollArea flex w-full flex-nowrap gap-2 overflow-x-auto pb-1 text-nowrap">
        {IMAGE_STYLES.map((st) => {
          return (
            <div
              key={st}
              className={cn(
                "cursor-pointer items-center justify-center rounded-md px-1 pt-1 font-medium select-none",
                st === style
                  ? "bg-framer-text-tertiary text-framer-text-reversed"
                  : "text-framer-text/60"
              )}
              onClick={() => handleStyle(st)}
            >
              <div className="h-10 w-[66px]">
                <img
                  className="border-framer-text-tertiary h-full w-full rounded-sm border"
                  src={realisticImg}
                  alt={st}
                />
              </div>

              <span className="text-[10px] font-medium">{st}</span>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ImageStyles;
