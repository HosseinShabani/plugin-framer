import { AspectRatioType } from "@/types/aspect-ratio";
import { ImageStyleType } from "@/types/image-styles";
import { OutPutFormaType } from "@/types/output-format";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

interface IImageConfig {
  text: string;
  go_fast: boolean;
  // megapixels: string;
  num_outputs: number;
  aspect_ratio: AspectRatioType;
  output_format: OutPutFormaType;
  style: ImageStyleType;
}

const initialState: IImageConfig = {
  text: "",
  go_fast: true,
  num_outputs: 1,
  aspect_ratio: "1:1",
  output_format: "jpg",
  style: "Illustration",
};

interface Actions {
  handleText: (text: string) => void;
  handleGoFast: (go: boolean) => void;
  handleNumOutPut: (num: number) => void;
  handleOutPutFormat: (format: OutPutFormaType) => void;
  handleAspectRatio: (ar: AspectRatioType) => void;
  handleStyle: (style: ImageStyleType) => void;
  reset: () => void;
}

export const useImageConfigStore = create<IImageConfig & Actions>()(
  persist(
    immer((set) => ({
      ...initialState,

      handleText: (text: string) =>
        set((state) => {
          state.text = text;
        }),
      handleGoFast: (go: boolean) =>
        set((state) => {
          state.go_fast = go;
        }),
      handleNumOutPut: (num: number) =>
        set((state) => {
          state.num_outputs = num;
        }),
      handleOutPutFormat: (format: OutPutFormaType) =>
        set((state) => {
          state.output_format = format;
        }),
      handleAspectRatio: (ar: AspectRatioType) =>
        set((state) => {
          state.aspect_ratio = ar;
        }),
      handleStyle: (style: ImageStyleType) =>
        set((state) => {
          state.style = style;
        }),

      reset: () => {
        set(() => initialState);
      },
    })),
    {
      name: "image-config",
    }
  )
);
