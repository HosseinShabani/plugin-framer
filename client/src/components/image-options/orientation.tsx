import { ORIENTATIONS } from "@/constants/orientation";
import { cn } from "@/utils/cn";
import { useState } from "react";

const ImageOrientation = () => {
  const [orientation, setOrientation] = useState(ORIENTATIONS[0].title);

  const handleOrientationClick = (title: string) => {
    setOrientation(title);
  };

  return (
    <>
      <div className="text-framer-text/70 font-mediums mt-3 mb-2 text-[10px]">Orientation:</div>

      <div className="flex w-full flex-nowrap gap-2 overflow-x-auto text-nowrap">
        {ORIENTATIONS.map((orient) => {
          return (
            <div
              key={orient.title}
              onClick={() => handleOrientationClick(orient.title)}
              className={cn(
                "flex min-w-12 cursor-pointer items-center gap-1 rounded-4xl p-2.5 text-center",
                orient.title === orientation
                  ? "bg-framer-text-tertiary text-framer-text-reversed"
                  : "bg-framer-bg text-framer-text/70"
              )}
            >
              {!!orient.classname && <div className={cn("rounded-xs border", orient.classname)} />}
              <span className="m-auto text-[10px] font-medium">{orient.title}</span>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ImageOrientation;
