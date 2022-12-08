import Yoga from '@react-pdf/yoga';

const FLEX_DIRECTIONS = {
  row: Yoga.FLEX_DIRECTION_ROW,
  'row-reverse': Yoga.FLEX_DIRECTION_ROW_REVERSE,
  'column-reverse': Yoga.FLEX_DIRECTION_COLUMN_REVERSE,
};

/**
 * Set flex direction attribute to node's Yoga instance
 *
 * @param {String} flex direction value
 * @param {Object} node instance
 * @return {Object} node instance
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
