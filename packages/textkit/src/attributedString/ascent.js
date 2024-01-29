import runAscent from '../run/ascent';

/**
 * Returns attributed string ascent
 *
 * @param {Object} attributedString attributed string
 * @returns {number} ascent
 */
const ascent = (attributedString) => {
  const reducer = (acc, run) => Math.max(acc, runAscent(run));
  return attributedString.runs.reduce(reducer, 0);
};

export default ascent;
