/**
 * Get Yoga computed position. Zero otherwise
 *
 * @param {Object} node
 * @return {Object} position
 */
const getPosition = node => {
  const { yogaNode, box } = node;

  const obj = box || {};
  obj.top = yogaNode?.getComputedTop() || 0;
  obj.right = yogaNode?.getComputedRight() || 0;
  obj.bottom = yogaNode?.getComputedBottom() || 0;
  obj.left = yogaNode?.getComputedLeft() || 0;
  return obj;
};

export default getPosition;
