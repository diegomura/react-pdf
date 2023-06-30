import Yoga from '@nutshelllabs/yoga';

const getComputedBorder = (yogaNode, edge) =>
  yogaNode ? yogaNode.getComputedBorder(edge) : 0;

/**
 * Get Yoga computed border width. Zero otherwise
 *
 * @param {Object} node
 * @return {Object} border widths
 */
const getBorderWidth = node => {
  const { yogaNode, box } = node;

  const obj = box || {};
  obj.borderTopWidth = getComputedBorder(yogaNode, Yoga.EDGE_TOP);
  obj.borderRightWidth = getComputedBorder(yogaNode, Yoga.EDGE_RIGHT);
  obj.borderBottomWidth = getComputedBorder(yogaNode, Yoga.EDGE_BOTTOM);
  obj.borderLeftWidth = getComputedBorder(yogaNode, Yoga.EDGE_LEFT);
  return obj;
};

export default getBorderWidth;
