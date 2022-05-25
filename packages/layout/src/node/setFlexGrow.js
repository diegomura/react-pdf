import setYogaValue from './setYogaValue';

/**
 * Set flex grow attribute to node's Yoga instance
 *
 * @param {Number} flex grow value
 * @param {Object} node instance
 * @return {Object} node instance
 */
const setFlexGrow = value => node => {
  return setYogaValue('flexGrow')(value || 0)(node);
};

export default setFlexGrow;
