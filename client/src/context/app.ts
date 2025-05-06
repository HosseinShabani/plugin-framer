import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

interface IApp {
  sectionId: number;
  loading: boolean;
  error: string;
}

const initialState: IApp = {
  sectionId: 1,
  loading: false,
  error: "",
};

interface Actions {
  handleSection: (id: number) => void;
  handleError: (error: string) => void;
  toggleLoading: () => void;

  reset: () => void;
}

export const useAppStore = create<IApp & Actions>()(
  persist(
    immer((set) => ({
      ...initialState,

      toggleLoading: () =>
        set((state) => {
          state.loading = !state.loading;
        }),
      handleError: (error: string) =>
        set((state) => {
          state.error = error;
        }),
      handleSection: (id: number) =>
        set((state) => {
          state.sectionId = id;
        }),

      reset: () => {
        set(() => initialState);
      },
    })),
    {
      name: "app",
    }
  )
);
