import { omit } from '@react-pdf/fns';

import setPadding from './setPadding';
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
  const newNode: SafeNode = Object.assign({}, node, { style });

  setPadding(0)(newNode);

  return newNode;
};

export default removePaddings;
