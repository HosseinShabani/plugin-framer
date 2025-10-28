import NanoBanana from "@/components/ai-models/nano-banana";
import { IAiModel } from "@/types/ai-model";
import Img1 from "@/assets/img/ai-models/nano-banana.jpg";
import Img2 from "@/assets/img/ai-models/see-dream.jpg";
import SeeDream4 from "@/components/ai-models/see-dream-4";

export const AI_NAME = {
  NANO_BANANA: "Nano Banana",
  SEE_DREAM_4: "Seedream 4",
};

export const AI_MODELS: IAiModel[] = [
  {
    name: AI_NAME.NANO_BANANA,
    firm: "Google",
    badges: ["Standard", "Fast"],
    img: Img1,
  },
  {
    name: AI_NAME.SEE_DREAM_4,
    firm: "bytedance",
    badges: ["Standard"],
    img: Img2,
  },
];

export const AI_MODEL_COMPONENTS = {
  [AI_NAME.NANO_BANANA]: NanoBanana,
  [AI_NAME.SEE_DREAM_4]: SeeDream4,
};
