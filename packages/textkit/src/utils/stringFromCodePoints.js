/**
 * Get string from array of code points
 *
 * @param {number[]} codePoints points
 * @returns {string} string
 */
const stringFromCodePoints = (codePoints) => {
  return String.fromCodePoint(...(codePoints || []));
};

export default stringFromCodePoints;
