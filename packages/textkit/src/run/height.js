import ascent from './ascent';
import descent from './descent';
import lineGap from './lineGap';

/**
 * Get run height
 *
 * @param {Object} run
 * @returns {number} height
 */
const height = (run) => {
  const lineHeight = run.attributes?.lineHeight;
  return lineHeight || lineGap(run) + ascent(run) - descent(run);
};

export default height;
