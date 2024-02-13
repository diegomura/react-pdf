/**
 * @typedef {import('../types.js').AttributedString} AttributedString
 * @typedef {import('../types.js').Run} Run
 */

/**
 * Resolves yOffset for run
 *
 * @param {Run} run run
 * @returns {Run} run
 */
const resolveRunYOffset = (run) => {
  if (!run.positions) return run;

  const unitsPerEm = run.attributes?.font?.unitsPerEm || 0;
  const yOffset = (run.attributes?.yOffset || 0) * unitsPerEm;
  const positions = run.positions.map((p) => Object.assign({}, p, { yOffset }));

  return Object.assign({}, run, { positions });
};

/**
 * Resolves yOffset for multiple paragraphs
 */
const resolveYOffset = () => {
  /**
   * @param {AttributedString} attributedString attributed string
   * @returns {AttributedString} attributed string
   */
  return (attributedString) => {
    const runs = attributedString.runs.map(resolveRunYOffset);
    return Object.assign({}, attributedString, { runs });
  };
};

export default resolveYOffset;
