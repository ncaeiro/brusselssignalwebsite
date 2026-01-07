// Get the base path from the environment
const BASE_PATH = import.meta.env.BASE_URL || '/';

/**
 * Helper function to get the correct image path for both development and production
 * @param path - The image path relative to the public folder (e.g., '/images/logo.png')
 * @returns The full path including the base URL
 */
export const getImagePath = (path: string): string => {
  // Remove leading slash if present to avoid double slashes
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;

  // Combine base path with the image path
  // BASE_PATH already includes trailing slash
  return `${BASE_PATH}${cleanPath}`;
};
