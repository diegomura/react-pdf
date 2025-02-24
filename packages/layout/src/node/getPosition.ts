import { SafeNode } from '../types';

/**
 * Get Yoga computed position. Zero otherwise
 *
 * @param node
 * @returns Position
 */
const getPosition = (node: SafeNode) => {
  const { yogaNode } = node;

  return {
    top: yogaNode?.getComputedTop() || 0,
    right: yogaNode?.getComputedRight() || 0,
    bottom: yogaNode?.getComputedBottom() || 0,
    left: yogaNode?.getComputedLeft() || 0,
  };
};

export default getPosition;
