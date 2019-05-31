import * as R from 'ramda';
import Yoga from 'yoga-layout';

/**
 * Set flex direction attribute to node's Yoga instance
 *
 * @param {String} flex direction value
 * @param {Object} node instance
 * @return {Object} node instance
 */
const setFlexDirection = value =>
  R.tap(node => {
    const yogaNode = node._yogaNode;

    if (!R.isNil(value) && yogaNode) {
      const yogaValue = R.cond([
        [R.equals('row'), R.always(Yoga.FLEX_DIRECTION_ROW)],
        [R.equals('row-reverse'), R.always(Yoga.FLEX_DIRECTION_ROW_REVERSE)],
        [
          R.equals('column-reverse'),
          R.always(Yoga.FLEX_DIRECTION_COLUMN_REVERSE),
        ],
        [R.T, R.always(Yoga.FLEX_DIRECTION_COLUMN)],
      ])(value);

      yogaNode.setFlexDirection(yogaValue);
    }
  });

export default setFlexDirection;
