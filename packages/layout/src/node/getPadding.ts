import * as Yoga from 'yoga-layout/load';

import { Node } from '../types';

const getComputedPadding = (node: Node, edge) => {
  const { yogaNode } = node;
  return yogaNode ? yogaNode.getComputedPadding(edge) : null;
};

/**
 * Get Yoga computed paddings. Zero otherwise
 *
 * @param  node
 * @returns paddings
 */
const getPadding = (node: Node) => {
  const { style, box } = node;

  const paddingTop =
    getComputedPadding(node, Yoga.Edge.Top) ||
    box?.paddingTop ||
    style?.paddingTop ||
    style?.paddingVertical ||
    style?.padding ||
    0;

  const paddingRight =
    getComputedPadding(node, Yoga.Edge.Right) ||
    box?.paddingRight ||
    style?.paddingRight ||
    style?.paddingHorizontal ||
    style?.padding ||
    0;

  const paddingBottom =
    getComputedPadding(node, Yoga.Edge.Bottom) ||
    box?.paddingBottom ||
    style?.paddingBottom ||
    style?.paddingVertical ||
    style?.padding ||
    0;

  const paddingLeft =
    getComputedPadding(node, Yoga.Edge.Left) ||
    box?.paddingLeft ||
    style?.paddingLeft ||
    style?.paddingHorizontal ||
    style?.padding ||
    0;

  return { paddingTop, paddingRight, paddingBottom, paddingLeft };
};

export default getPadding;
