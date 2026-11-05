import { AttributedString, Run } from '../types';

/**
 * Resolves yOffset for run
 *
 * @param run - Run
 * @returns Run
 */
const resolveRunYOffset = (run: Run) => {
  if (!run.positions) return run;

  const fontSize = run.attributes?.fontSize || 0;
  // scalePositions already put GPOS xOffset/yOffset in points.
  // Only add verticalAlign (sub/super), which is a fraction of an em.
  const verticalAlignPoints = (run.attributes?.yOffset || 0) * fontSize;

  for (let i = 0; i < run.positions.length; i += 1) {
    const position = run.positions[i];
    position.xOffset = position.xOffset || 0;
    position.yOffset = (position.yOffset || 0) + verticalAlignPoints;
  }

  return run;
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
