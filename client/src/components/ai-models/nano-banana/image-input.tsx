import { useShallow } from "zustand/react/shallow";
import ImageFileInput from "../../ui/image-file-input";
import { useNanoBananaStore } from "@/context/nano-banana";

const ImageInput = () => {
  const { image_input, handleImageInput } = useNanoBananaStore(useShallow((state) => state));
  return (
    <ImageFileInput
      label="Image Guidance"
      max={10}
      files={image_input}
      onChangeFile={handleImageInput}
    />
  );
};

export default ImageInput;
