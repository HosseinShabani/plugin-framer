import { WebsiteAnalysis, GeneratedImage } from "@framer-plugin/shared";

const STORAGE_KEY_ANALYSIS = "ai_image_plugin_analysis";
const STORAGE_KEY_IMAGES = "ai_image_plugin_generated_images";

/**
 * Saves website analysis to localStorage
 */
export const saveAnalysis = (analysis: WebsiteAnalysis): void => {
  try {
    localStorage.setItem(STORAGE_KEY_ANALYSIS, JSON.stringify(analysis));
  } catch (error) {
    console.error("Error saving website analysis to storage:", error);
  }
};

/**
 * Retrieves website analysis from localStorage
 */
export const getAnalysis = (): WebsiteAnalysis | null => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY_ANALYSIS);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error("Error retrieving website analysis from storage:", error);
  }
  return null;
};

/**
 * Saves generated images to localStorage
 */
export const saveGeneratedImages = (images: GeneratedImage[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY_IMAGES, JSON.stringify(images));
  } catch (error) {
    console.error("Error saving generated images to storage:", error);
  }
};

/**
 * Retrieves generated images from localStorage
 */
export const getGeneratedImages = (): GeneratedImage[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY_IMAGES);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error("Error retrieving generated images from storage:", error);
  }
  return [];
};

/**
 * Clears all plugin storage
 */
export const clearStorage = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY_ANALYSIS);
    localStorage.removeItem(STORAGE_KEY_IMAGES);
  } catch (error) {
    console.error("Error clearing storage:", error);
  }
};
