# Paginate `repeat` Flag Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** An item flagged `repeat: true` re-emits at the head of every continuation of its parent column, and `@react-pdf/layout` maps nested in-flow `fixed` nodes onto it.

**Architecture:** One new pure function (`fragment/repeatPrefix.ts`) computes the fresh fragments to prepend when `fit/column` builds a continuation. Detection is per-page and self-sustaining: a repeat item that fully places on a page is prepended to the next page's children, where the same detection sees it again. Repeat-flagged lazy items propagate through an `origin` tag on their materialized fragments. The layout adapter stops filtering nested `fixed` nodes out of the flow and marks their items `repeat: true` instead.

**Tech Stack:** TypeScript, Vitest, jest-image-snapshot (`snapshotPages` helper renders pages to PNG). Spec: `docs/superpowers/specs/2026-08-17-paginate-repeat-design.md`.

**Environment:** Prefix every command with the Node 22 path (machine default is Node 18):

```bash
export PATH="$HOME/.nvm/versions/node/v22.15.0/bin:$PATH"
```

Run vitest only via `yarn vitest run <path>` (never `npx vitest` — it resolves to a broken cached version).

---

## File Structure

- Create: `packages/paginate/src/item/isRepeat.ts` — repeat-flag guard, matching the `item/isLeaf.ts` one-function pattern
- Create: `packages/paginate/src/fragment/repeatPrefix.ts` — computes continuation prefix fragments (detection + progress guard + lazy origins)
- Modify: `packages/paginate/src/types.ts` — `repeat?: boolean` on `LeafItem`/`ColumnItem`/`RowItem`/`LazyItem`; `origin?: LazyItem` on `Fragment`
- Modify: `packages/paginate/src/fit/column.ts` — prepend prefix when building the continuation
- Modify: `packages/paginate/src/lazy/materialize.ts` — tag materialized fragments of a repeat lazy with their `origin`
- Modify: `packages/layout/src/paginate/toItems.ts` — keep nested `fixed` nodes in the flow, mark their items `repeat: true`
- Modify: `packages/paginate/README.md` — document the flag
- Modify: `docs/superpowers/specs/2026-08-17-paginate-repeat-design.md` — align the progress-guard wording with the implemented rule
- Test: `packages/paginate/tests/paginate.test.ts` — new `describe('repeat')` block
- Test: `packages/layout/tests/paginate/paginate.test.ts` — new `describe('nested fixed')` block

---

### Task 1: `repeat` flag — types, detection, continuation prefix

**Files:**
- Modify: `packages/paginate/src/types.ts`
- Create: `packages/paginate/src/item/isRepeat.ts`
- Create: `packages/paginate/src/fragment/repeatPrefix.ts`
- Modify: `packages/paginate/src/fit/column.ts`
- Test: `packages/paginate/tests/paginate.test.ts`

- [ ] **Step 1: Write the failing test**

In `packages/paginate/tests/paginate.test.ts`, add a `repeatLeaf` helper next to the existing `leaf` helper (around line 47):

```ts
const repeatLeaf = (height: number, id: string): LeafItem => ({
  kind: 'leaf',
  height,
  id,
  repeat: true,
});
```

Add a new top-level `describe` block (next to the existing ones, e.g. after `'multi-page splits'`):

```ts
describe('repeat', () => {
  test('a repeat leaf re-emits at the top of every continuation', () => {
    const items: Item[] = [
      repeatLeaf(10, 'h'),
      leaf(30, 'a'),
      leaf(30, 'b'),
      leaf(30, 'c'),
    ];
    const pages = paginateFlow(items, 50);

    expect(pages.map((p) => p.map((c) => c.item.id))).toEqual([
      ['h', 'a'],
      ['h', 'b'],
      ['h', 'c'],
    ]);
    snapshotPages(paginate(column(items), 50), region(50), 'repeat-basic');
  });
});
```

Arithmetic: page height 50. Page 1 packs `h`(10) + `a`(30); `b` overflows. The completed `h` re-emits, so page 2 packs `h` + `b`, page 3 packs `h` + `c`.

