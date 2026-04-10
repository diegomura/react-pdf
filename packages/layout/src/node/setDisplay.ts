import * as Yoga from '../yoga/enums';
import { SafeNode } from '../types';

/**
 * Set display attribute to node's Yoga instance
 *
 * @param value - Display
 * @returns Node instance wrapper
 */
const DISPLAY_MAP: Record<string, number> = {
  flex: Yoga.Display.Flex,
  grid: Yoga.Display.Grid,
  none: Yoga.Display.None,
};

const setDisplay = (value?: string | null) => (node: SafeNode) => {
  const { yogaNode } = node;

  if (yogaNode) {
    yogaNode.setDisplay(DISPLAY_MAP[value || 'flex'] ?? Yoga.Display.Flex);
  }

  return node;
};

export default setDisplay;
