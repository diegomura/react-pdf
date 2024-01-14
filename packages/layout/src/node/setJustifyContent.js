import Yoga from 'yoga-layout/sync';
import { isNil } from '@react-pdf/fns';

const JUSTIFY_CONTENT = {
  center: Yoga.JUSTIFY_CENTER,
  'flex-end': Yoga.JUSTIFY_FLEX_END,
  'space-between': Yoga.JUSTIFY_SPACE_BETWEEN,
  'space-around': Yoga.JUSTIFY_SPACE_AROUND,
  'space-evenly': Yoga.JUSTIFY_SPACE_EVENLY,
};

/**
 * Set justify content attribute to node's Yoga instance
 *
 * @param {String} justify content value
 * @param {Object} node instance
 * @return {Object} node instance
 */
const setJustifyContent = value => node => {
  const { yogaNode } = node;

  if (!isNil(value) && yogaNode) {
    const justifyContent = JUSTIFY_CONTENT[value] || Yoga.JUSTIFY_FLEX_START;
    yogaNode.setJustifyContent(justifyContent);
  }

  return node;
};

export default setJustifyContent;