- [ ] **Step 2: Run test to verify it fails**

```bash
yarn vitest run --project @react-pdf/paginate packages/paginate/tests/paginate.test.ts -t 'repeat leaf re-emits'
```

Expected: FAIL — `repeat` is not a known property (TS) and/or pages come out as `[['h','a'],['b'],['c']]`.

- [ ] **Step 3: Add the flag to the item types**

In `packages/paginate/src/types.ts`, add `repeat?: boolean;` to `LeafItem`, `ColumnItem`, `RowItem`, and `LazyItem` — after each `id?: string;` line. Do NOT add it to `SpacerItem` or `PenaltyItem` (spec §4.1). Example for `LeafItem`:

```ts
export interface LeafItem {
  kind: 'leaf';
  height: number;
  id?: string;
  repeat?: boolean;
  data?: unknown;
  split?: (availHeight: number) => { current: LeafItem; next: LeafItem } | null;
}
```

- [ ] **Step 4: Create the flag guard**

Create `packages/paginate/src/item/isRepeat.ts`:

```ts
import { Item } from '../types';

const isRepeat = (item: Item): boolean =>
  'repeat' in item && item.repeat === true;

export default isRepeat;
```

- [ ] **Step 5: Create the prefix builder**

Create `packages/paginate/src/fragment/repeatPrefix.ts`:

```ts
import toFragments from './toFragments';
import isRepeat from '../item/isRepeat';
import { FillResult, Fragment, Item, PlacedItem } from '../types';

const fullyPlaced = (placed: PlacedItem[], item: Item) =>
  placed.some((p) => p.item === item && p.part.isLast);

// Fresh fragments of the container's completed repeat children, prepended to
// its continuation. Only an item that fully placed on this page re-emits: a
// mid-split item continues its own remainder instead, and an unplaced one is
// still in `remaining` and needs no copy.
const repeatPrefix = (fragment: Fragment, inner: FillResult): Fragment[] => {
  const completed = fragment.children
    .map((child) => child.item)
    .filter((item) => isRepeat(item) && fullyPlaced(inner.placed, item));

  return toFragments(completed);
};

export default repeatPrefix;
```

Why identity (`p.item === item`) works: a partially-placed child's continuation fragment keeps the same `item` reference but its placement carries `part.isLast: false`; a split leaf's remainder is a *different* item entirely. Both correctly fail the `fullyPlaced` check.

- [ ] **Step 6: Prepend the prefix in `fit/column`**

In `packages/paginate/src/fit/column.ts`, add the import:

```ts
import repeatPrefix from '../fragment/repeatPrefix';
```

and change the continuation construction (currently `children: inner.remaining`):

```ts
  const continuation: Fragment = {
    item,
    isFirst: false,
    children: [...repeatPrefix(fragment, inner), ...inner.remaining],
  };
```

Leave the earlier forced-break-before-anything `DONE` path untouched — `inner.placed` is empty there, so nothing has completed and the prefix would be empty by construction.

Note the self-sustaining loop: `toFragments` keeps item references, so the prefix fragment on page N+1 is a repeat-flagged child of that page's `fragment.children`, and completes → re-emits again for page N+2.

- [ ] **Step 7: Run test to verify it passes**

```bash
yarn vitest run --project @react-pdf/paginate packages/paginate/tests/paginate.test.ts -t 'repeat leaf re-emits'
```

Expected: PASS (a new snapshot `repeat-basic` is written on first run).

- [ ] **Step 8: Run the whole engine suite to check for regressions**

```bash
yarn vitest run packages/paginate
```

Expected: all tests PASS.

- [ ] **Step 9: Commit**

```bash
git add packages/paginate/src packages/paginate/tests
git commit -m "feat(paginate): repeat flag re-emits items on parent continuations"
```

---

### Task 2: Rule verification — placed-once, order, forced breaks, lifetime

These behaviors should already hold from Task 1's design. Write the tests; if any fails, the bug is in `repeatPrefix`/`fit/column`, not the tests — the expected page shapes below are derived from the spec.

