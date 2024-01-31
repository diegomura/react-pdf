/**
 * Get string from array of code points
 *
 * @param {number[]} codePoints points
 * @returns {string} string
 */
export default function stringFromCodePoints(codePoints) {
  return String.fromCodePoint(...(codePoints || []));
}
