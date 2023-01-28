/**
 * Get attributed string start value
 *
 * @param  {Object}  attributed string
 * @return {number} start
 */
const start = attributedString => {
  const { runs } = attributedString;
  return runs.length === 0 ? 0 : runs[0].start;
};

export default start;