**Files:**
- Test: `packages/paginate/tests/paginate.test.ts` (inside `describe('repeat')`)

- [ ] **Step 1: Add the four tests**

```ts
  test('a repeat item does not appear before its flow position', () => {
    const items: Item[] = [
      leaf(40, 'a'),
      leaf(40, 'b'),
      repeatLeaf(10, 'h'),
      leaf(40, 'c'),
      leaf(40, 'd'),
    ];
    const pages = paginateFlow(items, 50);

    expect(pages.map((p) => p.map((c) => c.item.id))).toEqual([
      ['a'],
      ['b', 'h'],
      ['h', 'c'],
      ['h', 'd'],
    ]);
    snapshotPages(paginate(column(items), 50), region(50), 'repeat-placed-once');
  });

  test('multiple repeat items re-emit in original order', () => {
    const items: Item[] = [
      repeatLeaf(10, 'h1'),
      repeatLeaf(10, 'h2'),
      leaf(25, 'a'),
      leaf(25, 'b'),
      leaf(25, 'c'),
    ];
    const pages = paginateFlow(items, 50);

    expect(pages.map((p) => p.map((c) => c.item.id))).toEqual([
      ['h1', 'h2', 'a'],
      ['h1', 'h2', 'b'],
      ['h1', 'h2', 'c'],
    ]);
    snapshotPages(paginate(column(items), 50), region(50), 'repeat-order');
  });

  test('repeats re-emit after a forced break', () => {
    const items: Item[] = [
      repeatLeaf(10, 'h'),
      leaf(20, 'a'),
      FORCE_BREAK,
      leaf(20, 'b'),
    ];
    const pages = paginateFlow(items, 100);

    expect(pages.map((p) => p.map((c) => c.item.id))).toEqual([
      ['h', 'a'],
      ['h', 'b'],
    ]);
    snapshotPages(paginate(column(items), 100), region(100), 'repeat-force-break');
  });

  test('repetition ends with the parent container', () => {
    const table = column(
      [repeatLeaf(10, 'th'), leaf(25, 'r1'), leaf(25, 'r2')],
      'table',
    );
    const items: Item[] = [table, leaf(40, 'after1'), leaf(40, 'after2')];
    const pages = paginateFlow(items, 50);

    expect(pages.map((p) => p.map((c) => c.item.id))).toEqual([
      ['table'],
      ['table'],
      ['after1'],
      ['after2'],
    ]);
    expect(pages[0][0].children?.map((c) => c.item.id)).toEqual(['th', 'r1']);
    expect(pages[1][0].children?.map((c) => c.item.id)).toEqual(['th', 'r2']);
    snapshotPages(paginate(column(items), 50), region(50), 'repeat-nested-lifetime');
  });
```

Derivations: *placed-once* — `h` sits after `b`, so page 1 is `a` alone (40+40 > 50) with no early `h`; page 2 packs `b`(40)+`h`(10) = exactly 50; only then does `h` start repeating. *Lifetime* — the header repeats inside the table's fragments (pages 1–2) and never appears once the table completes; `after1`/`after2` are 40 each so 40+40 > 50 forces one per page.

- [ ] **Step 2: Run the tests**

```bash
yarn vitest run --project @react-pdf/paginate packages/paginate/tests/paginate.test.ts -t 'repeat'
```

Expected: PASS (4 new snapshots written). If a test fails, compare the actual page arrays against the derivations above and fix `repeatPrefix` — do not adjust the expectations.

- [ ] **Step 3: Commit**

```bash
git add packages/paginate/tests
git commit -m "test(paginate): repeat placed-once, order, force-break, lifetime"
```

---

### Task 3: Progress guard

A page that placed nothing but repeat items made no progress; repeating onto the next page would recreate the same page forever (caught only by `MAX_PAGES` at 10,000). Drop the prefix in that case so content advances.

