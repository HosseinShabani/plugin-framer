export type AppContextType = {
  projectName: string | null;
  setProjectName: (val: string | null) => void;
  activeTab: number;
  setActiveTab: (val: number) => void;
};
