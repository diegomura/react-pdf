import setYogaValue from './setYogaValue';

/**
 * Set flex basis attribute to node's Yoga instance
 *
 * @param {number} flex basis value
 * @param {Object} node instance
 * @returns {Object} node instance
 */
const setFlexBasis = setYogaValue('flexBasis');

export default setFlexBasis;
