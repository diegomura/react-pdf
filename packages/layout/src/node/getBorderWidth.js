import yogaModule from 'yoga-layout/sync';

// yoga-layout sets default export using non-standard __esModule property, so we need to
// make an additional check in case it's used in a bundler that does not support it.
const Yoga = 'default' in yogaModule ? yogaModule.default : yogaModule;

const getComputedBorder = (yogaNode, edge) =>
  yogaNode ? yogaNode.getComputedBorder(edge) : 0;

/**
 * Get Yoga computed border width. Zero otherwise
 *
 * @param {Object} node
 * @return {Object} border widths
 */
const getBorderWidth = node => {
  const { yogaNode } = node;

  return {
    borderTopWidth: getComputedBorder(yogaNode, Yoga.EDGE_TOP),
    borderRightWidth: getComputedBorder(yogaNode, Yoga.EDGE_RIGHT),
    borderBottomWidth: getComputedBorder(yogaNode, Yoga.EDGE_BOTTOM),
    borderLeftWidth: getComputedBorder(yogaNode, Yoga.EDGE_LEFT),
  };
};

export default getBorderWidth;
