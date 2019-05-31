import * as R from 'ramda';
import Yoga from 'yoga-layout';

const getComputedPadding = edge => yogaNode =>
  yogaNode ? yogaNode.getComputedPadding(edge) : 0;

/**
 * Get Yoga computed paddings. Zero otherwise
 *
 * @param {Object} node
 * @return {Object} paddings
 */
const getPadding = node => {
  const yogaNode = node._yogaNode;

  return R.applySpec({
    paddingTop: getComputedPadding(Yoga.EDGE_TOP),
    paddingRight: getComputedPadding(Yoga.EDGE_RIGHT),
    paddingBottom: getComputedPadding(Yoga.EDGE_BOTTOM),
    paddingLeft: getComputedPadding(Yoga.EDGE_LEFT),
  })(yogaNode);
};

export default getPadding;
