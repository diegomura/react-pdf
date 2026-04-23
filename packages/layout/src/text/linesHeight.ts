import { SafeTextNode } from '../types';

const isVerticalWritingMode = (node: SafeTextNode) => {
  const wm = node.style?.writingMode;
  return wm === 'vertical-rl' || wm === 'vertical-lr';
};

/**
 * Get lines height (if any)
 *
 * @param node
 * @returns Lines height
 */
const linesHeight = (node: SafeTextNode) => {
  if (!node.lines) return -1;

  if (isVerticalWritingMode(node)) {
    // For vertical text, height is the maximum column height
    return Math.max(0, ...node.lines.map((line) => line.box?.height || 0));
  }

  return node.lines.reduce((acc, line) => acc + line.box.height, 0);
};

export default linesHeight;
