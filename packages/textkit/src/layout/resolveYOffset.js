/**
 * Resolves yOffset for run
 *
 * @param  {Object}  run
 * @return {Object} run
 */
const resolveRunYOffset = run => {
  if (!run.positions) return;

  const unitsPerEm = run.attributes?.font?.unitsPerEm || 0;
  const yOffset = (run.attributes?.yOffset || 0) * unitsPerEm;
  run.positions.forEach(p => {
    p.yOffset = yOffset;
  });
};

/**
 * Resolves yOffset for multiple paragraphs
 *
 * @param  {Object} layout engines
 * @param  {Object}  layout options
 * @param  {Array}  attributed strings (paragraphs)
 * @return {Array} attributed strings (paragraphs)
 */
const resolveYOffset = () => attributedString => {
  attributedString.runs.forEach(resolveRunYOffset);
  return attributedString;
};

export default resolveYOffset;
