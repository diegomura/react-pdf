import setYogaValue from './setYogaValue';

/**
 * Set flex basis attribute to node's Yoga instance
 *
 * @param {Number} flex basis value
 * @param {Object} node instance
 * @return {Object} node instance
 */
const setFlexBasis = setYogaValue('flexBasis');

export default setFlexBasis;
