import { TextInputType } from "@/types/input-types";
import { useController, UseFormReturn } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { cn } from "@/utils/cn";
import { useRef, useCallback, useState } from "react";
import { Icon } from "../icon";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";

type Props = {
  input: TextInputType & {
    subPlaceholder?: string;
    accept?: string;
  };
  form: UseFormReturn<any>;
};

const prevent = (handler?: (e: React.DragEvent) => void) => {
  return (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (handler) {
      handler(e);
    }
  };
};

const ImageInput = ({ form, input }: Props) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const { defaultValue, ...props } = input.props || {};

  const { field, fieldState } = useController({
    name: input.name,
    control: form.control,
    defaultValue,
    rules: input?.rules,
  });

  const max = input.rules?.max ? Number(input.rules.max) : Infinity;
  const accept = input?.accept || "image/*";

  const setRefs = useCallback(
    (node: HTMLInputElement | null) => {
      fileInputRef.current = node;
      if (field.ref) {
        field.ref(node);
      }
    },
    [field.ref]
  );

  const handleFiles = useCallback(
    (newFiles: File[]) => {
      // Merge with existing files, but don't exceed max
      setFiles((prevFiles) => {
        const mergedFiles = [...prevFiles, ...newFiles].slice(0, max);
        field.onChange(mergedFiles);
        return mergedFiles;
      });
    },
    [max, field]
  );

  const removeImage = (index: number) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    field.onChange(updatedFiles);
    setFiles(updatedFiles);
  };

  const handleDragEnter = (_e: React.DragEvent) => {
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    // Only set dragging to false if we're leaving the drop zone entirely
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setIsDragging(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    setIsDragging(false);

    const droppedFiles = Array.from(e.dataTransfer.files);

    // Filter files based on accept type
    const acceptedFiles = droppedFiles.filter((file) => {
      if (accept === "image/*") {
        return file.type.startsWith("image/");
      }
      // Handle specific MIME types or extensions
      return accept.split(",").some((type) => {
        const trimmedType = type.trim();
        return (
          file.type === trimmedType ||
          file.name.toLowerCase().endsWith(trimmedType.replace("*", ""))
        );
      });
    });

    if (acceptedFiles.length > 0) {
      handleFiles(acceptedFiles);
    }
  };
  return (
    <Field className="gap-1" data-invalid={fieldState.invalid}>
      {input?.label && (
        <FieldLabel className="text-framer-text-secondary pb-1 text-xs font-medium">
          {input.label}
        </FieldLabel>
      )}

      <input
        ref={setRefs}
        aria-invalid={fieldState.invalid}
        {...props}
        className={cn(input.props?.className)}
        type="file"
        multiple
        accept={accept}
        onChange={(e) => {
          const newFiles = e.target.files;
          if (newFiles) {
            handleFiles(Array.from(newFiles));
          }
          e.target.value = "";
        }}
        hidden
      />

      {files.length > 0 ? (
        <ScrollArea
          onDragEnter={prevent(handleDragEnter)}
          onDragOver={prevent()}
          onDragLeave={prevent(handleDragLeave)}
          onDrop={prevent(handleDrop)}
          className={cn(
            "border-framer-text-tertiary/50 bg-framer-bg-tertiary flex cursor-pointer rounded-lg border-2 border-dashed p-2 transition-colors select-none",
            isDragging && "border-framer-text-secondary bg-framer-bg-secondary"
          )}
        >
          <div className="m-auto flex flex-nowrap items-center justify-center gap-2">
            {files
              ?.map((file) => URL.createObjectURL(file))
              ?.map((preview, index) => (
                <div key={index} className="relative">
                  <img
                    src={preview}
                    alt={`Selected ${index + 1}`}
                    className="border-framer-text-tertiary/50 max-h-[56px] min-h-[56px] w-20 min-w-20 rounded-lg border-2 object-cover"
                  />
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      removeImage(index);
                    }}
                    className="bg-framer-bg/80 absolute top-1 right-1 z-30 flex size-7 cursor-pointer items-center justify-center rounded-full transition-all duration-300 hover:brightness-50"
                  >
                    <Icon name="trash" className="text-framer-text size-4 min-h-4 min-w-4" />
                  </div>
                </div>
              ))}
            {max === Infinity ? (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-framer-text-tertiary/50 bg-framer-bg/50 hover:bg-framer-bg-tertiary flex h-[56px] w-20 cursor-pointer items-center justify-center rounded-lg border-2 border-dashed transition-colors"
              >
                <Icon name="image-add" className="stroke-framer-text-secondary size-[18px]" />
              </div>
            ) : (
              Array.from({ length: Math.max(0, max - files.length) }).map((_, index) => (
                <div
                  key={index}
                  onClick={() => fileInputRef.current?.click()}
                  className="border-framer-text-tertiary/50 bg-framer-bg/50 hover:bg-framer-bg-tertiary flex h-[56px] w-20 cursor-pointer items-center justify-center rounded-lg border-2 border-dashed transition-colors"
                >
                  <Icon name="image-add" className="stroke-framer-text-secondary size-[18px]" />
                </div>
              ))
            )}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      ) : (
        <EmptyBox
          onClick={() => fileInputRef.current?.click()}
          onDragEnter={prevent(handleDragEnter)}
          onDragOver={prevent()}
          onDragLeave={prevent(handleDragLeave)}
          onDrop={prevent(handleDrop)}
          className={cn(isDragging && "border-framer-text-secondary bg-framer-bg-secondary")}
          placeholder={input.placeholder}
          subPlaceholder={input?.subPlaceholder}
        />
      )}

      {fieldState.invalid && <FieldError className="mr-4 text-xs" errors={[fieldState.error]} />}

      {input.description && (
        <div className="text-framer-text-tertiary text-xs font-medium">{input.description}</div>
      )}
    </Field>
  );
};

const EmptyBox = (
  props: React.HTMLAttributes<HTMLDivElement> & { placeholder?: string; subPlaceholder?: string }
) => {
  return (
    <div
      {...props}
      className={cn(
        "border-framer-text-tertiary/50 bg-framer-bg-tertiary flex h-[117px] cursor-pointer rounded-lg border-2 border-dashed transition-colors select-none",
        props.className
      )}
    >
      <div className="m-auto flex w-[246px] flex-col items-center gap-2 text-center">
        <Icon name="image-add" className="stroke-framer-text-secondary size-[18px]" />
        <h4 className="text-framer-text-secondary text-sm font-semibold">{props.placeholder}</h4>
        <h6 className="text-framer-text-secondary text-xs font-medium">{props.subPlaceholder}</h6>
      </div>
    </div>
  );
};

export default ImageInput;
