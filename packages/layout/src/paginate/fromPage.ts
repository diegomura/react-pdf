import type { PlacedItem } from '@react-pdf/paginate';

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
const isWhole = (placed: PlacedItem) =>
  placed.part.isFirst && placed.part.isLast;

// `origin` maps a placement's y into the coordinate space of the enclosing
// node's border box.
const rebuild = (placed: PlacedItem, origin: number): SafeNode[] => {
  const node = placed.item.data as SafeNode | undefined;
  const top = origin + placed.y;

  // Structural items produce no output: a spacer's space is already in the
  // flow, and a synthetic wrapper flattens into its parent.
  if (!node) {
    return (placed.children || []).flatMap((child) => rebuild(child, top));
  }

  const { isFirst, isLast } = placed.part;

  // Items are margin boxes; the node's own box starts below its top margin.
  const lead = isFirst ? marginTop(node) : 0;
  const borderTop = top + lead;

  if (!placed.children || isWhole(placed)) {
    return [{ ...node, box: { ...node.box, top: borderTop } } as SafeNode];
  }

  // The engine reports what the fragment occupied, and a fragment that
  // continues occupied the rest of the page — so a split container's
  // background and border run to the page edge for free.
  const height = placed.height - lead - (isLast ? marginBottom(node) : 0);

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
      children: placed.children.flatMap((child) => rebuild(child, -lead)),
    } as SafeNode,
  ];
};

const fromPage = (placed: PlacedItem[], contentTop: number): SafeNode[] =>
  placed.flatMap((item) => rebuild(item, contentTop));

export default fromPage;
