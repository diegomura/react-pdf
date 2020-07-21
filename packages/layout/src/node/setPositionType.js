import * as R from 'ramda';
import Yoga from 'yoga-layout-prebuilt';

/**
 * Set position type attribute to node's Yoga instance
 *
 * @param {String} position type
 * @param {Object} node instance
 * @return {Object} node instance
 */
const setPositionType = value =>
  R.tap(node => {
    const yogaNode = node._yogaNode;

    if (!R.isNil(value) && yogaNode) {
      yogaNode.setPositionType(
        value === 'absolute'
          ? Yoga.POSITION_TYPE_ABSOLUTE
          : Yoga.POSITION_TYPE_RELATIVE,
      );
    }
  });

export default setPositionType;
