import { useRef } from "react";
import { Icon } from "./Icon";

type Props = React.ComponentProps<"input"> & {
  label?: string;
  max?: number;
  files?: File[];
  onChangeFile: (files: File[]) => void;
};

const ImageFileInput = ({ label, max = 4, onChangeFile, files = [], ...props }: Props) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const fileArray = Array.from(files).slice(0, max);
      onChangeFile(fileArray);
    }
  };

  const removeImage = (index: number) => {
    onChangeFile(files.filter((_, i) => i !== index));
  };
  return (
    <div className="flex flex-col gap-1">
      {label && <div className="text-framer-text text-xs font-medium">{label}</div>}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        max={max}
        className="hidden"
        onChange={handleFileChange}
        {...props}
      />

      {files.length > 0 ? (
        <div
          onClick={handleClick}
          className="border-framer-text-tertiary/50 bg-framer-bg-tertiary flex min-h-[96px] cursor-pointer rounded-lg border-2 border-dashed py-2 transition-colors"
        >
          <div className="m-auto flex flex-wrap items-center justify-center gap-2">
            {files
              ?.map((file) => URL.createObjectURL(file))
              ?.map((preview, index) => (
                <div key={index} className="relative">
                  <img
                    src={preview}
                    alt={`Selected ${index + 1}`}
                    className="border-framer-text-tertiary/50 h-[56px] w-20 rounded-lg border-2 object-cover"
                  />
                  <div className="bg-framer-bg/80 absolute top-1 right-1 z-30 flex size-7 cursor-pointer items-center justify-center rounded-full transition-all duration-300 hover:brightness-50">
                    <Icon
                      onClick={(e) => {
                        e.stopPropagation();
                        removeImage(index);
                      }}
                      name="trash"
                      className="text-framer-text size-4 min-h-4 min-w-4"
                    />
                  </div>
                </div>
              ))}
            {Array.from({ length: max - files.length }).map((_, index) => (
              <div
                key={index}
                className="border-framer-text-tertiary/50 bg-framer-bg/50 flex h-[56px] w-20 cursor-pointer items-center justify-center rounded-lg border-2 border-dashed"
              >
                <Icon name="image-add" className="stroke-framer-text-secondary size-[18px]" />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div
          onClick={handleClick}
          className="border-framer-text-tertiary/50 bg-framer-bg-tertiary flex h-[117px] cursor-pointer rounded-lg border-2 border-dashed transition-colors"
        >
          <div className="m-auto flex w-[246px] flex-col items-center gap-2 text-center">
            <Icon name="image-add" className="stroke-framer-text-secondary size-[18px]" />
            <h4 className="text-framer-text-secondary text-sm font-semibold">
              Drag & drop up to {max} image(s)
            </h4>
            <h6 className="text-framer-text-secondary text-xs font-medium">
              Use up to {max} Backgrounds characters or items, and combine them freely
            </h6>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageFileInput;
