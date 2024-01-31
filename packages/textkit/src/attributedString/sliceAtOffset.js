import slice from './slice';
import indexAtOffset from './indexAtOffset';

/**
 * @typedef {import('../types.js').AttributedString} AttributedString
 */

/**
 * Slice attributed string at given offset
 *
 * @param {number} offset offset
 * @param {AttributedString} string attributed string
 * @returns {AttributedString} attributed string
 */
export default function sliceAtOffset(offset, string) {
  const index = indexAtOffset(offset, string);
  return slice(0, index, string);
}
