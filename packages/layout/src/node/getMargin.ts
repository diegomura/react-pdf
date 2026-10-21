import { SafeNode } from '../types';

/**
 * Get node margins from its box, falling back to style values. Zero otherwise.
 * Used while measuring, before the layout engine has produced a box.
 *
 * @param node
 * @returns Margins
 */
const getMargin = (node: SafeNode) => {
  const { style, box } = node;

  const marginTop = box?.marginTop || style?.marginTop || 0;
  const marginRight = box?.marginRight || style?.marginRight || 0;
  const marginBottom = box?.marginBottom || style?.marginBottom || 0;
  const marginLeft = box?.marginLeft || style?.marginLeft || 0;

  return { marginTop, marginRight, marginBottom, marginLeft };
};

export default getMargin;
