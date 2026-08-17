# Repeating Items (`repeat` flag) — Design Spec

**Date**: 2026-08-17
**Status**: Design approved; pending implementation plan
**Scope**: Add a `repeat` flag to `@react-pdf/paginate` items, so an item re-emits at the head of every continuation of its parent container. Adapt `@react-pdf/layout` to map nested `fixed` nodes onto it.

---

## 1. Motivation

1. **Nested `fixed` regression.** Legacy pagination repeated a `fixed` child on every page-fragment of its parent container (`splitNodes` pushed it into both current and next children). The new adapter filters `fixed` nodes out of the item stream at every depth (`toItems.ts` → `flowChildren`), and `fromPage` rebuilds split containers from engine placements only — so a `fixed` node inside a container that breaks across pages is silently dropped from every fragment.
2. **Repetition is a packing concern.** A repeated item consumes page budget on every continuation, so packing decisions depend on it. The adapter cannot pre-inject repetitions (break points aren't known yet) nor post-inject them (the partition would be wrong by their height). Only the engine knows where continuations begin; the feature belongs there — the same reasoning that placed `split`, `lazy`, and penalties in the engine.
3. **Unlocks repeating table headers.** `<thead>`-style repetition — a header row re-appearing at the top of every page a table spans — is a long-requested react-pdf capability that legacy never had. With `repeat`, it is the same mechanism as nested `fixed`.

## 2. Goals

- One new concept: an item flagged `repeat: true` re-emits at the head of each continuation fragment of its immediate parent container, consuming budget like any other item.
- Fix the nested-`fixed` drop by mapping in-flow nested `fixed` nodes to `repeat: true` items in `toItems`.
- Compose with existing primitives: a `repeat` + `lazy` item re-materializes on each page it lands on, with that page's number (a page-aware repeating header).

## 3. Non-goals

- **Page-level header band.** Direct `fixed` children of a `Page` keep the current template treatment in `splitPage` (`flowTop` band subtraction + rebuild slot). Migrating the band onto `repeat` is a possible later cleanup, not part of this change.
- **Repetition inside rows.** Rows lay children side by side; repetition is a vertical-flow concept. `repeat` on a row's _children_ is ignored. `repeat` on a row itself (as a column child) is the table-header case and is supported.
- **Bottom-anchored repetition (footers).** Footers live in page padding today and keep working that way. A `repeatAfter`/footer band is out of scope.
- **Legacy's early appearance.** Legacy pulled upcoming fixed siblings onto pages _before_ the flow reached them (`futureFixedNodes`). This was a quirk, not a behavior to preserve.

## 4. Semantics

### 4.1 The flag

```ts
{ kind: 'leaf' | 'column' | 'row' | 'lazy', repeat?: true, ... }
```

Valid on content-bearing item kinds. Not valid on `penalty` or `spacer` — spacers are derived spacing (edges, gaps), and a bare repeating space has no use case of its own; whatever spacing a repeated item needs travels inside it (its own edges) or is re-derived by the adapter.

### 4.2 Rules

1. **Scope.** Repetition is relative to the item's immediate parent column. When that column produces a continuation fragment (page break or forced break inside it), the continuation's children begin with fresh copies of the column's completed `repeat` children, in their original relative order, followed by the column's remaining content.
2. **Placed-once.** An item re-emits only on continuations created _after_ it has fully placed (its last fragment committed). Before the flow reaches it, it does not appear early. While it is itself mid-split, the continuation carries its own remainder — not an additional fresh copy. A split consumes the item's identity: once split, it does not re-emit on later continuations.
3. **Fresh copies.** Each repetition is a new fragment of the original item: it carries its own `part` flags, may split like any item, and a `lazy` repetition re-materializes with the page number it lands on.
4. **Lifetime.** Repetition ends with the parent: once the column's last fragment is placed, no continuation exists and nothing re-emits.
5. **Progress guard.** The prefix is dropped when the page it is built from placed nothing but repeat items (or repeat-lazy output) — a page must place at least one non-repeat fragment for repetition to continue, so `repeat` can never wedge the paginator (`MAX_PAGES` remains the backstop). Once dropped, the items are gone from the continuation and repetition ends for that container.
6. **Output.** Repetitions appear in `Page[]` as ordinary `PlacedItem`s. No new output fields.

### 4.3 Nesting

The rule composes by locality: a `repeat` child of an inner column repeats on that column's continuations; if the outer column breaks but the inner column landed whole on an earlier page, the inner column is finished and nothing repeats. This matches thead semantics (a table's header repeats only while the table is still open) and legacy's per-container behavior for nested `fixed`.

