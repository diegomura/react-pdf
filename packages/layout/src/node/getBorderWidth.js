import * as R from 'ramda';
import Yoga from 'yoga-layout-prebuilt';

const getComputedBorder = edge => yogaNode =>
  yogaNode ? yogaNode.getComputedBorder(edge) : 0;

/**
 * Get Yoga computed border width. Zero otherwise
 *
 * @param {Object} node
 * @return {Object} border widths
 */
const getBorderWidth = node => {
  const yogaNode = node._yogaNode;

  return R.applySpec({
    borderTopWidth: getComputedBorder(Yoga.EDGE_TOP),
    borderRightWidth: getComputedBorder(Yoga.EDGE_RIGHT),
    borderBottomWidth: getComputedBorder(Yoga.EDGE_BOTTOM),
    borderLeftWidth: getComputedBorder(Yoga.EDGE_LEFT),
  })(yogaNode);
};

export default getBorderWidth;
