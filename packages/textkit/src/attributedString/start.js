/**
 * @typedef {import('../types.js').AttributedString} AttributedString
 */

/**
 * Get attributed string start value
 *
 * @param {AttributedString} attributedString attributed string
 * @returns {number} start
 */
export default function start(attributedString) {
  const { runs } = attributedString;
  return runs.length === 0 ? 0 : runs[0].start;
}