Note: the spec (§4.2.5/§5) also describes a height-based guard (`prefix >= page height`). Analysis during planning showed it is unreachable — items that completed on a page necessarily sum to less than the page height, and oversized force-placed repeats are caught by the placed-only-repeats rule below. Implement only this rule; Task 7 aligns the spec wording.

**Files:**
- Modify: `packages/paginate/src/fragment/repeatPrefix.ts`
- Test: `packages/paginate/tests/paginate.test.ts` (inside `describe('repeat')`)

- [ ] **Step 1: Write the failing test**

```ts
  test('repeats stop when a page places nothing but repeats', () => {
    const items: Item[] = [repeatLeaf(45, 'h'), leaf(30, 'a'), leaf(30, 'b')];
    const pages = paginateFlow(items, 50);

    expect(pages.map((p) => p.map((c) => c.item.id))).toEqual([
      ['h'],
      ['a'],
      ['b'],
    ]);
    snapshotPages(paginate(column(items), 50), region(50), 'repeat-progress-guard');
  });

  test('an oversized repeat force-places once and does not wedge', () => {
    const items: Item[] = [repeatLeaf(60, 'h'), leaf(30, 'a')];
    const pages = paginateFlow(items, 50);

    expect(pages.map((p) => p.map((c) => c.item.id))).toEqual([['h'], ['a']]);
    snapshotPages(paginate(column(items), 50), region(50), 'repeat-oversized');
  });
```

Derivation of the wedge without the guard: page 1 places only `h` (45+30 > 50) → prefix `h` → page 2 places only `h` again → identical state forever.

- [ ] **Step 2: Run to verify the first test fails**

```bash
yarn vitest run --project @react-pdf/paginate packages/paginate/tests/paginate.test.ts -t 'nothing but repeats'
```

Expected: FAIL with the `[paginate] Exceeded 10000 pages` error (the infinite-loop backstop firing).

- [ ] **Step 3: Add the guard**

In `packages/paginate/src/fragment/repeatPrefix.ts`, insert at the top of `repeatPrefix`, before `completed` is computed:

```ts
  // A page that placed nothing but repeats made no progress — stop repeating
  // so content can advance (MAX_PAGES remains the backstop). Once dropped,
  // the items are gone from children and repetition ends for this container.
  if (inner.placed.length > 0 && inner.placed.every((p) => isRepeat(p.item)))
    return [];
```

- [ ] **Step 4: Run both tests to verify they pass**

```bash
yarn vitest run --project @react-pdf/paginate packages/paginate/tests/paginate.test.ts -t 'repeat'
```

Expected: PASS (all repeat tests, one new snapshot).

- [ ] **Step 5: Commit**

```bash
git add packages/paginate/src/fragment/repeatPrefix.ts packages/paginate/tests
git commit -m "feat(paginate): drop repeat prefix when a page makes no progress"
```

---

### Task 4: Mid-split behavior

A repeat item that splits continues its own remainder — no extra fresh copy. The split's `next` is a new item without the flag, so repetition ceases after a split (a split consumes the item's identity). This holds by construction; the test locks it in.

**Files:**
- Test: `packages/paginate/tests/paginate.test.ts` (inside `describe('repeat')`)

- [ ] **Step 1: Add the test**

```ts
  test('a splitting repeat item continues its remainder without a fresh copy', () => {
    const items: Item[] = [
      { ...splittable(80, 'h'), repeat: true },
      leaf(15, 'a'),
    ];
    const pages = paginateFlow(items, 50);

    expect(pages.map((p) => p.map((c) => c.item.id))).toEqual([
      ['h'],
      ['h/2', 'a'],
    ]);
    snapshotPages(paginate(column(items), 50), region(50), 'repeat-mid-split');
  });
```

Derivation: `h`(80) splits 50/30 across pages 1–2. Page 1's placement has `part.isLast: false` → not completed → no prefix. Page 2 holds the remainder `h/2`(30) + `a`(15); no duplicate `h` anywhere.

- [ ] **Step 2: Run to verify it passes**

```bash
yarn vitest run --project @react-pdf/paginate packages/paginate/tests/paginate.test.ts -t 'splitting repeat'
```

