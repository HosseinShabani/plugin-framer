import { useShallow } from "zustand/react/shallow";
import ImageFileInput from "../../ui/image-file-input";
import { useSeeDream4Store } from "@/context/see-dream-4";

const ImageInput = () => {
  const { image_input, handleImageInput } = useSeeDream4Store(useShallow((state) => state));
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
