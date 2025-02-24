import * as Yoga from 'yoga-layout/load';

import { SafeNode } from '../types';

const getComputedPadding = (node: SafeNode, edge: Yoga.Edge) => {
  const { yogaNode } = node;
  return yogaNode ? yogaNode.getComputedPadding(edge) : null;
};

/**
 * Get Yoga computed paddings. Zero otherwise
 *
 * @param  node
 * @returns paddings
 */
const getPadding = (node: SafeNode) => {
  const { style, box } = node;

  const paddingTop =
    getComputedPadding(node, Yoga.Edge.Top) ||
    box?.paddingTop ||
    style?.paddingTop ||
    0;

  const paddingRight =
    getComputedPadding(node, Yoga.Edge.Right) ||
    box?.paddingRight ||
    style?.paddingRight ||
    0;

  const paddingBottom =
    getComputedPadding(node, Yoga.Edge.Bottom) ||
    box?.paddingBottom ||
    style?.paddingBottom ||
    0;

  const paddingLeft =
    getComputedPadding(node, Yoga.Edge.Left) ||
    box?.paddingLeft ||
    style?.paddingLeft ||
    0;

  return { paddingTop, paddingRight, paddingBottom, paddingLeft };
};

export default getPadding;
