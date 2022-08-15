import runIndexAt from './runIndexAt';

/**
 * Get run at char index
 *
 * @param  {number}  char index
 * @param  {Object}  attributedString
 * @return {Object} run
 */
const runAt = (n, attributedString) => {
  const runIndex = runIndexAt(n, attributedString);
  return attributedString.runs[runIndex];
};

export default runAt;
