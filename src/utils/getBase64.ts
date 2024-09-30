import { getPlaiceholder } from "plaiceholder";

/**
 * Fetches an image from the given URL and converts it to a base64-encoded string.
 * This base64 string is used as a placeholder for image loading.
 *
 * @param {string} url - The URL of the image to fetch and convert.
 * @returns {Promise<string>} - A promise that resolves to the base64 string of the image.
 */
export default async function getBase64(url: string): Promise<string> {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Failed to fetch image");
    }

    // Convert the response to an ArrayBuffer (raw binary data)
    const buffer = await response.arrayBuffer();

    // Generate a base64 placeholder using plaiceholder
    // Buffer.from(buffer) converts the ArrayBuffer to a Buffer, which plaiceholder requires
    const { base64 } = await getPlaiceholder(Buffer.from(buffer));

    return base64;
  } catch (error) {
 
    if (error instanceof Error) {
      console.error("Error in getBase64:", error.stack);
    }
    // Return a default blurDataURL or an empty string if there's an error
    return "";
  }
}
