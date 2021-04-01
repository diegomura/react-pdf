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
  const { style, box } = node;

  const marginTop =
    getComputedMargin(node, Yoga.EDGE_TOP) ||
    box?.marginTop ||
    style?.marginTop ||
    style?.marginVertical ||
    style?.margin ||
    0;

  const marginRight =
    getComputedMargin(node, Yoga.EDGE_RIGHT) ||
    box?.marginRight ||
    style?.marginRight ||
    style?.marginHorizontal ||
    style?.margin ||
    0;

  const marginBottom =
    getComputedMargin(node, Yoga.EDGE_BOTTOM) ||
    box?.marginBottom ||
    style?.marginBottom ||
    style?.marginVertical ||
    style?.margin ||
    0;

  const marginLeft =
    getComputedMargin(node, Yoga.EDGE_LEFT) ||
    box?.marginLeft ||
    style?.marginLeft ||
    style?.marginHorizontal ||
    style?.margin ||
    0;

  return { marginTop, marginRight, marginBottom, marginLeft };
};

export default getMargin;
