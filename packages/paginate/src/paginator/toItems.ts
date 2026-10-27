import { Item, LeafItem, SpacerItem } from '../types';
import { ContainerNode, FlowNode, LazyNode, LeafNode } from './types';

const FORCE_BREAK: Item = { kind: 'penalty', type: 'force' };

const FORBID_BREAK: Item = { kind: 'penalty', type: 'forbid' };

// No page break may land within `ahead` of this point.
const presenceWindow = (ahead: number): Item => ({
  kind: 'penalty',
  type: 'forbid',
  ahead,
});

const isContainer = (node: FlowNode): node is ContainerNode =>
  'children' in node;

const isLazy = (node: FlowNode): node is LazyNode => 'materialize' in node;

const isAbsolute = (node: FlowNode) => 'absolute' in node && !!node.absolute;

// The type system forbids these, but plain JS callers get no such help.
const validate = (node: FlowNode) => {
  const mixed = node as Partial<
    Record<'children' | 'split' | 'materialize', unknown>
  >;

  if (mixed.children && (mixed.split || mixed.materialize)) {
    throw new Error(
      '[paginate] A node with children cannot also have split or materialize.',
    );
  }

  if (mixed.split && mixed.materialize) {
    throw new Error(
      '[paginate] A node cannot have both split and materialize.',
    );
  }
};

const marginTop = (node: FlowNode) => node.box.marginTop || 0;

const marginBottom = (node: FlowNode) => node.box.marginBottom || 0;

const edgeTop = (node: FlowNode) => node.box.edgeTop || 0;

// Items live in margin-box space: heights are margin boxes and tops are
// margin-box tops. `outerTop` converts a border-box top into that space.
const outerTop = (node: FlowNode) => node.box.top - marginTop(node);

const outerHeight = (node: FlowNode) =>
  marginTop(node) + node.box.height + marginBottom(node);

// Blank space between two flow siblings that belongs to neither box.
const gapBefore = (flow: FlowNode[], index: number) => {
  const previous = flow[index - 1];

  if (!previous) return 0;

  return outerTop(flow[index]) - outerTop(previous) - outerHeight(previous);
};

// Node-less blank space; edges carry across breaks, collapsing gaps drop.
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

// Split closures receive content height — the engine subtracts the top
// margin — and return public nodes, converted as the engine descends.
const splitOf = (node: LeafNode): LeafItem['split'] => {
  const { split } = node;

  if (!split) return undefined;

  return (availHeight) => {
    const pair = split(availHeight - marginTop(node));

    if (!pair) return null;

    return { current: leafOf(pair[0]), next: leafOf(pair[1]) };
  };
};

// An absolute is a zero-height marker: it takes no space and never splits,
// but it lands on the page the flow reaches it on, in source order.
const leafOf = (node: LeafNode): LeafItem => ({
  kind: 'leaf',
  height: node.absolute ? 0 : outerHeight(node),
  id: node.id,
  data: node,
  split: node.absolute ? undefined : splitOf(node),
});

const lazyOf = (node: LazyNode): Item => ({
  kind: 'lazy',
  id: node.id,
  materialize: (ctx) => [toItem(node.materialize(ctx))],
});

// The node's edges (margin + border + padding) stack as spacers above and
// below its body, riding on a column so they continue across page breaks.
const withEdges = (
  node: ContainerNode,
  bodyTop: number,
  bodyBottom: number,
  body: Item[],
): Item => {
  const topSpace = marginTop(node) + bodyTop;
  const bottomSpace = marginBottom(node) + node.box.height - bodyBottom;

  return {
    kind: 'column',
    id: node.id,
    data: node,
    children: [
      ...(topSpace > 0 ? [space(topSpace)] : []),
      ...body,
      ...(bottomSpace > 0 ? [space(bottomSpace)] : []),
    ],
  };
};

const withFlags = (node: FlowNode, item: Item): Item => ({
  ...item,
  ...(node.repeat ? { repeat: true } : {}),
});

// Children in flow order: absolutes become zero-height leaves where they
// stand but stay out of the gap math — their tops aren't flow positions.
// A break turns into a force penalty before its node; minPresenceAhead into
// a forbid window after it.
const itemsOf = (children: FlowNode[]): Item[] => {
  const flow = children.filter((child) => !isAbsolute(child));

  return children.flatMap((child) => {
    if (isAbsolute(child)) return [withFlags(child, leafOf(child as LeafNode))];

    const index = flow.indexOf(child);
    const before = gapBefore(flow, index);
    const item = withFlags(child, toItem(child));

    const breaker = child.break && index > 0 ? FORCE_BREAK : null;
    const lead = before > 0 ? space(before, true) : null;
    const window = child.minPresenceAhead
      ? presenceWindow(child.minPresenceAhead)
      : null;

    return [breaker, lead, item, window].filter(Boolean) as Item[];
  });
};

// A row's children share a y. A cell pushed down by alignment gets its
// offset as a spacer, forbidden from parting with the cell so an offset
// band never strands at a page bottom on its own.
const rowOf = (node: ContainerNode): Item => {
  const flow = node.children.filter((child) => !isAbsolute(child));

  const cells = flow.map((child): Item => {
    const item = withFlags(child, toItem(child));
    const offset = outerTop(child) - edgeTop(node);

    if (offset <= 0.001) return item;

    return { kind: 'column', children: [space(offset), FORBID_BREAK, item] };
  });

  const bodyBottom = Math.max(
    ...flow.map((child) => outerTop(child) + outerHeight(child)),
  );

  return withEdges(node, edgeTop(node), bodyBottom, [
    { kind: 'row', children: cells },
  ]);
};

// A column whose children overlap vertically wrapped into visual columns:
// its boxes no longer describe a vertical flow, so there is nowhere sane to
// break inside it. Rows are exempt — their cells share a y by design.
const isWrapped = (flow: FlowNode[]) =>
  flow.some((_, index) => gapBefore(flow, index) < -0.001);

const columnOf = (node: ContainerNode): Item => {
  const flow = node.children.filter((child) => !isAbsolute(child));

  if (isWrapped(flow)) {
    return { kind: 'leaf', height: outerHeight(node), id: node.id, data: node };
  }

  const first = flow[0];
  const last = flow[flow.length - 1];

  return withEdges(
    node,
    first ? outerTop(first) : edgeTop(node),
    last ? outerTop(last) + outerHeight(last) : node.box.height,
    itemsOf(node.children),
  );
};

const toItem = (node: FlowNode): Item => {
  validate(node);

  if (isLazy(node)) return lazyOf(node);

  if (isContainer(node)) {
    return node.direction === 'row' ? rowOf(node) : columnOf(node);
  }

  return leafOf(node);
};

// The top-level nodes are the flow itself: they fill pages directly, with
// no enclosing box — page geometry is the caller's business.
const toItems = (nodes: FlowNode[]): Item => ({
  kind: 'column',
  children: itemsOf(nodes),
});

export default toItems;
