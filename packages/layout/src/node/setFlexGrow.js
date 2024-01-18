import setYogaValue from './setYogaValue';

/**
 * @typedef {Function} NodeInstanceWrapper
 * @param {Object} node node instance
 * @returns {Object} node instance
 */

/**
 * Set flex grow attribute to node's Yoga instance
 *
 * @param {number} value flex grow value
 * @returns {NodeInstanceWrapper} node instance wrapper
 */
const setFlexGrow = value => node => {
  return setYogaValue('flexGrow')(value || 0)(node);
};

export default setFlexGrow;
