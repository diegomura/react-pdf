import slice from './slice';

/**
 * @typedef {import('../types.js').AttributedString} AttributedString
 */

/**
 * @param {string} string
 * @returns {number} index
 */
function findCharIndex(string) {
  return string.search(/\S/g);
}

/**
 * @param {string} string
 * @returns {number} index
 */
function findLastCharIndex(string) {
  const match = string.match(/\S/g);
  return match ? string.lastIndexOf(match[match.length - 1]) : -1;
}

/**
 * Removes (strips) whitespace from both ends of the attributted string.
 *
 * @param {AttributedString} attributedString attributed string
 * @returns {AttributedString} attributed string
 */
export default function trim(attributedString) {
  const start = findCharIndex(attributedString.string);

  const end = findLastCharIndex(attributedString.string);

  return slice(start, end + 1, attributedString);
}
