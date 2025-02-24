import { isNil } from '@react-pdf/fns';
import { SafeNode } from '../types';

/**
 * Set aspect ratio attribute to node's Yoga instance
 *
 * @param value - Ratio
 * @returns Node instance
 */
const setAspectRatio = (value?: number | null) => (node: SafeNode) => {
  const { yogaNode } = node;

  if (!isNil(value) && yogaNode) {
    yogaNode.setAspectRatio(value);
  }

  return node;
};

export default setAspectRatio;
