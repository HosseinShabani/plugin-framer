// import GiftSection from "@/components/pages/generate/gift-section";
// import UserPromptInput from "@/components/user-prompt-input";
// import LogoTitle from "./logo-title";
// import AiModelModal from "@/components/modals/ai-model-modal";
// import { useShallow } from "zustand/shallow";
// import { useAiStore } from "@/context/ai";
// import { AI_MODEL_COMPONENTS } from "@/constants/ai";
// import { supabase } from "@/utils/supabase";
// import { useEffect } from "react";

import sag from "@/utils/ai.json";

import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";

const SEEDREAM = sag.models[0].inputs;

const GeneratePage = () => {
  console.log(SEEDREAM);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(e.target);
  };

  // const { aiModel } = useAiStore(useShallow((state) => state));

  // const Component = AI_MODEL_COMPONENTS[aiModel.name];

  // useEffect(() => {
  //   console.log(1111);

  //   const fetchAiModels = async () => {
  //     const { data, error } = await supabase.from("ai model").select('*');
  //     console.log(data);
  //     console.log(error);
  //   };
  //   fetchAiModels();
  // }, []);

  return (
    <form onSubmit={handleSubmit}>
      {Object.entries(x[0].inputs.properties).map(([_, property]) => {
        if (property.type === INPUT_TYPE.STRING && property.enum) {
          return (
            <Select
              key={property.title}
              label={property.title}
              fullWidth
              placeholder={property.title}
              helperText={property.description}
              options={property.enum.map((item) => ({
                value: item,
                label: item,
              }))}
              defaultValue={property.default as string}
            />
          );
        }
        return (
          <Input
            key={property.title}
            label={property.title}
            fullWidth
            placeholder={property.title}
            helperText={property.description}
            defaultValue={property.default as string}
            type={['number', 'integer'].includes(property.type) ? 'number' : 'text'}
          />
        );
      })}
    </form>

    // <>
    //   <AiModelModal />

    //   <div className="pb-14">
    //     <LogoTitle />
    //     <GiftSection />
    //     <UserPromptInput />

    //     {/* ai model */}
    //     <div className="mt-[28px]" />
    //     <Component />
    //   </div>
    // </>
  );
};

export default GeneratePage;

export enum INPUT_TYPE {
  INTEGER = "integer",
  STRING = "string",
  NUMBER = "number",
  ARRAY = "array",
  BOOLEAN = "boolean",
}

type GeneralInputType = {
  title: string;
  description: string;
  format?: string;
  default?: string | number | boolean | string[];
  "x-order"?: number;
  nullable?: boolean;
};

type StringInput = GeneralInputType & {
  enum?: string[];
};

type IntegerInput = GeneralInputType & {
  maximum?: number;
  minimum?: number;
};

type NumberInput = GeneralInputType & {
  maximum?: number;
  minimum?: number;
};

type BooleanInput = GeneralInputType;
type ArrayInput = GeneralInputType & {
  items: {
    type?: any;
    format?: any;
  };
};

export type FormInputTypes =
  | (IntegerInput & {
      type: INPUT_TYPE.INTEGER;
    })
  | (StringInput & {
      type: INPUT_TYPE.STRING;
    })
  | (NumberInput & {
      type: INPUT_TYPE.NUMBER;
    })
  | (ArrayInput & {
      type: INPUT_TYPE.ARRAY;
    })
  | (BooleanInput & {
      type: INPUT_TYPE.BOOLEAN;
    });

type ModelInputType = {
  type: string;
  title: string;
  required: string[];
  properties: { [key: string]: FormInputTypes };
};

type ModelType = {
  name: string;
  inputs: ModelInputType;
};

