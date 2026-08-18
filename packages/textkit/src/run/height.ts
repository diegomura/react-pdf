import { Run } from '../types';
import ascent from './ascent';
import descent from './descent';
import lineGap from './lineGap';

/**
 * Get run height
 *
 * @param run - Run
 * @returns Height
 */
const height = (run: Run) => {
  const lineHeight = run.attributes?.lineHeight;
  const intrinsic = lineGap(run) + ascent(run) - descent(run);
  return Math.max(lineHeight || 0, intrinsic);
};

export default height;
