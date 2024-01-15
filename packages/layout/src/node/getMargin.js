import yogaModule from 'yoga-layout/sync';

// yoga-layout sets default export using non-standard __esModule property, so we need to
// make an additional check in case it's used in a bundler that does not support it.
const Yoga = 'default' in yogaModule ? yogaModule.default : yogaModule;

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

  return { marginTop, marginRight, marginBottom, marginLeft };
};

export default getMargin;