Expected: PASS. If a fresh `h` copy appears on page 2, `fullyPlaced` is wrongly matching a `part.isLast: false` placement.

- [ ] **Step 3: Commit**

```bash
git add packages/paginate/tests
git commit -m "test(paginate): splitting repeat item does not duplicate"
```

---

### Task 5: Repeat + lazy — re-materialize per page

`materialize` splices a lazy's output *in place of* the lazy in the fragment array (`lazy/materialize.ts:16`), so after commit the lazy item is no longer discoverable from `fragment.children`. Provenance is kept with an `origin` tag: materialized fragments of a repeat lazy remember their source, and when all of a source's output fully places, the *lazy itself* re-emits — re-materializing on the next page with a fresh `pageNumber`.

**Files:**
- Modify: `packages/paginate/src/types.ts` (Fragment)
- Modify: `packages/paginate/src/lazy/materialize.ts`
- Modify: `packages/paginate/src/fragment/repeatPrefix.ts`
- Test: `packages/paginate/tests/paginate.test.ts` (inside `describe('repeat')`)

- [ ] **Step 1: Write the failing test**

```ts
  test('a repeat lazy re-materializes with the page it lands on', () => {
    const header: LazyItem = {
      kind: 'lazy',
      repeat: true,
      materialize: (ctx) => [leaf(10, `h${ctx.pageNumber}`)],
    };
    const items: Item[] = [header, leaf(30, 'a'), leaf(30, 'b'), leaf(30, 'c')];
    const pages = paginateFlow(items, 50);

    expect(pages.map((p) => p.map((c) => c.item.id))).toEqual([
      ['h1', 'a'],
      ['h2', 'b'],
      ['h3', 'c'],
    ]);
    snapshotPages(paginate(column(items), 50), region(50), 'repeat-lazy');
  });
```

- [ ] **Step 2: Run to verify it fails**

```bash
yarn vitest run --project @react-pdf/paginate packages/paginate/tests/paginate.test.ts -t 'repeat lazy'
```

Expected: FAIL — pages come out as `[['h1','a'],['b'],['c']]` (the lazy dissolves and never repeats).

- [ ] **Step 3: Add `origin` to Fragment**

In `packages/paginate/src/types.ts`:

```ts
export interface Fragment {
  item: Item;
  isFirst: boolean;
  children: Fragment[];
  origin?: LazyItem;
}
```

- [ ] **Step 4: Tag materialized fragments in `materialize`**

In `packages/paginate/src/lazy/materialize.ts`, add the import:

```ts
import isRepeat from '../item/isRepeat';
```

and after `const materialized = toFragments(produced);` add:

```ts
  if (isRepeat(item)) materialized.forEach((f) => (f.origin = item));
```

- [ ] **Step 5: Teach `repeatPrefix` about origins**

Replace the body of `packages/paginate/src/fragment/repeatPrefix.ts` with:

```ts
import toFragments from './toFragments';
import isRepeat from '../item/isRepeat';
import { FillResult, Fragment, Item, PlacedItem } from '../types';

const fullyPlaced = (placed: PlacedItem[], item: Item) =>
  placed.some((p) => p.item === item && p.part.isLast);

// Fresh fragments of the container's completed repeat children, prepended to
// its continuation. Only an item that fully placed on this page re-emits: a
// mid-split item continues its own remainder instead, and an unplaced one is
// still in `remaining` and needs no copy. A materialized fragment re-emits
// its source lazy instead of its own item, so the lazy re-materializes next
// page with a fresh page number.
const repeatPrefix = (fragment: Fragment, inner: FillResult): Fragment[] => {
  // A page that placed nothing but repeats made no progress — stop repeating
  // so content can advance (MAX_PAGES remains the backstop). Once dropped,
  // the items are gone from children and repetition ends for this container.
  const isRepeatPlacement = (p: PlacedItem) =>
    isRepeat(p.item) ||
    fragment.children.some((f) => f.origin !== undefined && f.item === p.item);

  if (inner.placed.length > 0 && inner.placed.every(isRepeatPlacement))
    return [];

  const sources: Item[] = [];

  for (const child of fragment.children) {
    if (child.origin !== undefined) {
      const { origin } = child;
      if (sources.includes(origin)) continue;

      const output = fragment.children.filter((f) => f.origin === origin);
      if (output.every((f) => fullyPlaced(inner.placed, f.item)))
        sources.push(origin);
    } else if (isRepeat(child.item) && fullyPlaced(inner.placed, child.item)) {
      sources.push(child.item);
    }
  }

  return toFragments(sources);
};

export default repeatPrefix;
```

