import { SafeTextNode } from '../types';
import getLineTop from './getLineTop';

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

    if (lineBottom > height) return i;
  }

  return node.lines.length;
};

export default lineIndexAtHeight;