const x: ModelType[] = [
  {
    name: "bytedance/seedream-4",
    inputs: {
      type: "object",
      title: "Input",
      required: ["prompt"],
      properties: {
        size: {
          enum: ["1K", "2K", "4K", "custom"],
          type: INPUT_TYPE.STRING,
          title: "size",
          description:
            "Image resolution: 1K (1024px), 2K (2048px), 4K (4096px), or 'custom' for specific dimensions.",
          default: "2K",
          "x-order": 2,
        },
        width: {
          type: INPUT_TYPE.INTEGER,
          title: "Width",
          default: 2048,
          maximum: 4096,
          minimum: 1024,
          "x-order": 4,
          description:
            "Custom image width (only used when size='custom'). Range: 1024-4096 pixels.",
        },
        height: {
          type: INPUT_TYPE.INTEGER,
          title: "Height",
          default: 2048,
          maximum: 4096,
          minimum: 1024,
          "x-order": 5,
          description:
            "Custom image height (only used when size='custom'). Range: 1024-4096 pixels.",
        },
        prompt: {
          type: INPUT_TYPE.STRING,
          title: "Prompt",
          "x-order": 0,
          description: "Text prompt for image generation",
        },
        max_images: {
          type: INPUT_TYPE.INTEGER,
          title: "Max Images",
          default: 1,
          maximum: 15,
          minimum: 1,
          "x-order": 7,
          description:
            "Maximum number of images to generate when sequential_image_generation='auto'. Range: 1-15. Total images (input + generated) cannot exceed 15.",
        },
        image_input: {
          type: INPUT_TYPE.ARRAY,
          items: {
            type: INPUT_TYPE.STRING,
            format: "uri",
          },
          title: "Image Input",
          default: [],
          "x-order": 1,
          description:
            "Input image(s) for image-to-image generation. List of 1-10 images for single or multi-reference generation.",
        },
        aspect_ratio: {
          enum: ["match_input_image", "1:1", "4:3", "3:4", "16:9", "9:16", "3:2", "2:3", "21:9"],
          type: INPUT_TYPE.STRING,
          title: "aspect_ratio",
          description:
            "Image aspect ratio. Only used when size is not 'custom'. Use 'match_input_image' to automatically match the input image's aspect ratio.",
          default: "match_input_image",
          "x-order": 3,
        },
        enhance_prompt: {
          type: INPUT_TYPE.BOOLEAN,
          title: "Enhance Prompt",
          default: true,
          "x-order": 8,
          description:
            "Enable prompt enhancement for higher quality results, this will take longer to generate.",
        },
        sequential_image_generation: {
          enum: ["disabled", "auto"],
          type: INPUT_TYPE.STRING,
          title: "sequential_image_generation",
          description:
            "Group image generation mode. 'disabled' generates a single image. 'auto' lets the model decide whether to generate multiple related images (e.g., story scenes, character variations).",
          default: "disabled",
          "x-order": 6,
        },
      },
    },
  },
  {
    name: "google/nano-banana",
    inputs: {
      type: "object",
      title: "Input",
      required: ["prompt"],
      properties: {
        prompt: {
          type: INPUT_TYPE.STRING,
          title: "Prompt",
          "x-order": 0,
          description: "A text description of the image you want to generate",
        },
        image_input: {
          type: INPUT_TYPE.ARRAY,
          items: {
            type: INPUT_TYPE.STRING,
            format: "uri",
          },
          title: "Image Input",
          default: [],
          "x-order": 1,
          description: "Input images to transform or use as reference (supports multiple images)",
        },
        aspect_ratio: {
          enum: [
            "match_input_image",
            "1:1",
            "2:3",
            "3:2",
            "3:4",
            "4:3",
            "4:5",
            "5:4",
            "9:16",
            "16:9",
            "21:9",
          ],
          type: INPUT_TYPE.STRING,
          title: "aspect_ratio",
          description: "Aspect ratio of the generated image",
          default: "match_input_image",
          "x-order": 2,
        },
        output_format: {
          enum: ["jpg", "png"],
          type: INPUT_TYPE.STRING,
          title: "output_format",
          description: "Format of the output image",
          default: "jpg",
          "x-order": 3,
        },
      },
    },
  },
  {
    name: "black-forest-labs/flux-dev",
    inputs: {
      type: "object",
      title: "Input",
      required: ["prompt"],
      properties: {
        seed: {
          type: INPUT_TYPE.INTEGER,
          title: "Seed",
          "x-order": 7,
          description: "Random seed. Set for reproducible generation",
        },
        image: {
          type: INPUT_TYPE.STRING,
          title: "Image",
          format: "uri",
          "x-order": 2,
          description:
            "Input image for image to image mode. The aspect ratio of your output will match this image",
        },
        prompt: {
          type: INPUT_TYPE.STRING,
          title: "Prompt",
          "x-order": 0,
          description: "Prompt for generated image",
        },
        go_fast: {
          type: INPUT_TYPE.BOOLEAN,
          title: "Go Fast",
          default: true,
          "x-order": 11,
          description: "Run faster predictions with additional optimizations.",
        },
        guidance: {
          type: INPUT_TYPE.NUMBER,
          title: "Guidance",
          default: 3.5,
          maximum: 10,
          minimum: 0,
          "x-order": 6,
          description:
            "Guidance for generated image. Lower values can give more realistic images. Good values to try are 2, 2.5, 3 and 3.5",
        },
        megapixels: {
          enum: ["1", "0.25"],
          type: INPUT_TYPE.STRING,
          title: "megapixels",
          description: "Approximate number of megapixels for generated image",
          default: "1",
          "x-order": 12,
        },
        num_outputs: {
          type: INPUT_TYPE.INTEGER,
          title: "Num Outputs",
          default: 1,
          maximum: 4,
          minimum: 1,
          "x-order": 4,
          description: "Number of outputs to generate",
        },
        aspect_ratio: {
          enum: ["1:1", "16:9", "21:9", "3:2", "2:3", "4:5", "5:4", "3:4", "4:3", "9:16", "9:21"],
          type: INPUT_TYPE.STRING,
          title: "aspect_ratio",
          description: "Aspect ratio for the generated image",
          default: "1:1",
          "x-order": 1,
        },
        output_format: {
          enum: ["webp", "jpg", "png"],
          type: INPUT_TYPE.STRING,
          title: "output_format",
          description: "Format of the output images",
          default: "webp",
          "x-order": 8,
        },
        output_quality: {
          type: INPUT_TYPE.INTEGER,
          title: "Output Quality",
          default: 80,
          maximum: 100,
          minimum: 0,
          "x-order": 9,
          description:
            "Quality when saving the output images, from 0 to 100. 100 is best quality, 0 is lowest quality. Not relevant for .png outputs",
        },
        prompt_strength: {
          type: INPUT_TYPE.NUMBER,
          title: "Prompt Strength",
          default: 0.8,
          maximum: 1,
          minimum: 0,
          "x-order": 3,
          description:
            "Prompt strength when using img2img. 1.0 corresponds to full destruction of information in image",
        },
        num_inference_steps: {
          type: INPUT_TYPE.INTEGER,
          title: "Num Inference Steps",
          default: 28,
          maximum: 50,
          minimum: 1,
          "x-order": 5,
          description:
            "Number of denoising steps. Recommended range is 28-50, and lower number of steps produce lower quality outputs, faster.",
        },
        disable_safety_checker: {
          type: INPUT_TYPE.BOOLEAN,
          title: "Disable Safety Checker",
          default: false,
          "x-order": 10,
          description: "Disable safety checker for generated images.",
        },
      },
    },
  },
  {
    name: "black-forest-labs/flux-schnell",
    inputs: {
      type: "object",
      title: "Input",
      required: ["prompt"],
      properties: {
        seed: {
          type: INPUT_TYPE.INTEGER,
          title: "Seed",
          "x-order": 4,
          description: "Random seed. Set for reproducible generation",
        },
        prompt: {
          type: INPUT_TYPE.STRING,
          title: "Prompt",
          "x-order": 0,
          description: "Prompt for generated image",
        },
        go_fast: {
          type: INPUT_TYPE.BOOLEAN,
          title: "Go Fast",
          default: true,
          "x-order": 8,
          description:
            "Run faster predictions with model optimized for speed (currently fp8 quantized); disable to run in original bf16. Note that outputs will not be deterministic when this is enabled, even if you set a seed.",
        },
        megapixels: {
          enum: ["1", "0.25"],
          type: INPUT_TYPE.STRING,
          title: "megapixels",
          description: "Approximate number of megapixels for generated image",
          default: "1",
          "x-order": 9,
        },
        num_outputs: {
          type: INPUT_TYPE.INTEGER,
          title: "Num Outputs",
          default: 1,
          maximum: 4,
          minimum: 1,
          "x-order": 2,
          description: "Number of outputs to generate",
        },
        aspect_ratio: {
          enum: ["1:1", "16:9", "21:9", "3:2", "2:3", "4:5", "5:4", "3:4", "4:3", "9:16", "9:21"],
          type: INPUT_TYPE.STRING,
          title: "aspect_ratio",
          description: "Aspect ratio for the generated image",
          default: "1:1",
          "x-order": 1,
        },
        output_format: {
          enum: ["webp", "jpg", "png"],
          type: INPUT_TYPE.STRING,
          title: "output_format",
          description: "Format of the output images",
          default: "webp",
          "x-order": 5,
        },
        output_quality: {
          type: INPUT_TYPE.INTEGER,
          title: "Output Quality",
          default: 80,
          maximum: 100,
          minimum: 0,
          "x-order": 6,
          description:
            "Quality when saving the output images, from 0 to 100. 100 is best quality, 0 is lowest quality. Not relevant for .png outputs",
        },
        num_inference_steps: {
          type: INPUT_TYPE.INTEGER,
          title: "Num Inference Steps",
          default: 4,
          maximum: 4,
          minimum: 1,
          "x-order": 3,
          description:
            "Number of denoising steps. 4 is recommended, and lower number of steps produce lower quality outputs, faster.",
        },
        disable_safety_checker: {
          type: INPUT_TYPE.BOOLEAN,
          title: "Disable Safety Checker",
          default: false,
          "x-order": 7,
          description: "Disable safety checker for generated images.",
        },
      },
    },
  },
  {
    name: "qwen/qwen-image",
    inputs: {
      type: "object",
      title: "Input",
      required: ["prompt"],
      properties: {
        seed: {
          type: INPUT_TYPE.INTEGER,
          title: "Seed",
          nullable: true,
          description: "Random seed. Set for reproducible generation",
        },
        image: {
          type: INPUT_TYPE.STRING,
          title: "Image",
          format: "uri",
          description: "Input image for img2img pipeline",
        },
        prompt: {
          type: INPUT_TYPE.STRING,
          title: "Prompt",
          description: "Prompt for generated image",
        },
        go_fast: {
          type: INPUT_TYPE.BOOLEAN,
          title: "Go Fast",
          default: true,
          description: "Run faster predictions with additional optimizations.",
        },
        guidance: {
          type: INPUT_TYPE.NUMBER,
          title: "Guidance",
          default: 3,
          maximum: 10,
          minimum: 0,
          description:
            "Guidance for generated image. Lower values can give more realistic images. Good values to try are 2, 2.5, 3 and 3.5",
        },
        strength: {
          type: INPUT_TYPE.NUMBER,
          title: "Strength",
          default: 0.9,
          maximum: 1,
          minimum: 0,
          description: "Strength for img2img pipeline",
        },
        image_size: {
          enum: ["optimize_for_quality", "optimize_for_speed"],
          type: INPUT_TYPE.STRING,
          title: "image_size",
          description: "Image size for the generated image",
          default: "optimize_for_quality",
          "x-order": 11,
        },
        lora_scale: {
          type: INPUT_TYPE.NUMBER,
          title: "Lora Scale",
          default: 1,
          description: "Determines how strongly the main LoRA should be applied.",
        },
        aspect_ratio: {
          enum: ["1:1", "16:9", "9:16", "4:3", "3:4", "3:2", "2:3"],
          type: INPUT_TYPE.STRING,
          title: "aspect_ratio",
          description: "Aspect ratio for the generated image",
          default: "16:9",
          "x-order": 10,
        },
        lora_weights: {
          type: INPUT_TYPE.STRING,
          title: "Lora Weights",
          nullable: true,
          description:
            "Load LoRA weights. Only works with text to image pipeline. Supports arbitrary .safetensors URLs, tar files, and zip files from the Internet (for example, 'https://huggingface.co/flymy-ai/qwen-image-lora/resolve/main/pytorch_lora_weights.safetensors', 'https://example.com/lora_weights.tar.gz', or 'https://example.com/lora_weights.zip')",
        },
        output_format: {
          enum: ["webp", "jpg", "png"],
          type: INPUT_TYPE.STRING,
          title: "output_format",
          description: "Format of the output images",
          default: "webp",
          "x-order": 16,
        },
        enhance_prompt: {
          type: INPUT_TYPE.BOOLEAN,
          title: "Enhance Prompt",
          default: false,
          description: "Enhance the prompt with positive magic.",
        },
        output_quality: {
          type: INPUT_TYPE.INTEGER,
          title: "Output Quality",
          default: 80,
          maximum: 100,
          minimum: 0,
          description:
            "Quality when saving the output images, from 0 to 100. 100 is best quality, 0 is lowest quality. Not relevant for .png outputs",
        },
        negative_prompt: {
          type: INPUT_TYPE.STRING,
          title: "Negative Prompt",
          default: " ",
          description: "Negative prompt for generated image",
        },
        extra_lora_scale: {
          type: INPUT_TYPE.ARRAY,
          items: {
            type: "number",
          },
          title: "Extra Lora Scale",
          nullable: true,
          description:
            "Scales for additional LoRAs as an array of numbers (e.g., [0.5, 0.7]). Must match the number of weights in extra_lora_weights.",
        },
        extra_lora_weights: {
          type: INPUT_TYPE.ARRAY,
          items: {
            type: INPUT_TYPE.STRING,
          },
          title: "Extra Lora Weights",
          nullable: true,
          description:
            "Additional LoRA weights as an array of URLs. Same formats supported as lora_weights (e.g., ['https://huggingface.co/flymy-ai/qwen-image-lora/resolve/main/pytorch_lora_weights.safetensors', 'https://huggingface.co/flymy-ai/qwen-image-realism-lora/resolve/main/flymy_realism.safetensors'])",
        },
        num_inference_steps: {
          type: INPUT_TYPE.INTEGER,
          title: "Num Inference Steps",
          default: 30,
          maximum: 50,
          minimum: 1,
          description:
            "Number of denoising steps. Recommended range is 28-50, and lower number of steps produce lower quality outputs, faster.",
        },
        disable_safety_checker: {
          type: INPUT_TYPE.BOOLEAN,
          title: "Disable Safety Checker",
          default: false,
          description: "Disable safety checker for generated images.",
        },
      },
    },
  },
  {
    name: "prunaai/flux-kontext-fast",
    inputs: {
      type: "object",
      title: "Input",
      required: ["prompt"],
      properties: {
        seed: {
          type: INPUT_TYPE.INTEGER,
          title: "Seed",
          "x-order": 4,
          description: "Random seed. Set for reproducible generation",
        },
        prompt: {
          type: INPUT_TYPE.STRING,
          title: "Prompt",
          "x-order": 0,
          description: "Prompt for generated image",
        },
        go_fast: {
          type: INPUT_TYPE.BOOLEAN,
          title: "Go Fast",
          default: true,
          "x-order": 8,
          description:
            "Run faster predictions with model optimized for speed (currently fp8 quantized); disable to run in original bf16. Note that outputs will not be deterministic when this is enabled, even if you set a seed.",
        },
        megapixels: {
          enum: ["1", "0.25"],
          type: INPUT_TYPE.STRING,
          title: "megapixels",
          description: "Approximate number of megapixels for generated image",
          default: "1",
          "x-order": 9,
        },
        num_outputs: {
          type: INPUT_TYPE.INTEGER,
          title: "Num Outputs",
          default: 1,
          maximum: 4,
          minimum: 1,
          "x-order": 2,
          description: "Number of outputs to generate",
        },
        aspect_ratio: {
          enum: ["1:1", "16:9", "21:9", "3:2", "2:3", "4:5", "5:4", "3:4", "4:3", "9:16", "9:21"],
          type: INPUT_TYPE.STRING,
          title: "aspect_ratio",
          description: "Aspect ratio for the generated image",
          default: "1:1",
          "x-order": 1,
        },
        output_format: {
          enum: ["webp", "jpg", "png"],
          type: INPUT_TYPE.STRING,
          title: "output_format",
          description: "Format of the output images",
          default: "webp",
          "x-order": 5,
        },
        output_quality: {
          type: INPUT_TYPE.INTEGER,
          title: "Output Quality",
          default: 80,
          maximum: 100,
          minimum: 0,
          "x-order": 6,
          description:
            "Quality when saving the output images, from 0 to 100. 100 is best quality, 0 is lowest quality. Not relevant for .png outputs",
        },
        num_inference_steps: {
          type: INPUT_TYPE.INTEGER,
          title: "Num Inference Steps",
          default: 4,
          maximum: 4,
          minimum: 1,
          "x-order": 3,
          description:
            "Number of denoising steps. 4 is recommended, and lower number of steps produce lower quality outputs, faster.",
        },
        disable_safety_checker: {
          type: INPUT_TYPE.BOOLEAN,
          title: "Disable Safety Checker",
          default: false,
          "x-order": 7,
          description: "Disable safety checker for generated images.",
        },
      },
    },
  },
  {
    name: "black-forest-labs/flux-kontext-dev",
    inputs: {
      type: "object",
      title: "Input",
      required: ["prompt", "input_image"],
      properties: {
        seed: {
          type: INPUT_TYPE.INTEGER,
          title: "Seed",
          "x-order": 5,
          description: "Random seed for reproducible generation. Leave blank for random.",
        },
        prompt: {
          type: INPUT_TYPE.STRING,
          title: "Prompt",
          "x-order": 0,
          description:
            "Text description of what you want to generate, or the instruction on how to edit the given image.",
        },
        go_fast: {
          type: INPUT_TYPE.BOOLEAN,
          title: "Go Fast",
          default: true,
          "x-order": 9,
          description:
            "Make the model go fast, output quality may be slightly degraded for more difficult prompts",
        },
        guidance: {
          type: INPUT_TYPE.NUMBER,
          title: "Guidance",
          default: 2.5,
          maximum: 10,
          minimum: 0,
          "x-order": 4,
          description: "Guidance scale for generation",
        },
        input_image: {
          type: INPUT_TYPE.STRING,
          title: "Input Image",
          format: "uri",
          "x-order": 1,
          description: "Image to use as reference. Must be jpeg, png, gif, or webp.",
        },
        aspect_ratio: {
          enum: [
            "1:1",
            "16:9",
            "21:9",
            "3:2",
            "2:3",
            "4:5",
            "5:4",
            "3:4",
            "4:3",
            "9:16",
            "9:21",
            "match_input_image",
          ],
          type: INPUT_TYPE.STRING,
          title: "aspect_ratio",
          description:
            "Aspect ratio of the generated image. Use 'match_input_image' to match the aspect ratio of the input image.",
          default: "match_input_image",
          "x-order": 2,
        },
        output_format: {
          enum: ["webp", "jpg", "png"],
          type: INPUT_TYPE.STRING,
          title: "output_format",
          description: "Output image format",
          default: "webp",
          "x-order": 6,
        },
        output_quality: {
          type: INPUT_TYPE.INTEGER,
          title: "Output Quality",
          default: 80,
          maximum: 100,
          minimum: 0,
          "x-order": 7,
          description:
            "Quality when saving the output images, from 0 to 100. 100 is best quality, 0 is lowest quality. Not relevant for .png outputs",
        },
        num_inference_steps: {
          type: INPUT_TYPE.INTEGER,
          title: "Num Inference Steps",
          default: 28,
          maximum: 50,
          minimum: 4,
          "x-order": 3,
          description: "Number of inference steps",
        },
        disable_safety_checker: {
          type: INPUT_TYPE.BOOLEAN,
          title: "Disable Safety Checker",
          default: false,
          "x-order": 8,
          description: "Disable NSFW safety checker",
        },
      },
    },
  },
];
