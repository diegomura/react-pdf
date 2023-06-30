import getOrigin from '../node/getOrigin';

/**
 * Resolve node origin
 *
 * @param {Object} node
 * @returns {Object} node with origin attribute
 */
const resolveNodeOrigin = node => {
  node.origin = getOrigin(node);
  if (node.children) {
    node.children.forEach(resolveNodeOrigin);
  }
  return node;
};

/**
 * Resolve document origins
 *
 * @param {Object} document root
 * @returns {Object} documrnt root
 */

const resolveOrigin = root => {
  if (root.children) {
    root.children.forEach(resolveNodeOrigin);
  }
  return root;
};

export default resolveOrigin;
