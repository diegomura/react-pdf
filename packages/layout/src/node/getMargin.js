import Yoga from '@nutshelllabs/yoga';

const getComputedMargin = (node, edge) => {
  const { yogaNode } = node;
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

  const obj = box || {};
  obj.marginTop = marginTop;
  obj.marginRight = marginRight;
  obj.marginBottom = marginBottom;
  obj.marginLeft = marginLeft;

  return obj;
};

export default getMargin;
