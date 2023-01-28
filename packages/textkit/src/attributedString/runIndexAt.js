import runIndexAtInternal from '../run/runIndexAt';

/**
 * Get run index at char index
 *
 * @param  {number}  char index
 * @param  {Object}  attributedString
 * @return {number} run index
 */
const runIndexAt = (n, string) => {
  return runIndexAtInternal(n, string.runs);
};

export default runIndexAt;
