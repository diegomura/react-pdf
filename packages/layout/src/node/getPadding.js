import Yoga from '@react-pdf/yoga';

const getComputedPadding = (node, edge) => {
  const yogaNode = node._yogaNode;
  return yogaNode ? yogaNode.getComputedPadding(edge) : null;
};

/**
 * Get Yoga computed paddings. Zero otherwise
 *
 * @param {Object} node
 * @return {Object} paddings
 */
const getPadding = node => {
  const { style, box } = node;

  const paddingTop =
    getComputedPadding(node, Yoga.EDGE_TOP) ||
    box?.paddingTop ||
    style?.paddingTop ||
    style?.paddingVertical ||
    style?.padding ||
    0;

  const paddingRight =
    getComputedPadding(node, Yoga.EDGE_RIGHT) ||
    box?.paddingRight ||
    style?.paddingRight ||
    style?.paddingHorizontal ||
    style?.padding ||
    0;

  const paddingBottom =
    getComputedPadding(node, Yoga.EDGE_BOTTOM) ||
    box?.paddingBottom ||
    style?.paddingBottom ||
    style?.paddingVertical ||
    style?.padding ||
    0;

  const paddingLeft =
    getComputedPadding(node, Yoga.EDGE_LEFT) ||
    box?.paddingLeft ||
    style?.paddingLeft ||
    style?.paddingHorizontal ||
    style?.padding ||
    0;

  return { paddingTop, paddingRight, paddingBottom, paddingLeft };
};

export default getPadding;
