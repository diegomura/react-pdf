import setYogaValue from './setYogaValue';

/**
 * Set flex shrink attribute to node's Yoga instance
 *
 * @param {Number} flex shrink value
 * @param {Object} node instance
 * @return {Object} node instance
 */
const setFlexShrink = setYogaValue('flex-shrink');

export default setFlexShrink;
