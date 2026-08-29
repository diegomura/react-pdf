import { Run } from '../types';
import scale from './scale';
import resolveTypoMetrics from './typoMetrics';

/**
 * Get run ascent
 *
 * @param run - Run
 * @returns Ascent
 */
const ascent = (run: Run) => {
  const { font, attachment } = run.attributes;
  const attachmentHeight = attachment?.height || 0;
  const fontAscent =
    typeof font === 'string' ? 0 : resolveTypoMetrics(font?.[0]).ascent;

  return Math.max(attachmentHeight, fontAscent * scale(run));
};

export default ascent;
