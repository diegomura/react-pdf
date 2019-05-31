import * as R from 'ramda';
import Yoga from 'yoga-layout';

const getComputedMargin = edge => yogaNode =>
  yogaNode ? yogaNode.getComputedMargin(edge) : 0;

/**
 * Get Yoga computed magins. Zero otherwise
 *
 * @param {Object} node
 * @return {Object} margins
 */
const getMargin = node => {
  const yogaNode = node._yogaNode;

  return R.applySpec({
    marginTop: getComputedMargin(Yoga.EDGE_TOP),
    marginRight: getComputedMargin(Yoga.EDGE_RIGHT),
    marginBottom: getComputedMargin(Yoga.EDGE_BOTTOM),
    marginLeft: getComputedMargin(Yoga.EDGE_LEFT),
  })(yogaNode);
};

export default getMargin;
