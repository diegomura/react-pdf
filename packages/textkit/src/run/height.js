import ascent from './ascent';
import descent from './descent';
import lineGap from './lineGap';

/**
 * @typedef {import('../types.js').Run} Run
 */

/**
 * Get run height
 *
 * @param {Run} run run
 * @returns {number} height
 */
export default function height(run) {
  const lineHeight = run.attributes?.lineHeight;
  return lineHeight || lineGap(run) + ascent(run) - descent(run);
}
