import * as R from 'ramda';
import Yoga from 'yoga-layout';

import firstPass from '../utils/firstPass';

const getComputedMargin = edge => node => {
  const yogaNode = node._yogaNode;
  return yogaNode ? yogaNode.getComputedMargin(edge) : null;
};

/**
 * Get Yoga computed magins. Zero otherwise
 *
 * @param {Object} node
 * @return {Object} margins
 */
const getMargin = R.applySpec({
  marginTop: firstPass(
    getComputedMargin(Yoga.EDGE_TOP),
    R.path(['box', 'marginTop']),
    R.path(['style', 'marginTop']),
    R.path(['style', 'marginVertical']),
    R.path(['style', 'margin']),
    R.always(0),
  ),
  marginRight: firstPass(
    getComputedMargin(Yoga.EDGE_RIGHT),
    R.path(['box', 'marginRight']),
    R.path(['style', 'marginRight']),
    R.path(['style', 'marginHorizontal']),
    R.path(['style', 'margin']),
    R.always(0),
  ),
  marginBottom: firstPass(
    getComputedMargin(Yoga.EDGE_BOTTOM),
    R.path(['box', 'marginBottom']),
    R.path(['style', 'marginBottom']),
    R.path(['style', 'marginVertical']),
    R.path(['style', 'margin']),
    R.always(0),
  ),
  marginLeft: firstPass(
    getComputedMargin(Yoga.EDGE_LEFT),
    R.path(['box', 'marginLeft']),
    R.path(['style', 'marginLeft']),
    R.path(['style', 'marginHorizontal']),
    R.path(['style', 'margin']),
    R.always(0),
  ),
});

export default getMargin;
