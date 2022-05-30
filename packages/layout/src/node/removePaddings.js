import setPadding from './setPadding';
import omit from '../../../fns/omit';

const PADDING_PROPS = [
  'padding',
  'paddingTop',
  'paddingRight',
  'paddingBottom',
  'paddingLeft',
  'paddingHorizontal',
  'paddingVertical',
];

/**
 * Removes padding on node
 *
 * @param {Object} node
 * @returns {Object} node without padding
 */
const removePaddings = node => {
  const style = omit(PADDING_PROPS, node.style || {});
  const newNode = Object.assign({}, node, { style });

  setPadding(0)(newNode);

  return newNode;
};

export default removePaddings;
