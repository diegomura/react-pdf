import * as R from 'ramda';
import Yoga from 'yoga-layout';

/**
 * Set flex wrap attribute to node's Yoga instance
 *
 * @param {String} flex wrap value
 * @param {Object} node instance
 * @return {Object} node instance
 */
const setFlexWrap = value =>
  R.tap(node => {
    const yogaNode = node._yogaNode;

    if (!R.isNil(value) && yogaNode) {
      const yogaValue = R.cond([
        [R.equals('wrap'), R.always(Yoga.WRAP_WRAP)],
        [R.equals('wrap-reverse'), R.always(Yoga.WRAP_WRAP_REVERSE)],
        [R.T, R.always(Yoga.WRAP_NO_WRAP)],
      ])(value);

      yogaNode.setFlexWrap(yogaValue);
    }
  });

export default setFlexWrap;
