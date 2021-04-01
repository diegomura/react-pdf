import Yoga from '@react-pdf/yoga';

const getComputedBorder = (yogaNode, edge) =>
  yogaNode ? yogaNode.getComputedBorder(edge) : 0;

/**
 * Get Yoga computed border width. Zero otherwise
 *
 * @param {Object} node
 * @return {Object} border widths
 */
const getBorderWidth = node => {
  const yogaNode = node._yogaNode;

  return {
    borderTopWidth: getComputedBorder(yogaNode, Yoga.EDGE_TOP),
    borderRightWidth: getComputedBorder(yogaNode, Yoga.EDGE_RIGHT),
    borderBottomWidth: getComputedBorder(yogaNode, Yoga.EDGE_BOTTOM),
    borderLeftWidth: getComputedBorder(yogaNode, Yoga.EDGE_LEFT),
  };
};

export default getBorderWidth;
