import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface State {
  aspect_ratio: string;
  output_format: string;
  max_images: number;
  image_input: File[];
  creditPerImage: number;
}

const initialState: State = {
  aspect_ratio: "match_input_image",
  output_format: "jpg",
  max_images: 1,
  image_input: [],
  creditPerImage: 4,
};

interface Actions {
  handleAspectRatio: (aspectRatio: string) => void;
  handleOutputFormat: (outputFormat: string) => void;
  handleMaxImages: (maxImages: number) => void;
  handleImageInput: (imageInput: File[]) => void;
  reset: () => void;
}

export const useNanoBananaStore = create<State & Actions>()(
  immer((set) => ({
    ...initialState,

    handleAspectRatio: (aspectRatio: string) =>
      set((state) => {
        state.aspect_ratio = aspectRatio;
      }),
    handleOutputFormat: (outputFormat: string) =>
      set((state) => {
        state.output_format = outputFormat;
      }),

    handleMaxImages: (maxImages: number) =>
      set((state) => {
        state.max_images = maxImages;
      }),

    handleImageInput: (imageInput: File[]) =>
      set((state) => {
        state.image_input = imageInput;
      }),
    reset: () => {
      set(() => initialState);
    },
  }))
);
