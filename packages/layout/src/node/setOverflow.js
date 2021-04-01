import * as R from 'ramda';
import Yoga from '@react-pdf/yoga';

/**
 * Set overflow attribute to node's Yoga instance
 *
 * @param {String} overflow value
 * @param {Object} node instance
 * @return {Object} node instance
 */
const setOverflow = value => node => {
  const yogaNode = node._yogaNode;

  if (!R.isNil(value) && yogaNode) {
    const yogaValue = R.cond([
      [R.equals('hidden'), R.always(Yoga.OVERFLOW_HIDDEN)],
      [R.equals('scroll'), R.always(Yoga.OVERFLOW_SCROLL)],
      [R.T, R.always(Yoga.OVERFLOW_VISIBLE)],
    ])(value);

    yogaNode.setOverflow(yogaValue);
  }

  return node;
};

export default setOverflow;
