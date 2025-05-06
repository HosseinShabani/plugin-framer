import { GeneratedImage } from "@framer-plugin/shared";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

interface IImage {
  images: GeneratedImage[];
}

const initialState: IImage = {
  images: [],
};

interface Actions {
  handleImages: (images: GeneratedImage[]) => void;

  reset: () => void;
}

export const useImageStore = create<IImage & Actions>()(
  persist(
    immer((set) => ({
      ...initialState,

      handleImages: (list: GeneratedImage[]) =>
        set((state) => {
          state.images = list;
        }),

      reset: () => {
        set(() => initialState);
      },
    })),
    {
      name: "images",
    }
  )
);
