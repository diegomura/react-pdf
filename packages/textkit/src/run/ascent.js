import scale from './scale';

/**
 * Get run ascent
 *
 * @param {Object} run
 * @returns {number} ascent
 */
const ascent = run => {
  const attachmentHeight = run.attributes?.attachment?.height || 0;
  const fontAscent = run.attributes?.font?.ascent || 0;

  return Math.max(attachmentHeight, fontAscent * scale(run));
};

export default ascent;
