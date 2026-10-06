import { SafeTextNode } from '../types';
import getLineTop from './getLineTop';

/**
 * Get height for given text line index.
 * Uses actual line y position when available (float wrapping),
 * otherwise uses cumulative height calculation.
 *
 * @param node
 * @param index
 */
const heightAtLineIndex = (node: SafeTextNode, index: number) =>
  getLineTop(node.lines, index);

export default heightAtLineIndex;
