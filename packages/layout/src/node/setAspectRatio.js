import { isNil } from '@react-pdf/fns';

/**
 * @typedef {Function} NodeInstanceWrapper
 * @param {Object} node node instance
 * @returns {Object} node instance
 */

/**
 * Set aspect ratio attribute to node's Yoga instance
 *
 * @param {number} value ratio
 * @returns {NodeInstanceWrapper} node instance wrapper
 */
const setAspectRatio = (value) => (node) => {
  const { yogaNode } = node;

  if (!isNil(value) && yogaNode) {
    yogaNode.setAspectRatio(value);
  }

  return node;
};

export default setAspectRatio;
