import * as Yoga from 'yoga-layout/load';
import { isNil } from '@react-pdf/fns';
import { SafeNode } from '../types';

const JUSTIFY_CONTENT = {
  center: Yoga.Justify.Center,
  'flex-end': Yoga.Justify.FlexEnd,
  'space-between': Yoga.Justify.SpaceBetween,
  'space-around': Yoga.Justify.SpaceAround,
  'space-evenly': Yoga.Justify.SpaceEvenly,
};

/**
 * Set justify content attribute to node's Yoga instance
 *
 * @param value - Justify content value
 * @returns Node instance wrapper
 */
const setJustifyContent = (value?: string | null) => (node: SafeNode) => {
  const { yogaNode } = node;

  if (!isNil(value) && yogaNode) {
    const justifyContent = JUSTIFY_CONTENT[value] || Yoga.Justify.FlexStart;
    yogaNode.setJustifyContent(justifyContent);
  }

  return node;
};

export default setJustifyContent;
