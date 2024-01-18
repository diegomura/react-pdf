import setYogaValue from './setYogaValue';

/**
 * @typedef {Function} NodeInstanceWrapper
 * @param {Object} node node instance
 * @returns {Object} node instance
 */

/**
 * Set flex shrink attribute to node's Yoga instance
 *
 * @param {number} value flex shrink value
 * @returns {NodeInstanceWrapper} node instance wrapper
 */
const setFlexShrink = value => node => {
  return setYogaValue('flexShrink')(value || 1)(node);
};

export default setFlexShrink;
