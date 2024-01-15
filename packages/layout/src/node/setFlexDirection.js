import yogaModule from 'yoga-layout/sync';

// yoga-layout sets default export using non-standard __esModule property, so we need to
// make an additional check in case it's used in a bundler that does not support it.
const Yoga = 'default' in yogaModule ? yogaModule.default : yogaModule;

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
