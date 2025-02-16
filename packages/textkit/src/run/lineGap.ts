import { Run } from '../types';
import scale from './scale';

/**
 * Get run lineGap
 *
 * @param run - Run
 * @returns LineGap
 */
const lineGap = (run: Run) => {
  const font = run.attributes?.font;
  const lineGap = typeof font === 'string' ? 0 : font?.lineGap || 0;
  return lineGap * scale(run);
};

export default lineGap;
