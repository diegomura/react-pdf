<p align="center">
  <img src="https://user-images.githubusercontent.com/5600341/27505816-c8bc37aa-587f-11e7-9a86-08a2d081a8b9.png" height="280px">
</p>

# @react-pdf/paginate

> Standalone pagination engine for react-pdf

A pure, framework-agnostic pagination engine that packs a laid-out tree of
boxes into fixed-height pages. It derives the spacing between siblings from
their positions, carries container edges across page breaks, honors forced
breaks and repeating headers, and supports content that can't be known until
its page number is.

The engine is independent of React and PDF rendering — it takes a vertical
box model in and returns placed fragments out. React-PDF uses it to paginate
Yoga layout trees, but any consumer that can describe its content as boxes
with tops and heights can use it directly. Internally the tree is compiled to
a box/glue/penalty item stream; that representation is an implementation
detail.

## Installation

```bash
yarn add @react-pdf/paginate
```

## Usage

```js
import { createPaginator } from '@react-pdf/paginate';

const paginator = createPaginator([
  { box: { top: 0, height: 40 }, data: 'a' },
  { box: { top: 40, height: 40 }, data: 'b' },
  { box: { top: 80, height: 40 }, data: 'c' },
]);

const pages = [];

while (!paginator.done) {
  pages.push(paginator.next(100));
}
// => [
//   [{ box: { top: 0, height: 40 }, data: 'a', part: {...} },
//    { box: { top: 40, height: 40 }, data: 'b', part: {...} }],
//   [{ box: { top: 0, height: 40 }, data: 'c', part: {...} }],
// ]
```

## API

### `createPaginator(nodes)`

Stepwise pagination: fills one page per call, so each page can have its own
height — the hook for page templates whose chrome varies per page.

- `nodes: FlowNode[]` — the flow itself, top to bottom. The stream is a
  vertical flow by definition; rows live inside it as `direction: 'row'`
  containers. Page geometry (padding, chrome) is the caller's business.
- `next(height)` packs exactly one page against `height` and returns its
  `PlacedNode[]`. Calling it after `done` throws.
- `done` is `true` once the content stream is exhausted.
- Internal state is sealed — there is no way to modify the in-flight stream
  between pages, by design. Callers own termination.

## The node schema

A node is one of three shapes, told apart by what it carries: `children`
makes it a container, `materialize` makes it lazy, neither makes it a leaf.
Mixing them (children plus `split`, say) is rejected.

Every node accepts `id?: string` (a label surfaced in warnings),
`repeat?: boolean` and `break?: boolean` (below). Leaves and containers also
accept `data?: unknown` — an opaque payload the engine never reads and hands
back on the corresponding `PlacedNode`.

### `Box`

The engine reasons about vertical space only; widths never enter.

```ts
{
  top: number;            // border-box top, relative to the parent's border box
  height: number;         // border-box height
  marginTop?: number;     // numbers only — resolve 'auto' margins upstream
  marginBottom?: number;
  edgeTop?: number;       // top border + padding, summed
  edgeBottom?: number;
}
```

Blank space between siblings — flex gaps, distributed free space — is not
declared anywhere: the engine derives it from consecutive boxes and drops it
at page breaks, the way margins collapse in print. Container edges instead
travel with the container and continue across breaks.

### `LeafNode`

A measured, indivisible (or splittable) unit of content.

```ts
{
  box: Box;
  split?: (avail: number) => [LeafNode, LeafNode] | null;
  absolute?: boolean;
}
```

If `split` is provided and the leaf doesn't fit, the engine calls it with the
available content height (margins already accounted for). Return the fragment
that fits and the remainder, or `null` to move the whole leaf to the next
page. Remainders may split again on later pages.

An `absolute` leaf takes no space and never splits: it lands on the page the
flow reaches it on, in source order, and its box passes through untouched —
for content positioned outside the flow that should still ride with it.

### `ContainerNode`

```ts
{
  box: Box;
  children: FlowNode[];
  direction: 'row' | 'column';
}
```

A `column` stacks children vertically and may break between (or inside) them.
A `row`'s children sit side by side at a shared y; a cell pushed down by
alignment keeps its offset glued to it, so an aligned band never strands at a
page bottom on its own.

A column whose children overlap vertically (flex-wrap into visual columns)
is treated as an unsplittable leaf: its boxes no longer describe a vertical
flow, so there is nowhere sane to break inside it.

### `LazyNode`

Content that depends on the page it lands on.

```ts
{
  box: Box;  // first-pass geometry, used only for spacing between siblings
  materialize: (ctx: { pageNumber: number }) => FlowNode;
}
```

`materialize` runs when the engine reaches the node, with the page number it
would land on. If nothing from it fits there, it re-materializes on the next
page with the updated number — so page-number labels stay accurate across
re-flow.

## Flags

- `break: true` ends the current page before the node (ignored on a
  container's first child).
- `minPresenceAhead: number` keeps the node company: no page break may land
  within that many points after it, so either that much of what follows
  shares its page or the node moves to the next one. Inert when the node is
  first on its page (moving it wouldn't help) and when nothing follows.
- `repeat: true` re-emits a fresh copy of the node at the head of every
  continuation its parent column creates — the way a table header repeats on
  each page the table spans. Rules:
  - A node re-emits only on continuations created after it fully placed. It
    never appears before the flow reaches it, and a mid-split node continues
    its remainder instead of adding a copy; splitting consumes its identity.
  - Repetition is scoped to the immediate parent and ends with it.
  - A `repeat` lazy re-materializes on every page it repeats on, with that
    page's number.
  - A page that places nothing but repeats stops repeating, so content
    always advances.

## Placed output

```ts
{
  box: { top: number; height: number };
  part: { isFirst: boolean; isLast: boolean };
  data?: unknown;
  children?: PlacedNode[];
}
```

`top` is the node's margin-box y — relative to the page for top-level nodes,
to the parent's border box below. `height` is what the fragment occupied on
this page; a container that continues occupied through the page bottom, so
split edges and backgrounds run to the page edge for free. `part` says
whether this placement is the first and/or last fragment of its source node —
the hook for drawing borders only where a container actually starts and ends,
or suppressing a bookmark on continuations.

Spacing and synthetic wrappers dissolve into positions on the way out: the
output contains only nodes you put in (or that your `split`/`materialize`
closures returned).

## License

MIT
