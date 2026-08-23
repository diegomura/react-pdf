import * as P from '@react-pdf/primitives';
import type { FlowNode, LeafNode } from '@react-pdf/paginate';

import getWrap from '../node/getWrap';
import isFixed from '../node/isFixed';
import renderDynamic from '../node/renderDynamic';
import relayoutPage from '../steps/relayoutPage';
import splitBox from '../node/splitBox';
import { ZERO_BOTTOM_BOX, ZERO_TOP_BOX } from '../node/splitEdges';
import splitText from '../text/splitText';
import hasDynamic from '../node/hasDynamic';
import isDynamic from '../node/isDynamic';
import { SafeNode, SafePageNode, SafeTextNode } from '../types';
import { PageCtx } from './types';

const isText = (node: SafeNode): node is SafeTextNode => node.type === P.Text;

const isAbsolute = (node: SafeNode) => node.style?.position === 'absolute';

const isRow = (node: SafeNode) => {
  const direction = node.style?.flexDirection;
  return direction === 'row' || direction === 'row-reverse';
};

// 'auto' margins are already baked into positions; only numbers count here.
const numeric = (value: unknown): number =>
  typeof value === 'number' ? value : 0;

const boxHeight = (node: SafeNode) => node.box?.height || 0;

const boxTop = (node: SafeNode) => node.box?.top || 0;

const boxOf = (node: SafeNode): FlowNode['box'] => ({
  top: boxTop(node),
  height: boxHeight(node),
  marginTop: numeric(node.box?.marginTop),
  marginBottom: numeric(node.box?.marginBottom),
  edgeTop: (node.box?.borderTopWidth || 0) + (node.box?.paddingTop || 0),
  edgeBottom:
    (node.box?.borderBottomWidth || 0) + (node.box?.paddingBottom || 0),
});

const flowChildren = (node: SafeNode): SafeNode[] =>
  (node.children || []).filter((child) => !isAbsolute(child));

// Split closures receive available content height (margins already handled
// by the engine) and return the fragment that fits plus the remainder.
const splitTextLeaf =
  (node: SafeTextNode): NonNullable<LeafNode['split']> =>
  (availHeight) => {
    if (availHeight <= 0) return null;

    const [current, next] = splitText(node, availHeight + boxTop(node));

    if (!current.lines?.length || !next.lines?.length) return null;

    return [
      leafOf({ ...current, box: { ...current.box, ...ZERO_BOTTOM_BOX } }),
      leafOf({ ...next, box: { ...next.box, ...ZERO_TOP_BOX } }),
    ];
  };

// A childless box still splits: its own height is cut and the edges that fall
// inside the break are dropped.
const splitBoxLeaf =
  (node: SafeNode): NonNullable<LeafNode['split']> =>
  (availHeight) => {
    if (availHeight <= 0 || availHeight >= boxHeight(node)) return null;

    const [current, next] = splitBox(node, availHeight);

    return [leafOf(current), leafOf(next)];
  };

const splitOf = (node: SafeNode): LeafNode['split'] => {
  if (!getWrap(node)) return undefined;
  return isText(node) ? splitTextLeaf(node) : splitBoxLeaf(node);
};

const leafOf = (node: SafeNode): LeafNode => ({
  box: boxOf(node),
  id: node.type,
  data: node,
  split: splitOf(node),
});

// Re-render a dynamic subtree and measure it at the width the first pass
// gave it. A throwaway page runs it through the standard style and yoga
// steps; like the first pass, it has no height constraint so content can
// be any length.
const measure = (
  node: SafeNode,
  ctx: PageCtx,
  pageNumber: number,
): SafeNode => {
  const { page } = ctx;
  const rendered = renderDynamic(ctx.props(pageNumber), node);

  const width =
    (node.box?.width || page.box?.width || 0) +
    numeric(node.box?.marginLeft) +
    numeric(node.box?.marginRight);

  const fake = {
    type: P.Page,
    props: { dpi: (page.props as any)?.dpi },
    style: {
      width,
      height: page.style?.height,
      fontSize: page.style?.fontSize,
    },
    box: { width },
    children: [rendered],
  };

  const laid = relayoutPage(
    fake as any,
    ctx.fontStore,
    ctx.yoga,
  ) as SafePageNode;
  const measured = laid.children![0] as SafeNode;

  return { ...measured, box: { ...measured.box, top: 0 } } as SafeNode;
};

const lazyOf = (node: SafeNode, ctx: PageCtx): FlowNode => ({
  box: boxOf(node),
  id: node.type,
  materialize: ({ pageNumber }) => toItem(measure(node, ctx, pageNumber), ctx),
});

// Absolutes ride the stream as zero-height leaves; dynamic ones are lazies.
const absoluteOf = (node: SafeNode, ctx: PageCtx): FlowNode => {
  if (hasDynamic(node)) {
    return {
      box: boxOf(node),
      id: node.type,
      materialize: ({ pageNumber }) =>
        absoluteOf(measure(node, ctx, pageNumber), ctx),
    };
  }

  return { box: boxOf(node), id: node.type, data: node, absolute: true };
};

// Flags apply where a node enters a flow, never on split or materialized
// fragments.
const withFlags = (child: SafeNode, node: FlowNode): FlowNode => {
  const presence = (child.props as any).minPresenceAhead;

  return {
    ...node,
    ...(isFixed(child) ? { repeat: true } : {}),
    ...(typeof presence === 'number' && presence > 0
      ? { minPresenceAhead: presence }
      : {}),
  };
};

const containerOf = (node: SafeNode, ctx: PageCtx): FlowNode => ({
  box: boxOf(node),
  id: node.type,
  data: node,
  direction: isRow(node) ? 'row' : 'column',
  children: (node.children || []).map((child) =>
    withFlags(child, toItem(child, ctx)),
  ),
});

type NodeKind = 'lazy' | 'leaf' | 'container';

// Order matters: dynamic wins over leaf, leaf over container.
const kindOf = (node: SafeNode, children: SafeNode[]): NodeKind => {
  if (hasDynamic(node) && (isDynamic(node) || isRow(node) || !getWrap(node))) {
    return 'lazy';
  }

  if (isText(node) || children.length === 0 || !getWrap(node)) return 'leaf';

  return 'container';
};

const toItem = (node: SafeNode, ctx: PageCtx): FlowNode => {
  if (isAbsolute(node)) return absoluteOf(node, ctx);

  const children = flowChildren(node);

  switch (kindOf(node, children)) {
    case 'lazy':
      return lazyOf(node, ctx);
    case 'leaf':
      return leafOf(node);
    default:
      return containerOf(node, ctx);
  }
};

// Page content as public flow nodes: geometry copied from yoga boxes, react-pdf
// props mapped to flags, splitting and dynamic re-rendering left as closures.
const toFlow = (nodes: SafeNode[], ctx: PageCtx): FlowNode[] =>
  nodes.map((child) => {
    const node = withFlags(child, toItem(child, ctx));
    const shouldBreak = 'break' in child.props && child.props.break;

    return shouldBreak ? { ...node, break: true } : node;
  });

export default toFlow;
