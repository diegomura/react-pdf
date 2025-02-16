import { Run } from '../types';
import scale from './scale';

/**
 * Get run ascent
 *
 * @param run - Run
 * @returns Ascent
 */
const ascent = (run: Run) => {
  const { font, attachment } = run.attributes;
  const attachmentHeight = attachment?.height || 0;
  const fontAscent = typeof font === 'string' ? 0 : font?.ascent || 0;

  return Math.max(attachmentHeight, fontAscent * scale(run));
};

export default ascent;
