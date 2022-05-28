import runHeight from '../run/height';

/**
 * Returns attributed string height
 *
 * @param {Object} attributed string
 * @return {number} height
 */
const height = attributeString => {
  const reducer = (acc, run) => Math.max(acc, runHeight(run));
  return attributeString.runs.reduce(reducer, 0);
};

export default height;