Why this sees the materialized fragments at all: `fill` assigns the passed array to `state.fragments` without copying, and `materialize` splices into it — so by the time `fit/column` calls `repeatPrefix`, `fragment.children` already holds the lazy's tagged output in the lazy's old position (preserving prefix order).

- [ ] **Step 6: Run the test to verify it passes, then the full engine suite**

```bash
yarn vitest run --project @react-pdf/paginate packages/paginate/tests/paginate.test.ts -t 'repeat lazy'
yarn vitest run packages/paginate
```

Expected: both PASS.

- [ ] **Step 7: Commit**

```bash
git add packages/paginate/src packages/paginate/tests
git commit -m "feat(paginate): repeat lazy re-materializes on each continuation"
```

---

### Task 6: Adapter — nested `fixed` maps to `repeat`

Today `flowChildren` (`toItems.ts:47-50`) filters `fixed` nodes out of the flow at every depth, and split containers rebuild from placements only — so a nested `fixed` inside a splitting container is silently dropped. Keep nested `fixed` nodes in the flow and mark their items `repeat: true`. The top-level filter in `toItems` stays — direct page children keep the `flowTop` template treatment (spec §3).

**Files:**
- Modify: `packages/layout/src/paginate/toItems.ts`
- Test: `packages/layout/tests/paginate/paginate.test.ts`

- [ ] **Step 1: Write the failing tests**

In `packages/layout/tests/paginate/paginate.test.ts`, add a helper next to `view`:

```ts
const fixedView = (style, children = []): any => ({
  type: 'VIEW',
  props: { fixed: true },
  style,
  children,
});
```

Add a new `describe` block:

```ts
describe('nested fixed', () => {
  test('a nested fixed child repeats on every fragment of its container', async () => {
    const pages = await run({ width: 100, height: 100 }, [
      view({}, [
        fixedView({ height: 20 }),
        view({ height: 70 }),
        view({ height: 70 }),
      ]),
    ]);

    expect(pages).toHaveLength(2);
    expect(boxes(pages[0]).map((b) => [b.top, b.height])).toEqual([
      [0, 100], // container fragment runs to the page edge
      [0, 20], // fixed header
      [20, 70],
    ]);
    expect(boxes(pages[1]).map((b) => [b.top, b.height])).toEqual([
      [0, 90], // 20 + 70
      [0, 20], // fresh copy of the header
      [20, 70],
    ]);
  });

  test('a nested fixed child of a whole container appears once', async () => {
    const pages = await run({ width: 100, height: 100 }, [
      view({}, [fixedView({ height: 20 }), view({ height: 30 })]),
    ]);

    expect(pages).toHaveLength(1);
    expect(boxes(pages[0]).map((b) => [b.top, b.height])).toEqual([
      [0, 50],
      [0, 20],
      [20, 30],
    ]);
  });
});
```

- [ ] **Step 2: Run to verify the first test fails**

```bash
yarn vitest run packages/layout/tests/paginate/paginate.test.ts -t 'nested fixed'
```

Expected: first test FAILS — the fixed header is missing from both fragments (dropped from the stream). The second may pass already (whole containers keep their subtree); that's fine.

- [ ] **Step 3: Keep nested fixed nodes in the flow**

In `packages/layout/src/paginate/toItems.ts`, change `flowChildren` to filter only absolutes:

```ts
const flowChildren = (node: SafeNode): SafeNode[] =>
  ((node.children || []) as SafeNode[]).filter((child) => !isAbsolute(child));
```

