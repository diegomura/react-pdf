import { SafeTextNode } from '../types';

const isVerticalWritingMode = (node: SafeTextNode) => {
  const wm = node.style?.writingMode;
  return wm === 'vertical-rl' || wm === 'vertical-lr';
};

/**
 * Get lines width (if any)
 *
 * @param node
 * @returns Lines width
 */
const linesWidth = (node: SafeTextNode) => {
  if (!node.lines) return 0;

  if (isVerticalWritingMode(node)) {
    // For vertical text, total width is sum of all column widths
    return node.lines.reduce((acc, line) => acc + (line.box?.width || 0), 0);
  }

  return Math.max(0, ...node.lines.map((line) => line.xAdvance));
};

export default linesWidth;
