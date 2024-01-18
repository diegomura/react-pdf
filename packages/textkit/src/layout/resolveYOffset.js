/**
 * Resolves yOffset for run
 *
 * @param {Object}  run
 * @returns {Object} run
 */
const resolveRunYOffset = run => {
  if (!run.positions) return run;

  const unitsPerEm = run.attributes?.font?.unitsPerEm || 0;
  const yOffset = (run.attributes?.yOffset || 0) * unitsPerEm;
  const positions = run.positions.map(p => Object.assign({}, p, { yOffset }));

  return Object.assign({}, run, { positions });
};

/**
 * @typedef {Function} YOffsetResolver
 * @param {string} attributedString attributed string
 * @returns {string} attributed string
 */

/**
 * Resolves yOffset for multiple paragraphs
 *
 * @returns {YOffsetResolver} yOffsetResolver
 */
const resolveYOffset = () => attributedString => {
  const runs = attributedString.runs.map(resolveRunYOffset);
  return Object.assign({}, attributedString, { runs });
};

export default resolveYOffset;
