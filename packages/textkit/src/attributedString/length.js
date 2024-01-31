import start from './start';
import end from './end';

/**
 * @typedef {import('../types.js').AttributedString} AttributedString
 */

/**
 * Get attributed string length
 *
 * @param {AttributedString} attributedString attributed string
 * @returns {number} end
 */
export default function length(attributedString) {
  return end(attributedString) - start(attributedString);
}
