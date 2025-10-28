import { SortedImageGallery } from "@/components/sorted-image-gallery";
import img from "@/assets/img/realistic-image.webp";

const GalleryPage = () => {
  return (
    <div>
      <SortedImageGallery
        images={[
          {
            prompt: "11111",
            url: img,
          },
          {
            prompt: "22222",
            url: "https://www.pngmart.com/files/1/Adorable-Cat-PNG.png",
          },
          {
            prompt: "33333",
            url: "https://www.pngmart.com/files/1/Adorable-Cat-PNG.png",
          },
          {
            prompt: "44444",
            url: "https://www.pngmart.com/files/1/Adorable-Cat-PNG.png",
          },
        ]}
      />
    </div>
  );
};

export default GalleryPage;
