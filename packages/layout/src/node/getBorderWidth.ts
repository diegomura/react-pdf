import * as Yoga from 'yoga-layout/load';

import { SafeNode } from '../types';

const getComputedBorder = (
  yogaNode: Yoga.YogaNode | undefined,
  edge: Yoga.Edge,
) => (yogaNode ? yogaNode.getComputedBorder(edge) : 0);

/**
 * Get Yoga computed border width. Zero otherwise
 *
 * @param node
 * @returns Border widths
 */
const getBorderWidth = (node: SafeNode) => {
  const { yogaNode } = node;

  return {
    borderTopWidth: getComputedBorder(yogaNode, Yoga.Edge.Top),
    borderRightWidth: getComputedBorder(yogaNode, Yoga.Edge.Right),
    borderBottomWidth: getComputedBorder(yogaNode, Yoga.Edge.Bottom),
    borderLeftWidth: getComputedBorder(yogaNode, Yoga.Edge.Left),
  };
};

export default getBorderWidth;
