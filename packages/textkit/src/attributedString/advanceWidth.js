import runAdvanceWidth from '../run/advanceWidth';

/**
 * Returns attributed string advancewidth
 *
 * @param {Object} attributedString attributed string
 * @returns {number} advance width
 */
const advanceWidth = attributedString => {
  const reducer = (acc, run) => acc + runAdvanceWidth(run);
  return attributedString.runs.reduce(reducer, 0);
};

export default advanceWidth;
