/**
 * Get string from array of code points
 *
 * @param {Array} code points
 * @return {String} string
 */
const stringFromCodePoints = codePoints =>
  String.fromCodePoint(...(codePoints || []));

export default stringFromCodePoints;
