// A predefined palette of accessible, soft color pairs using Tailwind CSS classes.
// You can expand this list with more colors as needed.
const colorPalette = [
  'bg-blue-100 text-blue-800',
  'bg-purple-100 text-purple-800',
  'bg-pink-100 text-pink-800',
  'bg-orange-100 text-orange-800',
  'bg-teal-100 text-teal-800',
  'bg-cyan-100 text-cyan-800',
  'bg-lime-100 text-lime-800',
  'bg-fuchsia-100 text-fuchsia-800',
];

/**
 * Generates a consistent color class from a predefined palette based on an input string.
 * The same string will always return the same color.
 *
 * @param {string} inputString - The string to generate a color for (e.g., a centre name).
 * @returns {string} A string of Tailwind CSS classes for the color pair.
 */
export const generateColorFromString = (inputString: string): string => {
  // Create a simple, non-crypto hash from the string.
  let hash = 0;
  for (let i = 0; i < inputString.length; i++) {
    const char = inputString.charCodeAt(i);
    // Use the sdbm hash algorithm which has better distribution to avoid collisions.
    hash = char + (hash << 6) + (hash << 16) - hash;
  }

  // Use the hash to pick a color from the palette.
  // The modulo operator ensures the index is always within the palette's bounds.
  const index = Math.abs(hash % colorPalette.length);
  return colorPalette[index];
};

