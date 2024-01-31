import scale from './scale';

/**
 * @typedef {import('../types.js').Run} Run
 */

/**
 * Get run lineGap
 *
 * @param {Object} run run
 * @returns {number} lineGap
 */
export default function lineGap(run) {
  return (run.attributes?.font?.lineGap || 0) * scale(run);
}
