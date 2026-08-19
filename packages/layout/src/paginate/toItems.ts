import * as P from '@react-pdf/primitives';
import type { Item, LeafItem, SpacerItem } from '@react-pdf/paginate';

import getWrap from '../node/getWrap';
import isFixed from '../node/isFixed';
import splitBox from '../node/splitBox';
import { ZERO_BOTTOM_BOX, ZERO_TOP_BOX } from '../node/splitEdges';
import splitText from '../text/splitText';
import hasDynamic from '../node/hasDynamic';
import isDynamic from '../node/isDynamic';
import { SafeNode, SafeTextNode } from '../types';
import { DynamicEnv, FORBID_BREAK, FORCE_BREAK } from './types';

const isText = (node: SafeNode): node is SafeTextNode => node.type === P.Text;

const isAbsolute = (node: SafeNode) => node.style?.position === 'absolute';

const isRow = (node: SafeNode) => {
  const direction = node.style?.flexDirection;
  return direction === 'row' || direction === 'row-reverse';
};

// Auto margins reach box.* as the string 'auto'; yoga already baked their
// effect into box.top, and the space they create surfaces as a gap. Only
// numeric margins take part in spacing math.
const numeric = (value: unknown): number =>
  typeof value === 'number' ? value : 0;

const marginTop = (node: SafeNode) => numeric(node.box?.marginTop);

const marginBottom = (node: SafeNode) => numeric(node.box?.marginBottom);

const boxHeight = (node: SafeNode) => node.box?.height || 0;

const boxTop = (node: SafeNode) => node.box?.top || 0;

const contentTop = (node: SafeNode) =>
  (node.box?.borderTopWidth || 0) + (node.box?.paddingTop || 0);

// Every item's height is the node's margin box, and every y paginate reports
// is a margin box top. `outerTop` converts a yoga box top into that space.
const outerTop = (node: SafeNode) => boxTop(node) - marginTop(node);

const outerHeight = (node: SafeNode) =>
  marginTop(node) + boxHeight(node) + marginBottom(node);

const flowChildren = (node: SafeNode): SafeNode[] =>
  ((node.children || []) as SafeNode[]).filter((child) => !isAbsolute(child));

// Space yoga inserted between two children that belongs to no box: gaps, and
// the slack `justifyContent` distributes.
const gapBefore = (children: SafeNode[], index: number) => {
  const previous = children[index - 1];

  if (!previous) return 0;

  return outerTop(children[index]) - outerTop(previous) - outerHeight(previous);
};

// Blank space in the flow as a node-less item. A container edge (margin +
// border + padding) continues across a page break: what fits stays, the
// remainder carries over. A collapsing space — the gap between siblings —
// is dropped at the break instead, like margins in print, so the next page
// starts with content at its top.
const space = (height: number, collapse = false): SpacerItem => ({
  kind: 'spacer',
  height,
  split: (avail) => {
    if (!collapse && avail <= 0) return null;

    return {
      current: { kind: 'spacer', height: avail },
      next: collapse ? { kind: 'spacer', height: 0 } : space(height - avail),
    };
  },
});

const interleaveGaps = (children: SafeNode[], items: Item[]): Item[] =>
  items.flatMap((item, index) => {
    const before = gapBefore(children, index);
    return before > 0 ? [space(before, true), item] : [item];
  });

const splitTextLeaf =
  (node: SafeTextNode): NonNullable<LeafItem['split']> =>
  (availHeight) => {
    const contentHeight = availHeight - marginTop(node);

    if (contentHeight <= 0) return null;

    const [current, next] = splitText(node, contentHeight + boxTop(node));

    if (!current.lines?.length || !next.lines?.length) return null;

    return {
      current: leafOf({
        ...current,
        box: { ...current.box, ...ZERO_BOTTOM_BOX },
      }),
      next: leafOf({ ...next, box: { ...next.box, ...ZERO_TOP_BOX } }),
    };
  };

