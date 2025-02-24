import * as P from '@react-pdf/primitives';

import { SafeDocumentNode, SafeNode } from '../types';

const getZIndex = (node: SafeNode) => node.style.zIndex;

const shouldSort = (node: SafeNode) =>
  node.type !== P.Document && node.type !== P.Svg;

const sortZIndex = (a: SafeNode, b: SafeNode) => {
  const za = getZIndex(a);
  const zb = getZIndex(b);

  if (!za && !zb) return 0;
  if (!za) return 1;
  if (!zb) return -1;

  return zb - za;
};

/**
 * Sort children by zIndex value
 *
 * @param node
 * @returns Node
 */
const resolveNodeZIndex = <T extends SafeNode>(node: T): T => {
  if (!node.children) return node;

  const sortedChildren = shouldSort(node)
    ? node.children.sort(sortZIndex)
    : node.children;

  const children = sortedChildren.map(resolveNodeZIndex);

  return Object.assign({}, node, { children });
};

/**
 * Sort children by zIndex value
 *
 * @param node
 * @returns Node
 */
const resolveZIndex = (root: SafeDocumentNode) => resolveNodeZIndex(root);

export default resolveZIndex;
