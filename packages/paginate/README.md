<p align="center">
  <img src="https://user-images.githubusercontent.com/5600341/27505816-c8bc37aa-587f-11e7-9a86-08a2d081a8b9.png" height="280px">
</p>

# @react-pdf/paginate

> Standalone pagination engine for react-pdf

A pure, framework-agnostic pagination engine that packs a tree of items into fixed-size pages. It handles splits, nested containers, forced and forbidden breaks, and lazy items that see the page number before materializing.

The engine is independent of React and PDF rendering — it takes measured items in, returns placed items out. React-PDF uses it to paginate layout trees, but any consumer that can describe its content in terms of heights can use it directly.

## Installation

```bash
yarn add @react-pdf/paginate
```

## Usage

```js
import { paginate } from '@react-pdf/paginate';

const root = {
  kind: 'column',
  children: [
    { kind: 'leaf', height: 40, id: 'a' },
    { kind: 'leaf', height: 40, id: 'b' },
    { kind: 'leaf', height: 40, id: 'c' },
  ],
};

const pages = paginate(root, 100);
// => [
//   [{ item: root, y: 0, part: { isFirst: true, isLast: false }, children: [
//     { item: {id:'a',...}, y: 0,  part: { isFirst: true, isLast: true } },
//     { item: {id:'b',...}, y: 40, part: { isFirst: true, isLast: true } },
//   ]}],
//   [{ item: root, y: 0, part: { isFirst: false, isLast: true }, children: [
//     { item: {id:'c',...}, y: 0,  part: { isFirst: true, isLast: true } },
//   ]}],
// ]
```

## API

### `paginate(root, height)`

Packs `root` into as many `height`-tall pages as needed.

- `root: Item` — the item to paginate. Usually a `ColumnItem` (children stack vertically) or a `RowItem` (children sit side by side); the direction is always the root's, never implied.
- `height: number` — the usable height on each page. The engine reasons about vertical space only; horizontal layout stays with the consumer.
- Returns `Page[]`, where each `Page` is a `PlacedItem[]` for that page — a page holds the root's placement for that page, with the descendants that landed there nested under `children`.

Each `PlacedItem` carries a `y` coordinate local to its parent and a `part: { isFirst, isLast }` describing whether this placement is the first and/or last segment of its source item — useful for drawing container edges (borders, rounded corners) only where the container actually starts and ends.

The paginator guards against infinite loops with a `MAX_PAGES = 10_000` cap.

### `createPaginator(root)`

Stepwise pagination: fills one page per call, so each page can have its own
height — the hook for page templates whose chrome varies per page.

```js
import { createPaginator } from '@react-pdf/paginate';

const paginator = createPaginator(root);
const pages = [];

while (!paginator.done) {
  pages.push(paginator.next(heightForPage(pages.length + 1)));
}
```

- `next(height)` packs exactly one page against `height` and returns its
  `PlacedItem[]`. Calling it after `done` throws.
- `done` is `true` once the content stream is exhausted.
- Internal state is sealed — there is no way to modify the in-flight stream
  between pages, by design.
- `paginate(root, height)` is this loop with a constant height and the
  `MAX_PAGES` safety cap; iterator callers own their own termination.

## Items

The root is a single `Item`, and the tree hangs off it. Page padding belongs in `height`, since it applies to every page.

Every item also accepts `id?: string` (a label surfaced in warnings) and
`data?: unknown` — an opaque payload the engine never reads and hands back on
the corresponding `PlacedItem`, so a consumer can recover whatever the item
stood for without keeping side maps.

An item is one of five kinds:

### `LeafItem`

A measured, indivisible (or splittable) unit of content.

```ts
{
  kind: 'leaf';
  height: number;
  id?: string;
  split?: (availHeight: number) =>
    | { current: LeafItem; next: LeafItem }
    | null;
}
```

If `split` is provided and the leaf doesn't fit in the remaining space, the engine calls `split(availHeight)` to try to break it. Return `null` to decline — the leaf will be pushed to the next page instead.

### `ColumnItem` / `RowItem`

Pure grouping containers. When a container breaks across pages, its continuation carries `isFirst: false` and intermediate placements carry `isLast: false`, so the renderer knows which edges to draw where.

```ts
{
  kind: 'column';
  id?: string;
  children: Item[];
}

{
  kind: 'row';
  id?: string;
  children: Item[];
}
```

A `column` stacks children vertically; its content height is the sum of child heights. A `row` lays children side-by-side at a shared `y`; its content height is the max of child heights.

### `SpacerItem`

Vertical space that isn't content: container edges (margin, border, padding), gaps between siblings. Behaviorally identical to a `LeafItem` — same `height`, same optional `split` — the separate kind exists so spacing is distinguishable from content, in both the input and the placed output.

```ts
{
  kind: 'spacer';
  height: number;
  id?: string;
  split?: (availHeight: number) =>
    | { current: SpacerItem; next: SpacerItem }
    | null;
}
```

The policy for how an edge behaves at a page break is whatever the spacer's shape says:

```js
// travels with its neighbor (visible borders)
[...children, FORBID_BREAK, { kind: 'spacer', height: bottomEdge }]

// may land alone on the next page
[...children, { kind: 'spacer', height: bottomEdge }]

// distributes: fills the current page to the edge, remainder continues
[...children, { kind: 'spacer', height: bottomEdge, split: distribute }]

// collapses: fills the current page, remainder dropped (gaps, margins)
[...children, { kind: 'spacer', height: gap, split: collapse }]
```

where `distribute` and `collapse` are ordinary `split` callbacks returning `{ current, next }` — `collapse` just returns a zero-height remainder.

### `Penalty`

A zero-height break hint inserted between a container's children.

```ts
{
  kind: 'penalty';
  type: 'force' | 'forbid';
}
```

- `type: 'force'` — ends the current page immediately.
- `type: 'forbid'` — prevents a clean break between the previous and next items (they travel together).

```js
const FORCE_BREAK = { kind: 'penalty', type: 'force' };
const FORBID_BREAK = { kind: 'penalty', type: 'forbid' };

const children = [header, FORBID_BREAK, subheader, body, FORCE_BREAK, appendix];
```

### `LazyItem`

An item whose contents depend on the page number. `materialize(ctx)` is called when the engine is ready to place it, and its output is spliced in among its siblings.

```ts
{
  kind: 'lazy';
  id?: string;
  materialize: (ctx: { pageNumber: number }) => Item[];
}
```

If a lazy item commits (any materialized child lands on the current page), it stays committed. If nothing from it fits, the lazy is restored and re-materializes on the next page with the updated `pageNumber` — so page-number labels, running headers, and the like stay accurate across re-flow.

## Repeating items

Any content-bearing item (`leaf`, `column`, `row`, `lazy` — not `spacer` or
`penalty`) may carry `repeat: true`. When its parent column breaks, a fresh
copy re-emits at the head of every continuation — the way a table header
repeats on each page the table spans.

```js
const table = {
  kind: 'column',
  children: [{ kind: 'row', repeat: true, children: headerCells }, ...bodyRows],
};
```

Rules:

- An item re-emits only on continuations created after it fully placed. It
  never appears before the flow reaches it, and a mid-split item continues
  its own remainder instead of adding a copy. A split consumes the item's
  identity: once split, it stops repeating.
- Repetition is scoped to the immediate parent and ends with it — a table's
  header stops repeating after the table's last fragment.
- Each repetition is a fresh copy with its own `part` flags. A `repeat` lazy
  re-materializes on every page it lands on, with that page's number.
- A page that places nothing but repeats stops the repetition, so content
  always advances.

## License

MIT
