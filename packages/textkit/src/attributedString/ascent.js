import runAscent from '../run/ascent';

/**
 * Returns attributed string ascent
 *
 * @param {Object} attributed string
 * @return {number} ascent
 */
const ascent = attributeString => {
  const reducer = (acc, run) => Math.max(acc, runAscent(run));
  return attributeString.runs.reduce(reducer, 0);
};

export default ascent;
