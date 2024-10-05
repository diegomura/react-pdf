import * as Yoga from 'yoga-layout/load';

/**
 * @typedef {Function} NodeInstanceWrapper
 * @param {Object} node node instance
 * @returns {Object} node instance
 */

/**
 * Set display attribute to node's Yoga instance
 *
 * @param {string} value display
 * @returns {NodeInstanceWrapper} node instance wrapper
 */
const setDisplay = (value) => (node) => {
  const { yogaNode } = node;

  if (yogaNode) {
    yogaNode.setDisplay(
      value === 'none' ? Yoga.Display.None : Yoga.Display.Flex,
    );
  }

  return node;
};

export default setDisplay;
