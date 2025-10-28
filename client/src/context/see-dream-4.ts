import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface State {
  aspect_ratio: string;
  size: string;
  sequential_image_generation: string;
  max_images: number;
  width: number;
  height: number;
  enhance_prompt: boolean;
  image_input: File[];
  creditPerImage: number;
}

const initialState: State = {
  aspect_ratio: "match_input_image",
  sequential_image_generation: "disabled",
  size: "2K",
  max_images: 1,
  width: 2048,
  height: 2048,
  enhance_prompt: true,
  image_input: [],
  creditPerImage: 3.04,
};

interface Actions {
  handleAspectRatio: (aspectRatio: string) => void;
  handleSize: (size: string) => void;
  handleMaxImages: (maxImages: number) => void;
  handleWidth: (width: number) => void;
  handleHeight: (height: number) => void;
  handleEnhancePrompt: (enhancePrompt: boolean) => void;
  handleSequentialImageGeneration: (sequentialImageGeneration: string) => void;
  handleImageInput: (imageInput: File[]) => void;
  reset: () => void;
}

export const useSeeDream4Store = create<State & Actions>()(
  immer((set) => ({
    ...initialState,

    handleAspectRatio: (aspectRatio: string) =>
      set((state) => {
        state.aspect_ratio = aspectRatio;
      }),
    handleSize: (size: string) =>
      set((state) => {
        state.size = size;
      }),
    handleMaxImages: (maxImages: number) =>
      set((state) => {
        state.max_images = maxImages;
      }),
    handleWidth: (width: number) =>
      set((state) => {
        state.width = width;
      }),
    handleHeight: (height: number) =>
      set((state) => {
        state.height = height;
      }),
    handleEnhancePrompt: (enhancePrompt: boolean) =>
      set((state) => {
        state.enhance_prompt = enhancePrompt;
      }),
    handleSequentialImageGeneration: (sequentialImageGeneration: string) =>
      set((state) => {
        state.sequential_image_generation = sequentialImageGeneration;
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
