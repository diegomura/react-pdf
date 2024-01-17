import * as Yoga from 'yoga-layout';

const FLEX_DIRECTIONS = {
  row: Yoga.FlexDirection.Row,
  'row-reverse': Yoga.FlexDirection.RowReverse,
  'column-reverse': Yoga.FlexDirection.ColumnReverse,
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
    const flexDirection = FLEX_DIRECTIONS[value] || Yoga.FlexDirection.Column;
    yogaNode.setFlexDirection(flexDirection);
  }

  return node;
};

export default setFlexDirection;
