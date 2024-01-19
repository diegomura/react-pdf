import Yoga from '../../yoga';

const getComputedBorder = (yogaNode, edge) =>
  yogaNode ? yogaNode.getComputedBorder(edge) : 0;

/**
 * Get Yoga computed border width. Zero otherwise
 *
 * @param {Object} node
 * @returns {{ borderTopWidth: number, borderRightWidth: number, borderBottomWidth: number, borderLeftWidth: number }} border widths
 */
const getBorderWidth = (node) => {
  const { yogaNode } = node;

  return {
    borderTopWidth: getComputedBorder(yogaNode, Yoga.EDGE_TOP),
    borderRightWidth: getComputedBorder(yogaNode, Yoga.EDGE_RIGHT),
    borderBottomWidth: getComputedBorder(yogaNode, Yoga.EDGE_BOTTOM),
    borderLeftWidth: getComputedBorder(yogaNode, Yoga.EDGE_LEFT),
  };
};

export default getBorderWidth;
