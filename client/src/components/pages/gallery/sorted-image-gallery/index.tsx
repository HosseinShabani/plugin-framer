// import { GeneratedImage } from "@framer-plugin/shared";
import ColumnImages from "./column-images";
import SelectedImage from "./selected-image";
import ColumnSkelton from "./column-skelton";
import { useGalleryStore } from "@/context/gallery";
import { useShallow } from "zustand/shallow";
import { useGetActions } from "@/hooks/use-get-actions";

interface Props {
  // images: GeneratedImage[];
}

export const SortedImageGallery: React.FC<Props> = () => {
  const { image } = useGalleryStore(useShallow((state) => state));
  const { data: actions, isSuccess } = useGetActions({});

  if (!isSuccess) {
    return <ColumnSkelton array={Array(4).fill(1)} />;
  } else if (image) {
    return <SelectedImage />;
  }

  const images = actions?.data.map((action) => {
    return action.images.map((image) => ({
      url: image,
      input: action.input,
    }));
  }).flatMap((image) => image);

  return (
    images.length === 0
      ? <div className="text-center text-2xl">The Gallery is empty</div>
      : (
        <div className="grid grid-cols-3 gap-2">
          <ColumnImages images={images.filter((_, i) => i % 3 === 0)} />
          <ColumnImages images={images.filter((_, i) => i % 3 === 1)} />
          <ColumnImages images={images.filter((_, i) => i % 3 === 2)} />
        </div>
      )
  );
};
