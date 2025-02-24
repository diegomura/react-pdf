import { SafeTextNode } from '../types';

/**
 * Get lines width (if any)
 *
 * @param node
 * @returns Lines width
 */
const linesWidth = (node: SafeTextNode) => {
  if (!node.lines) return 0;

  return Math.max(0, ...node.lines.map((line) => line.xAdvance));
};

export default linesWidth;
