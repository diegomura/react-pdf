/**
 * Get Yoga computed dimensions. Zero otherwise
 *
 * @param {Object} node
 * @return {Object} dimensions
 */
const getDimension = node => {
  const { yogaNode, box } = node;

  const obj = box || {};
  obj.width = yogaNode?.getComputedWidth() || 0;
  obj.height = yogaNode?.getComputedHeight() || 0;

  return obj;
};

export default getDimension;
