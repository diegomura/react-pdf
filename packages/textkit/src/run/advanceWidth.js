import positionsAdvanceWidth from '../positions/advanceWidth';

/**
 * @typedef {import('../types.js').Run} Run
 */

/**
 * Return run advance width
 *
 * @param {Run} run run
 * @returns {number} advance width
 */
const advanceWidth = (run) => {
  return positionsAdvanceWidth(run.positions || []);
};

export default advanceWidth;
