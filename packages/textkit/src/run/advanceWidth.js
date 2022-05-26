import positionsAdvanceWidth from '../positions/advanceWidth';

/**
 * Return run advance width
 *
 * @param  {Object}  run
 * @return {number} advance width
 */
const advanceWidth = run => {
  return positionsAdvanceWidth(run.positions || []);
};

export default advanceWidth;
