import * as Yoga from 'yoga-layout';

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
    borderTopWidth: getComputedBorder(yogaNode, Yoga.Edge.Top),
    borderRightWidth: getComputedBorder(yogaNode, Yoga.Edge.Right),
    borderBottomWidth: getComputedBorder(yogaNode, Yoga.Edge.Bottom),
    borderLeftWidth: getComputedBorder(yogaNode, Yoga.Edge.Left),
  };
};

export default getBorderWidth;
