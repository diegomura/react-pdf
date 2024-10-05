import * as Yoga from 'yoga-layout/load';

const FLEX_WRAP = {
  wrap: Yoga.Wrap.Wrap,
  'wrap-reverse': Yoga.Wrap.WrapReverse,
};

/**
 * @typedef {Function} NodeInstanceWrapper
 * @param {Object} node node instance
 * @returns {Object} node instance
 */

/**
 * Set flex wrap attribute to node's Yoga instance
 *
 * @param {string} value flex wrap value
 * @returns {NodeInstanceWrapper} node instance wrapper
 */
const setFlexWrap = (value) => (node) => {
  const { yogaNode } = node;

  if (yogaNode) {
    const flexWrap = FLEX_WRAP[value] || Yoga.Wrap.NoWrap;
    yogaNode.setFlexWrap(flexWrap);
  }

  return node;
};

export default setFlexWrap;
