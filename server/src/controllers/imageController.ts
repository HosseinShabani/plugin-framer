import { Request, Response } from "express";
import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_KEY || "",
});

export const generateImage = async (req: Request, res: Response) => {
  try {
    const { modelName, input } = req.body;

    try {
      const images: any[] = [];

      const output = await replicate.run(modelName, {
        input: input,
      });

      console.log("output11: ", output);
      console.log("output[0].url(): ", (output as any)[0].url());

      // for (const [index, item] of Object.entries(output)) {
      //   const filename = `image_${Date.now()}_.${output_format}`;
      //   const filePath = path.join(__dirname, "../../public/images", filename);
      //   await writeFile(filePath, item as string);

      //   // Add the generated image to the results with its public URL
      //   images.push({
      //     url: `/images/${filename}`,
      //     prompt,
      //   });
      // }

      return res.status(200).json({
        success: true,
        data: {
          images,
          output,
          message: `Successfully generated ${images.length} images`,
        },
      });
    } catch (error) {
      console.error("Error generating images:", error);
      throw new Error(`Failed to generate images: ${(error as Error).message}`);
    }

    // Return the generated images
  } catch (error) {
    console.error("Error in generateWebsiteImages:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while generating images",
      error: (error as Error).message,
    });
  }
};

export const generateImageFake = async (req: Request, res: Response) => {
  try {
    const { modelName, input } = req.body;

    try {
      const images: any[] = [];

      const output = {
        url: "https://replicate.delivery/czjl/ZwVXuSAmIV5gGRGXnhFSRV2xLK2w3vXxBOchv6LX4msmkCdF/out-0.jpg",
      };

      return res.status(200).json({
        success: true,
        data: {
          images,
          output,
          message: `Successfully generated ${images.length} images`,
        },
      });
    } catch (error) {
      console.error("Error generating images:", error);
      throw new Error(`Failed to generate images: ${(error as Error).message}`);
    }

    // Return the generated images
  } catch (error) {
    console.error("Error in generateWebsiteImages:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while generating images",
      error: (error as Error).message,
    });
  }
};
