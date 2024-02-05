import scale from './scale';

/**
 * @typedef {import('../types.js').Run} Run
 */

/**
 * Get run descent
 *
 * @param {Run} run run
 * @returns {number} descent
 */
const descent = (run) => {
  const fontDescent = run.attributes?.font?.descent || 0;

  return scale(run) * fontDescent;
};

export default descent;
