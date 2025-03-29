import { ServerResponse } from "./index";

/**
 * Creates a standardized success response
 */
export function createSuccessResponse<T>(data: T): ServerResponse<T> {
  return {
    success: true,
    data,
  };
}

/**
 * Creates a standardized error response
 */
export function createErrorResponse(error: string): ServerResponse {
  return {
    success: false,
    error,
  };
}

/**
 * Validates if a string is a valid URL
 */
export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Helper to safely parse JSON with error handling
 */
export function safeJsonParse<T>(json: string, fallback: T): T {
  try {
    return JSON.parse(json) as T;
  } catch {
    return fallback;
  }
}
