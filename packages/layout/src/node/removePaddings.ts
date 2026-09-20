import { omit } from '@react-pdf/fns';

import { SafeNode } from '../types';

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
 * @param node
 * @returns Node without padding
 */
const removePaddings = (node: SafeNode) => {
  const style = omit(PADDING_PROPS, node.style || {});
  return Object.assign({}, node, { style }) as SafeNode;
};

export default removePaddings;
