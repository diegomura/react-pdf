import * as Yoga from 'yoga-layout/load';

import { SafeNode } from '../types';

const FLEX_DIRECTIONS = {
  row: Yoga.FlexDirection.Row,
  'row-reverse': Yoga.FlexDirection.RowReverse,
  'column-reverse': Yoga.FlexDirection.ColumnReverse,
};

/**
 * Set flex direction attribute to node's Yoga instance
 *
 * @param value - Flex direction value
 * @returns Node instance wrapper
 */
const setFlexDirection = (value?: string | null) => (node: SafeNode) => {
  const { yogaNode } = node;

  if (yogaNode) {
    const flexDirection = FLEX_DIRECTIONS[value] || Yoga.FlexDirection.Column;
    yogaNode.setFlexDirection(flexDirection);
  }

  return node;
};

export default setFlexDirection;
