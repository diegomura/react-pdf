const DEFAULT_DIMENSION = {
  width: 0,
  height: 0,
};

/**
 * Get Yoga computed dimensions. Zero otherwise
 *
 * @param {Object} node
 * @returns {{ width: number, height: number }} dimensions
 */
const getDimension = (node) => {
  const { yogaNode } = node;

  if (!yogaNode) return DEFAULT_DIMENSION;

  return {
    width: yogaNode.getComputedWidth(),
    height: yogaNode.getComputedHeight(),
  };
};

export default getDimension;
