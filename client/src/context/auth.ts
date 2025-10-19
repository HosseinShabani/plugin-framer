import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface IAuth {
  isLoggedIn: boolean;
}

const initialState: IAuth = {
  isLoggedIn: false,
};

interface Actions {
  handleIsLoggedIn: (val: boolean) => void;

  reset: () => void;
}

export const useAuthStore = create<IAuth & Actions>()(
  immer((set) => ({
    ...initialState,

    handleIsLoggedIn: (val: boolean) =>
      set((state) => {
        state.isLoggedIn = val;
      }),

    reset: () => {
      set(() => initialState);
    },
  }))
);
