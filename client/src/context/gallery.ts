// import { GeneratedImage } from "@framer-plugin/shared";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { IGalleryImage } from "@/types/gallery-image";

interface State {
  // image: GeneratedImage | null;
  image: IGalleryImage | null;
}

const initialState: State = {
  image: null,
};

interface Actions {
  setImage: (val: IGalleryImage | null) => void;

  reset: () => void;
}

export const useGalleryStore = create<State & Actions>()(
  immer((set) => ({
    ...initialState,

    setImage: (val: IGalleryImage | null) =>
      set((state) => {
        state.image = val;
      }),

    reset: () => {
      set(() => initialState);
    },
  }))
);
