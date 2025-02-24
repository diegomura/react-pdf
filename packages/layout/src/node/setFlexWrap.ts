import * as Yoga from 'yoga-layout/load';
import { SafeNode } from '../types';

const FLEX_WRAP = {
  wrap: Yoga.Wrap.Wrap,
  'wrap-reverse': Yoga.Wrap.WrapReverse,
};

/**
 * Set flex wrap attribute to node's Yoga instance
 *
 * @param value - Flex wrap value
 * @returns Node instance wrapper
 */
const setFlexWrap = (value?: string | null) => (node: SafeNode) => {
  const { yogaNode } = node;

  if (yogaNode) {
    const flexWrap: Yoga.Wrap = FLEX_WRAP[value] || Yoga.Wrap.NoWrap;
    yogaNode.setFlexWrap(flexWrap);
  }

  return node;
};

export default setFlexWrap;
