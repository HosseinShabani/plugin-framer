import { AppContext } from "@/context/appContext";
import { useContext } from "react";

export const useAppContext = () => {
  const ctx = useContext(AppContext);

  if (!ctx) {
    throw new Error("Error in AppContext");
  }

  return ctx;
};
