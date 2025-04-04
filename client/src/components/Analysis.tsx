import React from "react";
import { WebsiteAnalysis } from "@framer-plugin/shared";
import { Card, ColorSwatch } from "./Card";

interface AnalysisProps {
  analysis: WebsiteAnalysis;
  isLoading?: boolean;
}

export const Analysis: React.FC<AnalysisProps> = ({
  analysis,
  isLoading = false,
}) => {
  if (isLoading) {
    return (
      <div className="space-y-4 animate-pulse">
        <div className="h-5 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <section>
        <Card title="Website Overview">
          <div className="space-y-3">
            <div>
              <h4 className="text-xs font-semibold text-gray-500 uppercase">
                Theme
              </h4>
              <p className="text-sm">{analysis.theme}</p>
            </div>
            <div>
              <h4 className="text-xs font-semibold text-gray-500 uppercase">
                Type
              </h4>
              <p className="text-sm">{analysis.type}</p>
            </div>
            <div>
              <h4 className="text-xs font-semibold text-gray-500 uppercase">
                Purpose
              </h4>
              <p className="text-sm">{analysis.purpose}</p>
            </div>
            <div>
              <h4 className="text-xs font-semibold text-gray-500 uppercase">
                Target Audience
              </h4>
              <p className="text-sm">{analysis.targetAudience}</p>
            </div>
          </div>
        </Card>
      </section>

      <section>
        <Card title="Image Needs">
          <ul className="list-disc pl-5 text-sm space-y-1">
            {analysis.imageNeeds.map((need, i) => (
              <li key={i}>{need}</li>
            ))}
          </ul>
        </Card>
      </section>

      <section>
        <Card title="Style">
          <div>
            <h4 className="text-xs font-semibold text-gray-500 uppercase mb-2">
              Color Palette
            </h4>
            <div className="flex flex-wrap gap-2 mb-3">
              {analysis.colorPalette.map((color, i) => (
                <ColorSwatch key={i} color={color} label={color} />
              ))}
            </div>

            <h4 className="text-xs font-semibold text-gray-500 uppercase mb-2">
              Recommendations
            </h4>
            <p className="text-sm">{analysis.styleRecommendations}</p>
          </div>
        </Card>
      </section>
    </div>
  );
};
