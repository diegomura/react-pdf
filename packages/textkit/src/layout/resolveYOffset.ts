import { AttributedString, Run } from '../types';

/**
 * Resolves yOffset for run
 *
 * @param run - Run
 * @returns Run
 */
const resolveRunYOffset = (run: Run) => {
  if (!run.positions) return run;

  const unitsPerEm = run.attributes?.font?.[0]?.unitsPerEm || 0;
  const yOffset = (run.attributes?.yOffset || 0) * unitsPerEm;
  const positions = run.positions.map((p) => Object.assign({}, p, { yOffset }));

  return Object.assign({}, run, { positions });
};

/**
 * Resolves yOffset for multiple paragraphs
 */
const resolveYOffset = () => {
  /**
   * @param attributedString - Attributed string
   * @returns Attributed string
   */
  return (attributedString: AttributedString) => {
    const runs = attributedString.runs.map(resolveRunYOffset);
    const res: AttributedString = Object.assign({}, attributedString, { runs });
    return res;
  };
};

export default resolveYOffset;
