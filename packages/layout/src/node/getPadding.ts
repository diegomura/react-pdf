import { SafeNode } from '../types';

/**
 * Get node paddings from its box, falling back to style values. Zero otherwise.
 * Used while measuring, before the layout engine has produced a box.
 *
 * @param  node
 * @returns paddings
 */
const getPadding = (node: SafeNode) => {
  const { style, box } = node;

  const paddingTop = box?.paddingTop || style?.paddingTop || 0;
  const paddingRight = box?.paddingRight || style?.paddingRight || 0;
  const paddingBottom = box?.paddingBottom || style?.paddingBottom || 0;
  const paddingLeft = box?.paddingLeft || style?.paddingLeft || 0;

  return { paddingTop, paddingRight, paddingBottom, paddingLeft };
};

export default getPadding;
