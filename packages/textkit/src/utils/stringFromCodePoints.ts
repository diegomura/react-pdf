/**
 * Get string from array of code points
 *
 * @param codePoints - Points
 * @returns String
 */
const stringFromCodePoints = (codePoints: number[] | null) => {
  return String.fromCodePoint(...(codePoints || []));
};

export default stringFromCodePoints;
