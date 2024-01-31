/**
 * @typedef {import('../types.js').Font} Font
 * @typedef {import('../types.js').Run} Run
 */

/**
 * Get run font
 *
 * @param {Run} run run
 * @returns {Font | null} font
 */
export default function getFont(run) {
  return run.attributes?.font || null;
}
