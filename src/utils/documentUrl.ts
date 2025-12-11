/**
 * Get full document URL by prepending the base URL
 * @param documentPath - The relative path of the document
 * @returns Full URL to the document
 */
export const getDocumentUrl = (documentPath: string): string => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  if (!documentPath) return "";

  // If path already includes http/https, return as is
  if (
    documentPath.startsWith("http://") ||
    documentPath.startsWith("https://")
  ) {
    return documentPath;
  }

  // Remove leading slash if present to avoid double slashes
  const cleanPath = documentPath.startsWith("/")
    ? documentPath.slice(1)
    : documentPath;

  return `${baseUrl}/v1/${cleanPath}`;
};
