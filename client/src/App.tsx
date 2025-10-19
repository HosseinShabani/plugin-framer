import { framer } from "framer-plugin";
import { useShallow } from "zustand/shallow";
import { useImageStore } from "./context/images";
import { SortedImageGallery } from "./components/sorted-image-gallery";
import GiftSection from "./components/gift-section";
import LogoTitle from "./components/logo-title";
import { GeneratedImage } from "@framer-plugin/shared";
import giftImg from "@/assets/img/gift.svg";
import Img1 from "@/assets/img/bg.png";
import Img2 from "@/assets/img/bg2.png";
import Img3 from "@/assets/img/realistic-image.webp";
import AdvancedDropdown from "./components/dropdowns/advanced-dropdown";
import ModelDropdown from "./components/dropdowns/model-dropdown";
import StyleDropdown from "./components/dropdowns/style-dropdown";
import OrientationDropdown from "./components/dropdowns/orientation-dropdown";
import UserPromptInput from "./components/user-prompt-input";
import Footer from "./components/footer";

framer.showUI({
  position: "top right",
  width: 593,
  height: 724,
});

export function App() {
  const [images] = useImageStore(useShallow((state) => [state.images]));
  const x: GeneratedImage[] = [
    {
      prompt: "hi",
      url: giftImg,
    },
    {
      prompt: "hi",
      url: Img1,
    },
    {
      prompt: "hi",
      url: Img2,
    },
    {
      prompt: "hi",
      url: Img3,
    },
  ];

  return (
    <div className="h-screen bg-[url(./assets/img/bg2.png)] bg-cover bg-blend-overlay">
      <div className="from-framer-bg/80 to-framer-bg/80 fixed inset-0 bg-linear-to-b" />

      <div className="relative z-50 flex h-full flex-col px-4 pb-11">
        <LogoTitle />

        <UserPromptInput />

        <div className="mt-2 flex gap-1.5">
          <AdvancedDropdown />
          <ModelDropdown />
          <StyleDropdown />
          <OrientationDropdown />
        </div>

        <GiftSection />

        <SortedImageGallery images={x} />
        <Footer />
      </div>
    </div>
  );
}
