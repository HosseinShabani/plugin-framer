import { IMAGE_COUNT } from "@/constants/image-count";
import { generateImages } from "@/services/apiService";
import { GeneratedImage, WebsiteAnalysis } from "@framer-plugin/shared";
import { useState } from "react";
import { Button, Card } from "../ui";
import { ImageGallery } from "../ImageGallery";
import { useAppContext } from "@/hooks";
import { ASPECT_RATIO } from "@/constants/aspect-ratio";
import { OUTPUT_FORMAT } from "@/constants/output-format";
import { MEGAPIXELS } from "@/constants/megapixels";
import { IMAGE_STYLES } from "@/constants/image-styles";

type ImageGeneratorTabProps = {
  generatedImages: GeneratedImage[];
  setGeneratedImages: (data: GeneratedImage[]) => void;
  analysis: WebsiteAnalysis | null;
};

const ImageGeneratorTab: React.FC<ImageGeneratorTabProps> = ({
  analysis,
  generatedImages,
  setGeneratedImages,
}) => {
  const { setActiveTab } = useAppContext();
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [data, setData] = useState({
    aspectRatio: ASPECT_RATIO[0],
    imageCount: IMAGE_COUNT[3],
    outputFormat: OUTPUT_FORMAT[0],
    megapixels: MEGAPIXELS[0],
    go_fast: 1,
    imageStyle: IMAGE_STYLES[0],
    // imageStyle: "",
    userRequests: "",
  });

  const handleChangeData = (e: any) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  if (!analysis) {
    return (
      <>
        <div className="rounded border border-red-100 bg-red-50 p-2 text-sm text-red-500">
          No website analysis found. Please run the analysis first.
        </div>

        <Button
          variant="primary"
          className="mt-4"
          onClick={() => {
            setActiveTab(1);
          }}
        >
          Back to Analysis
        </Button>
      </>
    );
  }

  const handleGenerate = async () => {
    setIsGenerating(true);
    setError(null);

    try {
      const images = await generateImages(
        analysis,
        data.userRequests,
        data.imageStyle,

        Boolean(data.go_fast),
        data.megapixels,
        Number(data.imageCount),
        data.aspectRatio,
        data.outputFormat
      );

      // Save images to local storage
      setGeneratedImages(images);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to generate images");
    } finally {
      setIsGenerating(false);
    }
  };
  return (
    <>
      <Card title="Generate Images" className="mb-4">
        <div className="space-y-3">
          <div>
            <label htmlFor="imageCount" className="mb-1 block text-xs font-medium">
              Number of Images
            </label>
            <select
              id="imageCount"
              name="imageCount"
              className="bg-framer-bg w-full rounded border border-gray-300 px-2 py-1 text-sm"
              value={data.imageCount}
              onChange={handleChangeData}
              disabled={isGenerating}
            >
              {IMAGE_COUNT.map((count) => {
                return (
                  <option key={count} value={count}>
                    {count} Image
                  </option>
                );
              })}
            </select>
          </div>

          <div>
            <label htmlFor="aspectRatio" className="mb-1 block text-xs font-medium">
              Aspect Ratio
            </label>
            <select
              id="aspectRatio"
              name="aspectRatio"
              className="bg-framer-bg w-full rounded border border-gray-300 px-2 py-1 text-sm"
              value={data.aspectRatio}
              onChange={handleChangeData}
              disabled={isGenerating}
            >
              {ASPECT_RATIO.map((ar) => {
                return (
                  <option key={ar} value={ar}>
                    {ar}
                  </option>
                );
              })}
            </select>
          </div>

          <div>
            <label htmlFor="outputFormat" className="mb-1 block text-xs font-medium">
              Output Format
            </label>
            <select
              id="outputFormat"
              name="outputFormat"
              className="bg-framer-bg w-full rounded border border-gray-300 px-2 py-1 text-sm"
              value={data.outputFormat}
              onChange={handleChangeData}
              disabled={isGenerating}
            >
              {OUTPUT_FORMAT.map((format) => {
                return (
                  <option key={format} value={format}>
                    {format}
                  </option>
                );
              })}
            </select>
          </div>

          <div>
            <label htmlFor="megapixels" className="mb-1 block text-xs font-medium">
              Megapixels
            </label>
            <select
              id="megapixels"
              name="megapixels"
              className="bg-framer-bg w-full rounded border border-gray-300 px-2 py-1 text-sm"
              value={data.megapixels}
              onChange={handleChangeData}
              disabled={isGenerating}
            >
              {MEGAPIXELS.map((pixel) => {
                return (
                  <option key={pixel} value={pixel}>
                    {pixel}
                  </option>
                );
              })}
            </select>
          </div>

          <div>
            <label htmlFor="go_fast" className="mb-1 block text-xs font-medium">
              Criteria
            </label>
            <select
              id="go_fast"
              name="go_fast"
              className="bg-framer-bg w-full rounded border border-gray-300 px-2 py-1 text-sm"
              value={String(data.go_fast)}
              onChange={handleChangeData}
              disabled={isGenerating}
            >
              <option value={1}>Fast</option>
              <option value={0}>Quality</option>
            </select>
          </div>

          <div>
            <label htmlFor="imageStyle" className="mb-1 block text-xs font-medium">
              Style
            </label>
            <select
              id="imageStyle"
              name="imageStyle"
              className="bg-framer-bg w-full rounded border border-gray-300 px-2 py-1 text-sm"
              value={data.imageStyle}
              onChange={handleChangeData}
              disabled={isGenerating}
            >
              {IMAGE_STYLES.map((st) => {
                return (
                  <option key={st} value={st}>
                    {st}
                  </option>
                );
              })}
            </select>
          </div>

          {/* <div>
            <label htmlFor="imageStyle" className="mb-1 block text-xs font-medium">
              Style (Optional)
            </label>
            <input
              id="imageStyle"
              name="imageStyle"
              type="text"
              className="w-full rounded border border-gray-300 px-2 py-1 text-sm"
              placeholder="e.g., Minimalist, Vibrant, Corporate..."
              value={data.imageStyle}
              onChange={handleChangeData}
              disabled={isGenerating}
            />
          </div> */}

          <div>
            <label htmlFor="userRequests" className="mb-1 block text-xs font-medium">
              Additional Requirements (Optional)
            </label>
            <textarea
              id="userRequests"
              name="userRequests"
              className="w-full rounded border border-gray-300 px-2 py-1 text-sm"
              placeholder="Describe any specific requirements for the images..."
              rows={3}
              value={data.userRequests}
              onChange={handleChangeData}
              disabled={isGenerating}
            />
          </div>

          {error && (
            <div className="rounded border border-red-100 bg-red-50 p-2 text-xs text-red-500">
              {error}
            </div>
          )}

          <Button variant="primary" fullWidth isLoading={isGenerating} onClick={handleGenerate}>
            {isGenerating ? "Generating..." : "Generate Images"}
          </Button>
        </div>
      </Card>

      <ImageGallery images={generatedImages} />
    </>
  );
};

export default ImageGeneratorTab;