## 5. Engine changes (`@react-pdf/paginate`)

- `types.ts`: add `repeat?: boolean` to `LeafItem`, `ColumnItem`, `RowItem`, `LazyItem` (not `SpacerItem` or `PenaltyItem`).
- **Two choke points**, both calling the shared `fragment/repeatFragments.ts`: continuation construction in `fit/column.ts` (both `DONE` paths — the forced-break-before-anything path and the normal broke path), and `fit/row.ts`'s `place()`, which also builds continuations inline for column children of a row. At each site, when building `{ item, isFirst: false, children }`:
  1. Determine the completed `repeat` children: repeat-flagged direct children whose fragments are fully placed (present in neither `inner.remaining` nor as its partially-placed head).
  2. Build fresh fragments for them via `toFragments` and prepend to `inner.remaining`, subject to the progress guard (4.2.5).
- The root column's continuation is built by the same code path (the outer `fill` runs `fit/column` on the root fragment), so no changes to `index.ts`'s page loop.
- Overflow paths (`deferToNextPage`, `spillOntoOwnPage`, `rewindToBestBreak`, `trySplitLeaf`) construct remaining lists _within_ a level; they bubble up through the continuation-building sites above and need no changes of their own.
- `README.md`: document the flag alongside the other item behaviors.

### Progress guard placement

The guard is evaluated where the prefix is built (`fragment/repeatFragments.ts`): if every placement on the just-filled page is a repeat item or repeat-lazy output, the prefix is omitted. A height-based check (prefix ≥ page height) proved unnecessary during implementation — items that completed on a page alongside any content necessarily sum to less than the page height, and an oversized force-placed repeat yields a repeats-only page, which this rule already catches.

## 6. Adapter changes (`@react-pdf/layout`)

- `toItems.ts`: `flowChildren` currently filters `isFixed` at every depth. Change: at _nested_ levels (not direct page children), a `fixed` in-flow node stays in the flow and maps to its item with `repeat: true`. Direct page children keep the existing template treatment in `splitPage`.
- `fromPage.ts`: no changes — repetitions arrive as ordinary placements carrying their node in `data`.
- Duplicate-sensitive props on repeated nodes (`bookmark`, `id` link destinations) are stripped on repetitions the same way `splitPage` strips `bookmark` from continuation pages. If this proves insufficient it is an adapter follow-up, not an engine concern.

## 7. Edge cases

| Case                                      | Behavior                                                                                                                      |
| ----------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| Repeat item taller than the page          | Force-places alone at the top of a page; that page holds only repeats, so the guard ends the repetition and content proceeds. |
| Repeat + `FORCE_BREAK` in parent          | Forced break creates a continuation → prefix applies.                                                                         |
| Repeat item is `lazy`                     | Re-materializes per repetition with the landing `pageNumber`.                                                                 |
| Repeat on a `penalty` or `spacer`         | Type error (flag not present on those kinds).                                                                                 |
| Repeat on a row's child                   | Ignored (rows don't fragment vertically per child).                                                                           |
| Multiple repeat children                  | All completed ones re-emit, original order, before remaining content.                                                         |
| `wrap={false}` page (`height = Infinity`) | One page, no continuations, flag inert.                                                                                       |

## 8. Testing

Engine (`packages/paginate/tests/`):

- Basic: column `[header(repeat), a, b, c]` over 2 pages → page 2 starts with a fresh header before `c`.
- Placed-once: repeat child positioned after the first break never appears before its flow position.
- Mid-split: a splitting repeat item continues its remainder on the next page without an extra copy.
- Order: two repeat children re-emit in original order.
- Progress guard: repeat prefix ≥ page height → continuations proceed without prefix.
- Lazy repeat: materializer sees the correct `pageNumber` on each page.
- Nested: inner column's repeat child stops repeating once the inner column completes.
- Every case above ends with a visual snapshot (`snapshotPages(...)`) per repo convention — snapshots are the primary assertion for repeat placement; structural checks alone don't catch visually wrong repetition.

Layout (`packages/layout/tests/paginate/`):

- Nested `fixed` inside a splitting container appears on every fragment of that container (regression test for the current drop).
- Nested `fixed` inside a whole (non-splitting) container appears exactly once.

## 9. Implementation order

1. Engine: types + `fit/column` continuation prefix + progress guard + engine tests.
2. Adapter: `toItems` nested-`fixed` mapping + layout tests.
3. Docs: paginate `README.md` section.
