import { SafeTextNode } from '../types';

/**
 * Get lines height (if any)
 *
 * @param node
 * @returns Lines height
 */
const linesHeight = (node: SafeTextNode) => {
  if (!node.lines) return -1;
  return node.lines.reduce((acc, line) => acc + line.box.height, 0);
};

export default linesHeight;
