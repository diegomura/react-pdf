import positionsAdvanceWidth from '../positions/advanceWidth';
import { Run } from '../types';

/**
 * Return run advance width
 *
 * @param run - Run
 * @returns Advance width
 */
const advanceWidth = (run: Run) => {
  return positionsAdvanceWidth(run.positions || []);
};

export default advanceWidth;
