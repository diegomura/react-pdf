import { Run } from '../types';
import scale from './scale';
import resolveTypoMetrics from './typoMetrics';

/**
 * Get run lineGap
 *
 * @param run - Run
 * @returns LineGap
 */
const lineGap = (run: Run) => {
  const font = run.attributes?.font;
  const fontLineGap =
    typeof font === 'string' ? 0 : resolveTypoMetrics(font?.[0]).lineGap;
  return fontLineGap * scale(run);
};

export default lineGap;
