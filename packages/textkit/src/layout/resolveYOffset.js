/**
 * Resolves yOffset for run
 *
 * @param  {Object}  run
 * @return {Object} run
 */
const resolveRunYOffset = run => {
  if (!run.positions) return run;

  const unitsPerEm = run.attributes?.font?.unitsPerEm || 0;
  const yOffset = (run.attributes?.yOffset || 0) * unitsPerEm;
  const positions = run.positions.map(p => Object.assign({}, p, { yOffset }));

  return Object.assign({}, run, { positions });
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
  const runs = attributedString.runs.map(resolveRunYOffset);
  return Object.assign({}, attributedString, { runs });
};

export default resolveYOffset;
