import { AUTH_STEPS } from "@/constants/auth";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface IAuth {
  step: keyof typeof AUTH_STEPS;
  email: string;
  otp: string;

  isLoggedIn: boolean;
}

const initialState: IAuth = {
  step: "method",
  email: "",
  otp: "",
  isLoggedIn: false,
};

interface Actions {
  handleEmail: (email: string) => void;
  handleStep: (step: keyof typeof AUTH_STEPS) => void;
  handleOtp: (otp: string) => void;
  handleIsLoggedIn: (val: boolean) => void;

  reset: () => void;
}

export const useAuthStore = create<IAuth & Actions>()(
  immer((set) => ({
    ...initialState,

    handleEmail: (email: string) =>
      set((state) => {
        state.email = email;
      }),
    handleOtp: (otp: string) =>
      set((state) => {
        state.otp = otp;
      }),
    handleIsLoggedIn: (val: boolean) =>
      set((state) => {
        state.isLoggedIn = val;
      }),
    handleStep: (step: keyof typeof AUTH_STEPS) =>
      set((state) => {
        state.step = step;
      }),

    reset: () => {
      set(() => initialState);
    },
  }))
);
