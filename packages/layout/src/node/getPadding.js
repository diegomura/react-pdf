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
  const paddingTop =
    getComputedPadding(node, Yoga.EDGE_TOP) ||
    node.box?.paddingTop ||
    node.style?.paddingTop ||
    node.style?.paddingVertical ||
    node.style?.padding ||
    0;

  const paddingRight =
    getComputedPadding(node, Yoga.EDGE_RIGHT) ||
    node.box?.paddingRight ||
    node.style?.paddingRight ||
    node.style?.paddingHorizontal ||
    node.style?.padding ||
    0;

  const paddingBottom =
    getComputedPadding(node, Yoga.EDGE_BOTTOM) ||
    node.box?.paddingBottom ||
    node.style?.paddingBottom ||
    node.style?.paddingVertical ||
    node.style?.padding ||
    0;

  const paddingLeft =
    getComputedPadding(node, Yoga.EDGE_LEFT) ||
    node.box?.paddingLeft ||
    node.style?.paddingLeft ||
    node.style?.paddingHorizontal ||
    node.style?.padding ||
    0;

  return { paddingTop, paddingRight, paddingBottom, paddingLeft };
};

export default getPadding;
