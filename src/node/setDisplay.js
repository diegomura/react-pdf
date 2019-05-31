import * as R from 'ramda';
import Yoga from 'yoga-layout';

/**
 * Set display attribute to node's Yoga instance
 *
 * @param {String} display
 * @param {Object} node instance
 * @return {Object} node instance
 */
const setDisplay = value =>
  R.tap(node => {
    const yogaNode = node._yogaNode;

    if (!R.isNil(value) && yogaNode) {
      yogaNode.setDisplay(
        value === 'none' ? Yoga.DISPLAY_NONE : Yoga.DISPLAY_FLEX,
      );
    }
  });

export default setDisplay;
