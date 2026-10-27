import type { PlacedNode } from '@react-pdf/paginate';

import {
  ZERO_BOTTOM_BOX,
  ZERO_BOTTOM_STYLE,
  ZERO_TOP_BOX,
  ZERO_TOP_STYLE,
} from '../node/splitEdges';
import { SafeNode } from '../types';

const numeric = (value: unknown): number =>
  typeof value === 'number' ? value : 0;

const marginTop = (node: SafeNode) => numeric(node.box?.marginTop);

const marginBottom = (node: SafeNode) => numeric(node.box?.marginBottom);

// A container that starts and ends here keeps its subtree untouched: the yoga
// boxes below it are still valid, and out-of-flow children the engine never
// saw stay where they are.
const isWhole = (placed: PlacedNode) =>
  placed.part.isFirst && placed.part.isLast;

const rebuild = (placed: PlacedNode): SafeNode[] => {
  const node = placed.data as SafeNode | undefined;

  if (!node) return (placed.children || []).flatMap(rebuild);

  // An absolute rode the stream as a zero-height marker: its box carries
  // page coordinates, not a flow position, and passes through untouched.
  if (node.style?.position === 'absolute') {
    return [{ ...node } as SafeNode];
  }

  const { isFirst, isLast } = placed.part;

  // Placed tops are margin-box tops; the node's border box starts below.
  const lead = isFirst ? marginTop(node) : 0;
  const borderTop = placed.box.top + lead;

  if (!placed.children || isWhole(placed)) {
    return [{ ...node, box: { ...node.box, top: borderTop } } as SafeNode];
  }

  // The engine reports what the fragment occupied, and a fragment that
  // continues occupied the rest of the page — so a split container's
  // background and border run to the page edge for free.
  const height = placed.box.height - lead - (isLast ? marginBottom(node) : 0);

  return [
    {
      ...node,
      box: {
        ...node.box,
        top: borderTop,
        height,
        ...(isFirst ? {} : ZERO_TOP_BOX),
        ...(isLast ? {} : ZERO_BOTTOM_BOX),
      },
      style: {
        ...node.style,
        // Pinned so the page relayout keeps the stretch. The final fragment
        // stays unpinned, like legacy's splitNode: its height follows from
        // its children, and it may still grow into the page's free space.
        ...(isLast ? {} : { height }),
        ...(isFirst ? {} : ZERO_TOP_STYLE),
        ...(isLast ? {} : ZERO_BOTTOM_STYLE),
      },
      ...(isFirst ? {} : { props: { ...node.props, bookmark: null } }),
      children: placed.children.flatMap(rebuild),
    } as SafeNode,
  ];
};

const fromPage = (placed: PlacedNode[]): SafeNode[] => placed.flatMap(rebuild);

export default fromPage;
