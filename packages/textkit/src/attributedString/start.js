/**
 * Get attributed string start value
 *
 * @param {Object} attributedString attributed string
 * @returns {number} start
 */
const start = attributedString => {
  const { runs } = attributedString;
  return runs.length === 0 ? 0 : runs[0].start;
};

export default start;
