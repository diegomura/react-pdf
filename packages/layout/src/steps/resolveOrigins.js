import getOrigin from '../node/getOrigin';

/**
 * Resolve node origin
 *
 * @param {Object} node
 * @returns {Object} node with origin attribute
 */
const resolveNodeOrigin = node => {
  const origin = getOrigin(node);

  const newNode = Object.assign({}, node, { origin });

  if (!node.children) return newNode;

  const children = node.children.map(resolveNodeOrigin);

  return Object.assign({}, newNode, { children });
};

/**
 * Resolve document origins
 *
 * @param {Object} document root
 * @returns {Object} documrnt root
 */

const resolveOrigin = root => {
  if (!root.children) return root;

  const children = root.children.map(resolveNodeOrigin);

  return Object.assign({}, root, { children });
};

export default resolveOrigin;
