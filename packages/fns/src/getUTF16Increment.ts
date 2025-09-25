/**
 * Increment the index by 1 or 2 depending on the code point
 *
 * @param codePoint - The code point of the character
 * @returns 1 or 2
 */
const getUTF16Increment = (codePoint: number) => {
  // The maximum code point for a single UTF-16 code unit is 0xFFFF
  // If the code point is greater than 0xFFFF, it is a surrogate pair
  // and we need to increment by 2
  const maxCodePoint = 0xffff;
  return codePoint > maxCodePoint ? 2 : 1;
};

export default getUTF16Increment;
