import * as R from 'ramda';
import Yoga from '@react-pdf/yoga';

/**
 * Set justify content attribute to node's Yoga instance
 *
 * @param {String} justify content value
 * @param {Object} node instance
 * @return {Object} node instance
 */
const setJustifyContent = value => node => {
  const yogaNode = node._yogaNode;

  if (!R.isNil(value) && yogaNode) {
    const yogaValue = R.cond([
      [R.equals('center'), R.always(Yoga.JUSTIFY_CENTER)],
      [R.equals('flex-end'), R.always(Yoga.JUSTIFY_FLEX_END)],
      [R.equals('space-between'), R.always(Yoga.JUSTIFY_SPACE_BETWEEN)],
      [R.equals('space-around'), R.always(Yoga.JUSTIFY_SPACE_AROUND)],
      [R.equals('space-evenly'), R.always(Yoga.JUSTIFY_SPACE_EVENLY)],
      [R.T, R.always(Yoga.JUSTIFY_FLEX_START)],
    ])(value);

    yogaNode.setJustifyContent(yogaValue);
  }

  return node;
};

export default setJustifyContent;
