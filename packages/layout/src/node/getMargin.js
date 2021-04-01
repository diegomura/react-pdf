import Yoga from '@react-pdf/yoga';

const getComputedMargin = (node, edge) => {
  const yogaNode = node._yogaNode;
  return yogaNode ? yogaNode.getComputedMargin(edge) : null;
};

/**
 * Get Yoga computed magins. Zero otherwise
 *
 * @param {Object} node
 * @return {Object} margins
 */
const getMargin = node => {
  const marginTop =
    getComputedMargin(node, Yoga.EDGE_TOP) ||
    node.box?.marginTop ||
    node.style?.marginTop ||
    node.style?.marginVertical ||
    node.style?.margin ||
    0;

  const marginRight =
    getComputedMargin(node, Yoga.EDGE_RIGHT) ||
    node.box?.marginRight ||
    node.style?.marginRight ||
    node.style?.marginHorizontal ||
    node.style?.margin ||
    0;

  const marginBottom =
    getComputedMargin(node, Yoga.EDGE_BOTTOM) ||
    node.box?.marginBottom ||
    node.style?.marginBottom ||
    node.style?.marginVertical ||
    node.style?.margin ||
    0;

  const marginLeft =
    getComputedMargin(node, Yoga.EDGE_LEFT) ||
    node.box?.marginLeft ||
    node.style?.marginLeft ||
    node.style?.marginHorizontal ||
    node.style?.margin ||
    0;

  return { marginTop, marginRight, marginBottom, marginLeft };
};

export default getMargin;
