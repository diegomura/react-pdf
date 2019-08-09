import * as R from 'ramda';
import Yoga from 'yoga-layout';

import firstPass from '../utils/firstPass';

const getComputedPadding = edge => node => {
  const yogaNode = node._yogaNode;
  return yogaNode ? yogaNode.getComputedPadding(edge) : null;
};

/**
 * Get Yoga computed paddings. Zero otherwise
 *
 * @param {Object} node
 * @return {Object} paddings
 */
const getPadding = R.applySpec({
  paddingTop: firstPass(
    getComputedPadding(Yoga.EDGE_TOP),
    R.path(['box', 'paddingTop']),
    R.path(['style', 'paddingTop']),
    R.path(['style', 'paddingVertical']),
    R.path(['style', 'padding']),
    R.always(0),
  ),
  paddingRight: firstPass(
    getComputedPadding(Yoga.EDGE_RIGHT),
    R.path(['box', 'paddingRight']),
    R.path(['style', 'paddingRight']),
    R.path(['style', 'paddingHorizontal']),
    R.path(['style', 'padding']),
    R.always(0),
  ),
  paddingBottom: firstPass(
    getComputedPadding(Yoga.EDGE_BOTTOM),
    R.path(['box', 'paddingBottom']),
    R.path(['style', 'paddingBottom']),
    R.path(['style', 'paddingVertical']),
    R.path(['style', 'padding']),
    R.always(0),
  ),
  paddingLeft: firstPass(
    getComputedPadding(Yoga.EDGE_LEFT),
    R.path(['box', 'paddingLeft']),
    R.path(['style', 'paddingLeft']),
    R.path(['style', 'paddingHorizontal']),
    R.path(['style', 'padding']),
    R.always(0),
  ),
});

export default getPadding;
