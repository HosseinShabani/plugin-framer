import { IAiModel } from "@/types/ai-model";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { createJSONStorage, persist } from "zustand/middleware";
import { AI_MODELS } from "@/constants/ai";

interface State {
  aiModel: IAiModel;
  showModal: boolean;
}

const initialState: State = {
  aiModel: AI_MODELS[0],
  showModal: false,
};

interface Actions {
  handleAiModel: (model: IAiModel) => void;
  toggleModal: () => void;
  reset: () => void;
}

export const useAiStore = create<State & Actions>()(
  persist(
    immer((set) => ({
      ...initialState,

      handleAiModel: (model: IAiModel) =>
        set((state) => {
          state.aiModel = model;
        }),
      toggleModal: () =>
        set((state) => {
          state.showModal = !state.showModal;
        }),
      reset: () => {
        set(() => initialState);
      },
    })),
    {
      name: "ai-model",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
