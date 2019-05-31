import setYogaValue from './setYogaValue';

/**
 * Set flex grow attribute to node's Yoga instance
 *
 * @param {Number} flex grow value
 * @param {Object} node instance
 * @return {Object} node instance
 */
const setFlexGrow = setYogaValue('flex-grow');

export default setFlexGrow;
