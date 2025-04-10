import { AppContextType } from "@/types/app-context";
import { createContext } from "react";

export const AppContext = createContext<AppContextType | null>(null);
