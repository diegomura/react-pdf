import { SafeNode } from '../types';
import setYogaValue from './setYogaValue';

/**
 * Set flex grow attribute to node's Yoga instance
 *
 * @param  value - Flex grow value
 * @returns Node instance wrapper
 */
const setFlexGrow = (value?: number | null) => (node: SafeNode) => {
  return setYogaValue('flexGrow')(value || 0)(node);
};

export default setFlexGrow;
