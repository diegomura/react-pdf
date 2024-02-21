/**
 * Get Yoga computed position. Zero otherwise
 *
 * @param {Object} node
 * @returns {{ top: number, right: number, bottom: number, left: number }} position
 */
const getPosition = (node) => {
  const { yogaNode } = node;

  return {
    top: yogaNode?.getComputedTop() || 0,
    right: yogaNode?.getComputedRight() || 0,
    bottom: yogaNode?.getComputedBottom() || 0,
    left: yogaNode?.getComputedLeft() || 0,
  };
};

export default getPosition;
