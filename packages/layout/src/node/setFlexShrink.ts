import { SafeNode } from '../types';
import setYogaValue from './setYogaValue';

/**
 * Set flex shrink attribute to node's Yoga instance
 *
 * @param value - Flex shrink value
 * @returns Node instance wrapper
 */
const setFlexShrink = (value?: string | number | null) => (node: SafeNode) => {
  return setYogaValue('flexShrink')(value || 1)(node);
};

export default setFlexShrink;
