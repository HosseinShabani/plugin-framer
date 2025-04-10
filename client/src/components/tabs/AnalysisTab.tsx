import { WebsiteAnalysis } from "@framer-plugin/shared";

import { Button, Card, ColorSwatch, LoadingSpinner } from "../ui";

type AnalysisTabProps = {
  analysis: WebsiteAnalysis;
  handleAnalyzeWebsite: () => void;
  loading: boolean;
};

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

const AnalysisTab: React.FC<AnalysisTabProps> = ({ analysis, handleAnalyzeWebsite, loading }) => {
  if (loading) {
    return <LoadingSpinner title="Loading Analysis..." />;
  }
  return (
    <div className="flex-1 overflow-y-auto">
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
    </div>
  );
};

export default AnalysisTab;
