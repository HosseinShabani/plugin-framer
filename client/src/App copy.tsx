import { framer } from "framer-plugin";
import { useState, useEffect } from "react";
import { WebsiteAnalysis, GeneratedImage } from "@framer-plugin/shared";
import { ImageGenerator } from "./components/ImageGenerator";
import { ImageGallery } from "./components/ImageGallery";
import AnalysisTab from "./components/tabs/AnalysisTab";
import { ANALYSIS_KEY, IMAGE_KEY, TEXT_KEY } from "./constants/storage-keys";
import { analyzeWebsiteText } from "./services/apiService";
import { Button, LoadingSpinner } from "./components/ui";
import { TAB_ITEMS } from "./constants/tabs";
import TextList from "./components/TextList";

// Set up plugin UI
framer.showUI({
  position: "top right",
  width: 300,
  height: 700,
});

/**
 * Custom hook to manage plugin storage
 */
function usePluginStorage<T>(key: string, initialData: T): [T, (data: T) => void, boolean, string] {
  const [data, setData] = useState<T>(initialData);
  const [projectName, setProjectName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const loadData = async () => {
    setLoading(true);
    try {
      let name = projectName;
      if (name === "") {
        name = await getProjectInfo();
        setProjectName(name);
      }

      let items = initialData;
      const stored = localStorage.getItem(key);
      if (stored) {
        items = JSON.parse(stored);
      }

      setData(items);
    } catch (error) {
      setError("Error retrieving items from storage");
      console.error("Error retrieving items from storage:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [key]);

  const saveData = (newData: T) => {
    try {
      localStorage.setItem(key, JSON.stringify(newData));
    } catch (error) {
      setError("Error saving items into storage");
      console.error("Error saving:", error);
    }
    setData(newData);
  };

  return [data, saveData, loading, error];
}

const getProjectInfo = async () => {
  return framer.getProjectInfo().then((res) => {
    return res.name + " " + res.id;
  });
};

/**
 * Find all text content in the Framer project
 */
const findAllTexts = async (): Promise<string[]> => {
  try {
    const textSet = new Set<string>();

    // Get all text nodes
    const textNodes = await framer.getNodesWithType("TextNode");
    textNodes.forEach((item) => {
      if (item.name && item.name.trim()) {
        textSet.add(item.name);
      }
    });

    // Get content from collections
    const collections = await framer.getCollections();
    for (const col of collections) {
      const items = await col.getItems();
      for (const item of items) {
        for (const key of Object.keys(item.fieldData)) {
          const field = item.fieldData[key];
          if (field.type === "string" && field.value && field.value.trim()) {
            textSet.add(field.value);
          }
        }
      }
    }

    return Array.from(textSet);
  } catch (error) {
    console.error("Error finding texts:", error);
    return [];
  }
};

export function App() {
  // UI State
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState(TAB_ITEMS[0].id);

  // Stored data
  const [allTexts, setAllTexts, fetchingText] = usePluginStorage<string[]>(TEXT_KEY, []);
  const [analysis, setAnalysis, fetchingAnalysis] = usePluginStorage<WebsiteAnalysis | null>(
    ANALYSIS_KEY,
    null
  );
  const [generatedImages, setGeneratedImages, fetchingImage] = usePluginStorage<GeneratedImage[]>(
    IMAGE_KEY,
    []
  );

  const handleAnalyzeWebsite = async () => {
    setLoading(true);
    setError(null);

    try {
      // Collect all text content
      const texts = await findAllTexts();
      setAllTexts(texts);

      if (texts.length === 0) {
        setError("No text content found in your project. Please add some text first.");
        setLoading(false);
        return;
      }

      // Send texts to the backend for analysis
      const analysis = await analyzeWebsiteText(texts);

      // Save the analysis result
      setAnalysis(analysis);

      // Switch to the generator tab
      setActiveTab(2);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to analyze website");
    } finally {
      setLoading(false);
    }
  };

  const handleImagesGenerated = (images: GeneratedImage[]) => {
    setGeneratedImages(images);
  };

  return (
    <main className="flex h-full flex-col p-4">
      <header className="mb-4">
        <h1 className="divider mb-1 text-lg font-bold">AI Image Generator</h1>
        <p className="text-framer-text-tertiary text-sm">
          Generate on-brand images for your Framer website based on AI analysis
        </p>
      </header>

      {error && (
        <div className="mb-4 rounded border border-red-100 bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {fetchingAnalysis || fetchingImage || fetchingText ? (
        <LoadingSpinner />
      ) : (
        <>
          {!analysis ? (
            // Initial state
            <div className="space-y-4">
              <p className="text-sm">
                Click the button below to analyze your website content and generate relevant images.
              </p>

              <Button
                variant="primary"
                onClick={handleAnalyzeWebsite}
                isLoading={loading}
                fullWidth
              >
                {loading ? "Analyzing..." : "Analyze Website Content"}
              </Button>
            </div>
          ) : (
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
                  analysis={analysis}
                  loading={loading}
                  handleAnalyzeWebsite={handleAnalyzeWebsite}
                />
              ) : (
                // Image generator tab
                <div className="flex-1 overflow-y-auto">
                  <ImageGenerator
                    websiteAnalysis={analysis}
                    onImagesGenerated={handleImagesGenerated}
                  />

                  <ImageGallery images={generatedImages || []} />
                </div>
              )}
            </div>
          )}

          <TextList texts={allTexts} />
        </>
      )}

      <footer className="mt-4 w-full border-t pt-3 text-center text-xs text-gray-500">
        Powered by AI • © {new Date().getFullYear()}
      </footer>
    </main>
  );
}
