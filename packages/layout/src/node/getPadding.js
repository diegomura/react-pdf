import yogaModule from 'yoga-layout/sync';

// yoga-layout sets default export using non-standard __esModule property, so we need to
// make an additional check in case it's used in a bundler that does not support it.
const Yoga = 'default' in yogaModule ? yogaModule.default : yogaModule;

const getComputedPadding = (node, edge) => {
  const { yogaNode } = node;
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
