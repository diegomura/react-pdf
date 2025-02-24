import * as Yoga from 'yoga-layout/load';
import { isNil } from '@react-pdf/fns';
import { SafeNode } from '../types';

const OVERFLOW = {
  hidden: Yoga.Overflow.Hidden,
  scroll: Yoga.Overflow.Scroll,
};

/**
 * Set overflow attribute to node's Yoga instance
 *
 * @param value - Overflow value
 * @returns Node instance wrapper
 */
const setOverflow = (value?: string | null) => (node: SafeNode) => {
  const { yogaNode } = node;

  if (!isNil(value) && yogaNode) {
    const overflow = OVERFLOW[value] || Yoga.Overflow.Visible;
    yogaNode.setOverflow(overflow);
  }

  return node;
};

export default setOverflow;
