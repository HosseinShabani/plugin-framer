import { framer } from "framer-plugin";
import { useEffect } from "react";
import AnalysisTab from "./components/tabs/AnalysisTab";

import { LoadingSpinner } from "@/components/ui";
import { TAB_ITEMS } from "@/constants/tabs";
import { useAppContext, usePluginStorage } from "@/hooks";
import ImageGeneratorTab from "./components/tabs/ImageGeneratorTab";
import { ANALYSIS_KEY, IMAGE_KEY, TEXT_KEY } from "./constants/storage-keys";
import { GeneratedImage, WebsiteAnalysis } from "@framer-plugin/shared";

// Set up plugin UI
framer.showUI({
  position: "top right",
  width: 300,
  height: 700,
});

const getProjectInfo = async () => {
  return framer.getProjectInfo().then((res) => {
    return res.name + " " + res.id;
  });
};

export function App() {
  const { projectName, setProjectName } = useAppContext();
  useEffect(() => {
    getProjectInfo().then((res) => {
      setProjectName(res);
    });
  }, []);

  if (!projectName) {
    return <LoadingSpinner />;
  }

  return <AISection />;
}

const AISection = () => {
  const { activeTab, setActiveTab, projectName } = useAppContext();

  const [allTexts, setAllTexts] = usePluginStorage<string[]>(`${projectName}-${TEXT_KEY}`, []);
  const [analysis, setAnalysis] = usePluginStorage<WebsiteAnalysis | null>(
    `${projectName}-${ANALYSIS_KEY}`,
    null
  );
  const [generatedImages, setGeneratedImages] = usePluginStorage<GeneratedImage[]>(
    `${projectName}-${IMAGE_KEY}`,
    []
  );
  return (
    <main className="flex h-full flex-col p-4">
      <header className="mb-4">
        <h1 className="divider mb-1 text-lg font-bold">AI Image Generator</h1>
        <p className="text-framer-text-tertiary text-sm">
          Generate on-brand images for your Framer website based on AI analysis
        </p>
      </header>

      <div className="flex w-full flex-1 flex-col">
        <div className="mb-4 flex gap-2 border-b">
          {TAB_ITEMS.map((tab) => {
            return (
              <button
                key={tab.id}
                className={`flex-1 cursor-pointer border-b-2 px-4 py-2 text-sm font-medium ${
                  activeTab === tab.id
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.title}
              </button>
            );
          })}
        </div>

        {activeTab === 1 ? (
          <AnalysisTab
            allTexts={allTexts}
            analysis={analysis}
            setAllTexts={setAllTexts}
            setAnalysis={setAnalysis}
          />
        ) : (
          <ImageGeneratorTab
            generatedImages={generatedImages}
            analysis={analysis}
            setGeneratedImages={setGeneratedImages}
          />
        )}
      </div>

      <footer className="mt-4 w-full border-t pt-3 text-center text-xs text-gray-500">
        Powered by AI • © {new Date().getFullYear()}
      </footer>
    </main>
  );
};
