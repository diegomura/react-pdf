import * as Yoga from 'yoga-layout/load';

import { SafeNode } from '../types';

const getComputedMargin = (node: SafeNode, edge: Yoga.Edge) => {
  const { yogaNode } = node;
  return yogaNode ? yogaNode.getComputedMargin(edge) : null;
};

/**
 * Get Yoga computed magins. Zero otherwise
 *
 * @param node
 * @returns Margins
 */
const getMargin = (node: SafeNode) => {
  const { style, box } = node;

  const marginTop =
    getComputedMargin(node, Yoga.Edge.Top) ||
    box?.marginTop ||
    style?.marginTop ||
    0;

  const marginRight =
    getComputedMargin(node, Yoga.Edge.Right) ||
    box?.marginRight ||
    style?.marginRight ||
    0;

  const marginBottom =
    getComputedMargin(node, Yoga.Edge.Bottom) ||
    box?.marginBottom ||
    style?.marginBottom ||
    0;

  const marginLeft =
    getComputedMargin(node, Yoga.Edge.Left) ||
    box?.marginLeft ||
    style?.marginLeft ||
    0;

  return { marginTop, marginRight, marginBottom, marginLeft };
};

export default getMargin;
