import setYogaValue from './setYogaValue';

/**
 * Set flex basis attribute to node's Yoga instance
 *
 * @param flex - Basis value
 * @param node - Node instance
 * @returns Node instance
 */
const setFlexBasis = setYogaValue('flexBasis');

export default setFlexBasis;
