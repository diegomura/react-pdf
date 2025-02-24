import { SafeTextNode } from '../types';

/**
 * Get height for given text line index
 *
 * @param node
 * @param index
 */
const heightAtLineIndex = (node: SafeTextNode, index: number) => {
  let counter = 0;

  if (!node.lines) return counter;

  for (let i = 0; i < index; i += 1) {
    const line = node.lines[i];

    if (!line) break;

    counter += line.box.height;
  }

  return counter;
};

export default heightAtLineIndex;
