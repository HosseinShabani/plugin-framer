import { framer } from "framer-plugin";
import { useState, useEffect } from "react";
import { WebsiteAnalysis, GeneratedImage } from "@framer-plugin/shared";
import { Button } from "./components/Button";
import { Analysis } from "./components/Analysis";
import { ImageGenerator } from "./components/ImageGenerator";
import { ImageGallery } from "./components/ImageGallery";
import { analyzeWebsiteText } from "./services/apiService";
import {
  getAnalysis,
  saveAnalysis,
  getGeneratedImages,
  saveGeneratedImages,
} from "./utils/storage";
import "./App.css";

// Set up plugin UI
framer.showUI({
  position: "top right",
  width: 300,
  height: 700,
});

/**
 * Custom hook to manage plugin storage
 */
function usePluginStorage<T>(
  key: string,
  initialData: T | null = null
): [T | null, (data: T) => void] {
  const [data, setData] = useState<T | null>(initialData);

  // Load data from storage on mount
  useEffect(() => {
    if (key === "analysis") {
      const savedAnalysis = getAnalysis();
      if (savedAnalysis) setData(savedAnalysis as T);
    } else if (key === "images") {
      const savedImages = getGeneratedImages();
      if (savedImages.length > 0) setData(savedImages as T);
    }
  }, [key]);

  // Save data to storage when it changes
  const saveData = (newData: T) => {
    if (key === "analysis") {
      saveAnalysis(newData as WebsiteAnalysis);
    } else if (key === "images") {
      saveGeneratedImages(newData as GeneratedImage[]);
    }
    setData(newData);
  };

  return [data, saveData];
}

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
  // State for text content and analysis
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [allTexts, setAllTexts] = useState<string[]>([]);
  const [showTexts, setShowTexts] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Stored data
  const [websiteAnalysis, setWebsiteAnalysis] =
    usePluginStorage<WebsiteAnalysis>("analysis");
  const [generatedImages, setGeneratedImages] = usePluginStorage<
    GeneratedImage[]
  >("images", []);

  // UI State
  const [activeTab, setActiveTab] = useState<"analysis" | "generator">(
    websiteAnalysis ? "generator" : "analysis"
  );

  /**
   * Analyze the website content
   */
  const handleAnalyzeWebsite = async () => {
    setIsAnalyzing(true);
    setError(null);

    try {
      // Collect all text content
      const texts = await findAllTexts();
      setAllTexts(texts);

      if (texts.length === 0) {
        setError(
          "No text content found in your project. Please add some text first."
        );
        setIsAnalyzing(false);
        return;
      }

      // Send texts to the backend for analysis
      const analysis = await analyzeWebsiteText(texts);

      // Save the analysis result
      setWebsiteAnalysis(analysis);

      // Switch to the generator tab
      setActiveTab("generator");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to analyze website"
      );
    } finally {
      setIsAnalyzing(false);
    }
  };

  /**
   * Handle image generation
   */
  const handleImagesGenerated = (images: GeneratedImage[]) => {
    setGeneratedImages(images);
  };

  return (
    <main className="p-4 flex flex-col h-full">
      <header className="mb-4">
        <h1 className="text-lg font-bold mb-1">AI Image Generator</h1>
        <p className="text-sm text-gray-600">
          Generate on-brand images for your Framer website based on AI analysis
        </p>
      </header>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-100 rounded text-red-700 text-sm">
          {error}
        </div>
      )}

      {!websiteAnalysis ? (
        // Initial analysis state
        <div className="space-y-4">
          <p className="text-sm">
            Click the button below to analyze your website content and generate
            relevant images.
          </p>

          <Button
            variant="primary"
            onClick={handleAnalyzeWebsite}
            isLoading={isAnalyzing}
            fullWidth
          >
            {isAnalyzing ? "Analyzing..." : "Analyze Website Content"}
          </Button>

          {allTexts.length > 0 && (
            <div>
              <button
                className="text-xs text-gray-500 underline"
                onClick={() => setShowTexts(!showTexts)}
              >
                {showTexts ? "Hide detected text" : "Show detected text"}
              </button>

              {showTexts && (
                <div className="mt-2 border rounded p-2 max-h-48 overflow-y-auto">
                  <div className="text-xs font-medium mb-1">
                    Detected Text ({allTexts.length})
                  </div>
                  <ul className="text-xs space-y-1">
                    {allTexts.map((text, i) => (
                      <li key={i} className="truncate">
                        {text}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        // Analysis completed - show tabs and content
        <div className="flex-1 flex flex-col">
          <div className="flex border-b gap-2 mb-4">
            <button
              className={`px-4 py-2 flex-1 text-sm font-medium border-b-2 ${
                activeTab === "analysis"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("analysis")}
            >
              Analysis
            </button>
            <button
              className={`px-4 py-2 flex-1 text-sm font-medium border-b-2 ${
                activeTab === "generator"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("generator")}
            >
              Generator
            </button>
          </div>

          {activeTab === "analysis" ? (
            // Website analysis tab
            <div className="overflow-y-auto flex-1">
              <Analysis analysis={websiteAnalysis} />

              <div className="mt-4 flex justify-center">
                <Button
                  variant="secondary"
                  onClick={handleAnalyzeWebsite}
                  isLoading={isAnalyzing}
                  className="text-sm"
                >
                  {isAnalyzing ? "Analyzing..." : "Re-analyze Content"}
                </Button>
              </div>
            </div>
          ) : (
            // Image generator tab
            <div className="overflow-y-auto flex-1">
              <ImageGenerator
                websiteAnalysis={websiteAnalysis}
                onImagesGenerated={handleImagesGenerated}
              />

              <ImageGallery images={generatedImages || []} />
            </div>
          )}
        </div>
      )}

      <footer className="mt-4 pt-3 border-t text-xs text-center text-gray-500">
        Powered by AI • © {new Date().getFullYear()}
      </footer>
    </main>
  );
}
