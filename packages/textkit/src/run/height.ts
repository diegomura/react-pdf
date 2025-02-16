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
  return lineHeight || lineGap(run) + ascent(run) - descent(run);
};

export default height;
