import { AIModel } from "@/types/ai-model";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist } from "zustand/middleware";

interface State {
  show: boolean;
  ai: AIModel | null;
}

const initialState: State = {
  show: false,
  ai: null,
};

interface Actions {
  toggle: () => void;
  setShow: (val: boolean) => void;
  setAi: (val: any) => void;
  reset: () => void;
}

export const useAiModalStore = create<State & Actions>()(
  persist(
    immer((set) => ({
      ...initialState,

      toggle: () =>
        set((state) => {
          state.show = !state.show;
        }),
      setShow: (val: boolean) =>
        set((state) => {
          state.show = val;
        }),
      setAi: (val: AIModel) =>
        set((state) => {
          state.ai = val;
        }),
      reset: () => {
        set(() => initialState);
      },
    })),
    {
      name: "ai",
    }
  )
);