// A childless box still splits: its own height is cut and the edges that fall
// inside the break are dropped.
const splitBoxLeaf =
  (node: SafeNode): NonNullable<LeafItem['split']> =>
  (availHeight) => {
    const height = availHeight - marginTop(node);

    if (height <= 0 || height >= boxHeight(node)) return null;

    const [current, next] = splitBox(node, height);

    return { current: leafOf(current), next: leafOf(next) };
  };

const splitOf = (node: SafeNode) => {
  if (!getWrap(node)) return {};
  if (isText(node)) return { split: splitTextLeaf(node) };
  return { split: splitBoxLeaf(node) };
};

const leafOf = (node: SafeNode): LeafItem => ({
  kind: 'leaf',
  height: outerHeight(node),
  id: node.type,
  data: node,
  ...splitOf(node),
});

const atomicLeafOf = (node: SafeNode): LeafItem => ({
  kind: 'leaf',
  height: outerHeight(node),
  id: node.type,
  data: node,
});

// A dynamic subtree becomes a lazy item: it renders and measures itself when
// the engine reaches it, with the page number it actually lands on. Rows and
// unwrappable nodes wrap whole when anything inside them is dynamic, since
// their fragments can't hold lazy children.
const lazyOf = (node: SafeNode, env: DynamicEnv): Item => ({
  kind: 'lazy',
  id: node.type,
  materialize: (ctx) => [
    toItem(env.measure(node, env.props(ctx.pageNumber)), env),
  ],
});

const toItem = (node: SafeNode, env: DynamicEnv): Item => {
  const children = flowChildren(node);

  if (hasDynamic(node) && (isDynamic(node) || isRow(node) || !getWrap(node))) {
    return lazyOf(node, env);
  }

  if (isText(node) || children.length === 0 || !getWrap(node)) {
    return leafOf(node);
  }

  const first = children[0];
  const last = children[children.length - 1];
  const row = isRow(node);

  // flex-wrap lays children out in several columns; their boxes no longer
  // describe a vertical flow, so the container paginates as an atomic block
  const wrapped =
    !row && children.some((_, index) => gapBefore(children, index) < -0.001);

  if (wrapped) return atomicLeafOf(node);

  // A row's children share a y. A cell pushed down by alignment gets its
  // offset as a spacer, forbidden from parting with the cell so an offset
  // band never strands at a page bottom on its own.
  const items = children.map((child) => {
    const base = toItem(child, env);
    const item = isFixed(child) ? ({ ...base, repeat: true } as Item) : base;
    const offset = row ? outerTop(child) - contentTop(node) : 0;

    return offset > 0.001
      ? ({
          kind: 'column',
          children: [space(offset), FORBID_BREAK, item],
        } as Item)
      : item;
  });

  const bodyTop = row ? contentTop(node) : outerTop(first);
  const bodyBottom = row
    ? Math.max(...children.map((child) => outerTop(child) + outerHeight(child)))
    : outerTop(last) + outerHeight(last);

  const topSpace = marginTop(node) + bodyTop;
  const bottomSpace = marginBottom(node) + boxHeight(node) - bodyBottom;

  // Rows group their cells in a node-less structural row; the node always
  // rides on a column so its edge spacers stack above and below the body.
  const body: Item[] = row
    ? [{ kind: 'row', children: items as Item[] }]
    : interleaveGaps(children, items);

  return {
    kind: 'column',
    id: node.type,
    data: node,
    children: [
      ...(topSpace > 0 ? [space(topSpace)] : []),
      ...body,
      ...(bottomSpace > 0 ? [space(bottomSpace)] : []),
    ],
  };
};

const toItems = (nodes: SafeNode[], env: DynamicEnv): Item[] => {
  const children = nodes.filter((node) => !isAbsolute(node)) as SafeNode[];

  return children.flatMap((child, index) => {
    const before = gapBefore(children, index);
    const base = toItem(child, env);
    const item = isFixed(child) ? ({ ...base, repeat: true } as Item) : base;
    const shouldBreak = 'break' in child.props && child.props.break;
    const lead = before > 0 ? [space(before, true)] : [];

    return shouldBreak && index > 0
      ? [FORCE_BREAK, ...lead, item]
      : [...lead, item];
  }) as Item[];
};

export default toItems;
