import { ILicense } from "@/types/license";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

interface State {
  license: ILicense | null;
}

const initialState: State = {
  license: null,
};

interface Actions {
  handleLicense: (val: ILicense | null) => void;
  reset: () => void;
}

export const useAuthStore = create<State & Actions>()(
  persist(
    immer((set) => ({
      ...initialState,

      handleLicense: (val: ILicense | null) =>
        set((state) => {
          state.license = val;
        }),
      reset: () => {
        set(() => initialState);
      },
    })),
    {
      name: "auth",
    }
  )
);
