/**
 * Get Yoga computed position. Zero otherwise
 *
 * @param {Object} node
 * @return {Object} position
 */
const getPosition = node => {
  const yogaNode = node._yogaNode;

  return {
    top: yogaNode?.getComputedTop() || 0,
    right: yogaNode?.getComputedRight() || 0,
    bottom: yogaNode?.getComputedBottom() || 0,
    left: yogaNode?.getComputedLeft() || 0,
  };
};

export default getPosition;
