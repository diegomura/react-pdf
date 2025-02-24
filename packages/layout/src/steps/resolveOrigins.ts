import getOrigin from '../node/getOrigin';
import { SafeDocumentNode, SafeNode } from '../types';

/**
 * Resolve node origin
 *
 * @param node
 * @returns Node with origin attribute
 */
const resolveNodeOrigin = (node: SafeNode): SafeNode => {
  const origin = getOrigin(node);

  const newNode = Object.assign({}, node, { origin });

  if (!node.children) return newNode;

  const children = node.children.map(resolveNodeOrigin);

  return Object.assign({}, newNode, { children });
};

/**
 * Resolve document origins
 *
 * @param root - Document root
 * @returns Document root
 */

const resolveOrigin = (root: SafeDocumentNode) => {
  if (!root.children) return root;

  const children = root.children.map(resolveNodeOrigin);

  return Object.assign({}, root, { children });
};

export default resolveOrigin;
