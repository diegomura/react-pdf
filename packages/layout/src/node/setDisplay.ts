import * as Yoga from 'yoga-layout/load';
import { SafeNode } from '../types';

/**
 * Set display attribute to node's Yoga instance
 *
 * @param value - Display
 * @returns Node instance wrapper
 */
const setDisplay = (value?: string | null) => (node: SafeNode) => {
  const { yogaNode } = node;

  if (yogaNode) {
    yogaNode.setDisplay(
      value === 'none' ? Yoga.Display.None : Yoga.Display.Flex,
    );
  }

  return node;
};

export default setDisplay;