Do NOT touch the filter inside `toItems` at the bottom of the file (`!isAbsolute(node) && !isFixed(node)`) — that one excludes direct page children, which the page template handles.

- [ ] **Step 4: Mark fixed children's items as repeat**

Still in `toItems.ts`, in `toItem`'s children mapping (currently `const item = toItem(child, env);`), mark fixed children:

```ts
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
```

(`toItem` only ever returns leaf/column/lazy items, all of which carry `repeat` — the `as Item` cast covers the union.)

- [ ] **Step 5: Run the new tests, then both affected suites**

```bash
yarn vitest run packages/layout/tests/paginate/paginate.test.ts -t 'nested fixed'
yarn vitest run packages/layout packages/paginate
npx tsc --noEmit -p packages/layout
```

Expected: all PASS, typecheck clean. If existing layout tests regress, the likely cause is a fixed node that previously vanished from the flow now occupying space — inspect with the `boxes` helper before changing anything.

- [ ] **Step 6: Commit**

```bash
git add packages/layout/src/paginate/toItems.ts packages/layout/tests
git commit -m "feat(layout): nested fixed nodes repeat via the paginate repeat flag"
```

---

### Task 7: Docs — README section and spec alignment

**Files:**
- Modify: `packages/paginate/README.md`
- Modify: `docs/superpowers/specs/2026-08-17-paginate-repeat-design.md`

- [ ] **Step 1: Document the flag in the README**

In `packages/paginate/README.md`, add after the `LazyItem` section (before `## License`):

````markdown
## Repeating items

Any content-bearing item (`leaf`, `column`, `row`, `lazy` — not `spacer` or
`penalty`) may carry `repeat: true`. When its parent column breaks, a fresh
copy re-emits at the head of every continuation — the way a table header
repeats on each page the table spans.

```js
const table = {
  kind: 'column',
  children: [
    { kind: 'row', repeat: true, children: headerCells },
    ...bodyRows,
  ],
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
````

- [ ] **Step 2: Align the spec's progress-guard wording**

In `docs/superpowers/specs/2026-08-17-paginate-repeat-design.md`:

Replace rule 5 in §4.2 with:

```markdown
5. **Progress guard.** The prefix is dropped when the page it is built from placed nothing but repeat items (or repeat-lazy output) — a page must place at least one non-repeat fragment for repetition to continue, so `repeat` can never wedge the paginator (`MAX_PAGES` remains the backstop). Once dropped, the items are gone from the continuation and repetition ends for that container.
```

Replace the "### Progress guard placement" paragraph in §5 with:

```markdown
### Progress guard placement

The guard is evaluated where the prefix is built (`fragment/repeatPrefix.ts`, called from `fit/column`): if every placement on the just-filled page is a repeat item or repeat-lazy output, the prefix is omitted. A height-based check (prefix ≥ page height) proved unnecessary during implementation — items that completed on a page alongside any content necessarily sum to less than the page height, and an oversized force-placed repeat yields a repeats-only page, which this rule already catches.
```

In the §7 table, replace the "Repeat item taller than the page" row with:

```markdown
| Repeat item taller than the page | Force-places alone at the top of a page; that page holds only repeats, so the guard ends the repetition and content proceeds. |
```

Append to rule 2 in §4.2 (placed-once), after "not an additional fresh copy.":

```markdown
A split consumes the item's identity: once split, it does not re-emit on later continuations.
```

- [ ] **Step 3: Full verification run**

```bash
yarn vitest run packages/paginate packages/layout
yarn vitest run packages/renderer --project @react-pdf/renderer
npx tsc --noEmit -p packages/paginate
npx tsc --noEmit -p packages/layout
```

Expected: all suites PASS, both typechecks clean.

- [ ] **Step 4: Commit**

```bash
git add packages/paginate/README.md docs/superpowers/specs/2026-08-17-paginate-repeat-design.md
git commit -m "docs(paginate): document repeat flag; align spec guard wording"
```
