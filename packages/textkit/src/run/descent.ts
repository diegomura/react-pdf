import { Run } from '../types';
import scale from './scale';

/**
 * Get run descent
 *
 * @param run - Run
 * @returns Descent
 */
const descent = (run: Run) => {
  const font = run.attributes?.font;
  const fontDescent = typeof font === 'string' ? 0 : font?.[0]?.descent || 0;

  return scale(run) * fontDescent;
};

export default descent;
