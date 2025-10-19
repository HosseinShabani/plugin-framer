import { useImageStore } from "@/context/images";
import { useShallow } from "zustand/shallow";
import logo from "@/assets/img/icon.svg";

const LogoTitle = () => {
  const [images] = useImageStore(useShallow((state) => [state.images]));

  if (images.length) {
    return;
  }

  return (
    <div className="mt-10 mb-3 flex flex-col items-center justify-center gap-2">
      <img
        className="h-[73px] w-[73px] rounded-2xl shadow-[_-27.26px_5.93px_80.6px_11.85px_rgba(7,33,151,0.8)]"
        src={logo}
        alt="logo"
      />

      <h3 className="text-center text-2xl font-semibold">
        Imagine something. <br /> Anything...
      </h3>
    </div>
  );
};
export default LogoTitle;
