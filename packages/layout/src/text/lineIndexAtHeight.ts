import { SafeTextNode } from '../types';
import getLineTop from './getLineTop';

// Yoga computes in float32, line boxes are float64. Don't let that difference
// push a line that fits exactly to the next page. Same value pagination uses to
// decide if a node needs splitting.
const SAFETY_THRESHOLD = 0.001;

/**
 * Get line index at given height.
 *
 * @param node
 * @param height
 */
const lineIndexAtHeight = (node: SafeTextNode, height: number) => {
  if (!node.lines) return 0;

  for (let i = 0; i < node.lines.length; i += 1) {
    const lineTop = getLineTop(node.lines, i);
    const lineBottom = lineTop + node.lines[i].box.height;

    if (lineBottom > height + SAFETY_THRESHOLD) return i;
  }

  return node.lines.length;
};

export default lineIndexAtHeight;
