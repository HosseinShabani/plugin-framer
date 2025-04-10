import { useState } from "react";
import { AppContext } from "./appContext";
import { TAB_ITEMS } from "@/constants/tabs";

const AppState = ({ children }: { children: React.ReactNode }) => {
  const [projectName, setProjectName] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState(TAB_ITEMS[0].id);

  return (
    <AppContext.Provider
      value={{
        projectName,
        setProjectName,

        activeTab,
        setActiveTab,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppState;
