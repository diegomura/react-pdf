import Yoga from '../../yoga';

const FLEX_WRAP = {
  wrap: Yoga.WRAP_WRAP,
  'wrap-reverse': Yoga.WRAP_WRAP_REVERSE,
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
const setFlexWrap = value => node => {
  const { yogaNode } = node;

  if (yogaNode) {
    const flexWrap = FLEX_WRAP[value] || Yoga.WRAP_NO_WRAP;
    yogaNode.setFlexWrap(flexWrap);
  }

  return node;
};

export default setFlexWrap;
