const DEFAULT_DIMENSION = {
  width: 0,
  height: 0,
};

/**
 * Get Yoga computed dimensions. Zero otherwise
 *
 * @param {Object} node
 * @return {Object} dimensions
 */
const getDimension = node => {
  const { yogaNode } = node;

  if (!yogaNode) return DEFAULT_DIMENSION;

  return {
    width: yogaNode.getComputedWidth(),
    height: yogaNode.getComputedHeight() || 600,
  };
};

export default getDimension;
