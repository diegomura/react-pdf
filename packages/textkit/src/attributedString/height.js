import runHeight from '../run/height';

/**
 * @typedef {import('../types.js').AttributedString} AttributedString
 */

/**
 * Returns attributed string height
 *
 * @param {AttributedString} attributedString attributed string
 * @returns {number} height
 */
const height = (attributedString) => {
  const reducer = (acc, run) => Math.max(acc, runHeight(run));
  return attributedString.runs.reduce(reducer, 0);
};

export default height;
