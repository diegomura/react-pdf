import runDescent from '../run/descent';

/**
 * Returns attributed string descent
 *
 * @param {Object} attributedString attributed string
 * @returns {number} descent
 */
const descent = (attributedString) => {
  const reducer = (acc, run) => Math.min(acc, runDescent(run));
  return attributedString.runs.reduce(reducer, 0);
};

export default descent;
