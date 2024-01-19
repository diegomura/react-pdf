import Yoga from '../../yoga';

const FLEX_DIRECTIONS = {
  row: Yoga.FLEX_DIRECTION_ROW,
  'row-reverse': Yoga.FLEX_DIRECTION_ROW_REVERSE,
  'column-reverse': Yoga.FLEX_DIRECTION_COLUMN_REVERSE,
};

/**
 * @typedef {Function} NodeInstanceWrapper
 * @param {Object} node node instance
 * @returns {Object} node instance
 */

/**
 * Set flex direction attribute to node's Yoga instance
 *
 * @param {string} value flex direction value
 * @returns {NodeInstanceWrapper} node instance wrapper
 */
const setFlexDirection = value => node => {
  const { yogaNode } = node;

  if (yogaNode) {
    const flexDirection = FLEX_DIRECTIONS[value] || Yoga.FLEX_DIRECTION_COLUMN;
    yogaNode.setFlexDirection(flexDirection);
  }

  return node;
};

export default setFlexDirection;
