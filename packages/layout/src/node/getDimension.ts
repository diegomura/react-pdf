import { SafeNode } from '../types';

const DEFAULT_DIMENSION = {
  width: 0,
  height: 0,
};

/**
 * Get Yoga computed dimensions. Zero otherwise
 *
 * @param node
 * @returns Dimensions
 */
const getDimension = (node: SafeNode) => {
  const { yogaNode } = node;

  if (!yogaNode) return DEFAULT_DIMENSION;

  return {
    width: yogaNode.getComputedWidth(),
    height: yogaNode.getComputedHeight(),
  };
};

export default getDimension;
