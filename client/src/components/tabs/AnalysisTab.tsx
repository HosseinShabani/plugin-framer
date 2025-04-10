import { WebsiteAnalysis } from "@framer-plugin/shared";

import { Button, Card, ColorSwatch, LoadingSpinner } from "../ui";
import { framer } from "framer-plugin";
import React, { useState } from "react";
import { useAppContext } from "@/hooks";
import { analyzeWebsiteText } from "@/services/apiService";
import TextList from "../TextList";

const InfoItem = ({
  title,
  value,
  divide = true,
}: {
  title: string;
  value?: any;
  divide?: boolean;
}) => {
  return (
    <div>
      <h4 className="mb-1 text-xs font-semibold text-gray-500 uppercase">{title}</h4>
      <div className="text-sm">{value ?? "-"}</div>
      {divide && <hr className="border-framer-color-divider mx-auto my-5 w-4/5" />}
    </div>
  );
};

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

type AnalysisTabProps = {
  allTexts: string[];
  setAllTexts: (data: string[]) => void;
  setAnalysis: (data: WebsiteAnalysis | null) => void;
  analysis: WebsiteAnalysis | null;
};

const AnalysisTab: React.FC<AnalysisTabProps> = ({
  allTexts,
  setAllTexts,
  setAnalysis,
  analysis,
}) => {
  const { setActiveTab } = useAppContext();
  // UI State
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
      let analysis = await analyzeWebsiteText(texts);

      if (Array.isArray(analysis?.targetAudience)) {
        analysis = {
          ...analysis,
          targetAudience: analysis?.targetAudience.join(", "),
        };
      }

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

  if (loading) {
    return <LoadingSpinner title="Loading Analysis..." />;
  }
  if (!analysis) {
    return (
      <div className="space-y-4">
        <p className="text-sm">
          Click the button below to analyze your website content and generate relevant images.
        </p>

        <Button variant="primary" onClick={handleAnalyzeWebsite} isLoading={loading} fullWidth>
          {loading ? "Analyzing..." : "Analyze Website Content"}
        </Button>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto">
      {error && (
        <div className="mb-4 rounded border border-red-100 bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      )}
      <div className="space-y-4">
        <section>
          <Card title="Website Overview">
            <div className="space-y-3">
              <InfoItem title="Theme" value={analysis.theme} />
              <InfoItem title="Type" value={analysis.type} />
              <InfoItem title="Purpose" value={analysis.purpose} />
              <InfoItem title="Target Audience" value={analysis.targetAudience} divide={false} />
            </div>
          </Card>
        </section>

        <section>
          <Card title="Image Needs">
            <ul className="list-disc space-y-1 pl-5 text-sm">
              {analysis.imageNeeds.map((need, i) => (
                <li key={i}>{need}</li>
              ))}
            </ul>
          </Card>
        </section>

        <section>
          <Card title="Style">
            <InfoItem
              title="Color Palette"
              value={
                <div className="mt-2 mb-3 flex flex-wrap gap-3">
                  {analysis.colorPalette.map((color, i) => (
                    <ColorSwatch key={i} color={color} label={color} />
                  ))}
                </div>
              }
            />

            <InfoItem
              title="Recommendations"
              value={analysis.styleRecommendations}
              divide={false}
            />
          </Card>
        </section>
      </div>

      <div className="mt-4 flex justify-center">
        <Button onClick={handleAnalyzeWebsite} isLoading={loading} className="text-sm" fullWidth>
          Re-analyze Content
        </Button>
      </div>

      <TextList texts={allTexts} />
    </div>
  );
};

export default AnalysisTab;
