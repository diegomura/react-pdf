import * as Yoga from 'yoga-layout/load';

const getComputedMargin = (node, edge) => {
  const { yogaNode } = node;
  return yogaNode ? yogaNode.getComputedMargin(edge) : null;
};

/**
 * Get Yoga computed magins. Zero otherwise
 *
 * @param {Object} node
 * @returns {{ marginTop: number, marginRight: number, marginBottom: number, marginLeft: number }} margins
 */
const getMargin = (node) => {
  const { style, box } = node;

  const marginTop =
    getComputedMargin(node, Yoga.Edge.Top) ||
    box?.marginTop ||
    style?.marginTop ||
    style?.marginVertical ||
    style?.margin ||
    0;

  const marginRight =
    getComputedMargin(node, Yoga.Edge.Right) ||
    box?.marginRight ||
    style?.marginRight ||
    style?.marginHorizontal ||
    style?.margin ||
    0;

  const marginBottom =
    getComputedMargin(node, Yoga.Edge.Bottom) ||
    box?.marginBottom ||
    style?.marginBottom ||
    style?.marginVertical ||
    style?.margin ||
    0;

  const marginLeft =
    getComputedMargin(node, Yoga.Edge.Left) ||
    box?.marginLeft ||
    style?.marginLeft ||
    style?.marginHorizontal ||
    style?.margin ||
    0;

  return { marginTop, marginRight, marginBottom, marginLeft };
};

export default getMargin;
