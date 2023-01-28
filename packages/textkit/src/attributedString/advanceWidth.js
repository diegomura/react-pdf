import runAdvanceWidth from '../run/advanceWidth';

/**
 * Returns attributed string advancewidth
 *
 * @param {Object} attributed string
 * @return {number} advance width
 */
const advanceWidth = attributeString => {
  const reducer = (acc, run) => acc + runAdvanceWidth(run);
  return attributeString.runs.reduce(reducer, 0);
};

export default advanceWidth;
