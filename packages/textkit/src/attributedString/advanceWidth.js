import runAdvanceWidth from '../run/advanceWidth';

/**
 * @typedef {import('../types.js').AttributedString} AttributedString
 */

/**
 * Returns attributed string advancewidth
 *
 * @param {AttributedString} attributedString attributed string
 * @returns {number} advance width
 */
export default function advanceWidth(attributedString) {
  const reducer = (acc, run) => acc + runAdvanceWidth(run);
  return attributedString.runs.reduce(reducer, 0);
}
