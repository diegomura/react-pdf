import runDescent from '../run/descent';

/**
 * Returns attributed string descent
 *
 * @param {Object} attributed string
 * @return {number} descent
 */
const descent = attributeString => {
  const reducer = (acc, run) => Math.min(acc, runDescent(run));
  return attributeString.runs.reduce(reducer, 0);
};

export default descent;
