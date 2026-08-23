# Pagination Rewrite — Design Spec

**Date**: 2026-04-19
**Status**: Implemented. The engine shipped as `@react-pdf/paginate` and is wired into `@react-pdf/layout`. Historical design note — some shapes evolved in implementation: the item stream (§5–6) became the engine's *internal* representation, and the public API is now a box-model node schema (`FlowNode` in, `PlacedNode` out; see the package README). Inter-item hints (`keepWithNext`, `minPresenceAhead`) were not ported.
**Scope**: Full rewrite of `@react-pdf/layout`'s pagination step (`resolvePagination.ts`) as a standalone, decoupled package, developed in parallel to the existing implementation and swapped in a single cutover.

---

## 1. Motivation

The existing pagination algorithm in `packages/layout/src/steps/resolvePagination.ts` has accumulated several structural issues that are becoming hard to fix incrementally:

1. **O(n²) performance.** Every split triggers a full Yoga relayout of both resulting pages. Long documents pay this cost repeatedly. Reported in user-facing GitHub issues.
2. **Layout-first, paginate-after.** Each page's entire child tree is laid out before any break is considered. Features that require knowing the *remaining* space in the current page — multi-column text, footnotes, any region-flow behavior — cannot be expressed in this model.
3. **Tight coupling to React-PDF internals.** Pagination logic interleaves directly with `splitNode`, `splitText`, `resolveDynamicNodes`, Yoga calls, bookmark handling, and React-PDF's node types. No isolation boundary, no independent tests.
4. **High complexity.** `splitNodes` mixes five edge cases (fixed / outside / overflow-no-wrap / break / split) with imperative control flow. `shouldBreak` embeds forward-looking heuristics (`minPresenceAhead`) that are hard to reason about.
5. **Dynamic nodes are structurally limited.** Two-pass resolution (pre-pagination for `pageNumber`, post-pagination for `totalPages`) means rendered content can desync from final layout. Render functions cannot meaningfully depend on remaining space, column context, or anything derived from the paginator's state.

## 2. Goals

- Replace the pagination step with an algorithm that is **streaming by page**, not layout-then-slice.
- Move the pagination engine into its own package with **no dependency on React, Yoga, or React-PDF node types**. The engine operates on a generic `Item` interface.
- Reduce the algorithm to a **small number of declarative primitives** (atoms, glue, penalties) rather than a tangle of edge cases.
- Support dynamic content whose rendered output depends on the page it lands on, **including cases where the rendered output changes the layout of sibling elements**.
- Unblock future features that today require rewriting pagination: multi-column pages, footnotes, side regions, and eventually tables of contents. These features are *not* built in V1, but the design must not foreclose them — in particular, the fixed-point iteration pattern introduced for `totalPages` (§9) is the same shape that would later extend to TOC-style derivations.

## 3. Non-goals

- **Globally optimal page-breaking** (Knuth-Plass-style dynamic programming across the whole document to minimize total break cost). The engine is greedy per page with best-break-seen selection, matching TeX's page-builder — once a break is committed, the paginator does not reconsider it later. A future pass could layer global optimization on top, but V1 does not attempt it. *Note: this is unrelated to TOC support — TOCs are about resolving content that depends on layout, which §9 handles via fixed-point iteration; they do not require global break optimization.*
- **Iterative rollout.** The new engine is developed in a private package, battle-tested, then swapped in a single cutover. The phasing described in §13 is internal development order, not a shipping sequence.
- **Replacing Yoga.** Yoga remains the layout engine for measuring individual atoms. It is called as a *measurement oracle*, not as a page layout driver.
- **New user-facing pagination features in V1.** V1 matches the current algorithm's feature set. Columns, footnotes, tables of contents, and glue-with-stretch are *structurally accommodated* by the design but do not ship as user-facing features in V1.

## 4. Design overview

### 4.1 Inspiration

The model is TeX's page-builder (vertical mode), adapted for a React / Yoga world. TeX's paragraph line-breaking (Knuth-Plass) is globally optimal; TeX's page-breaking is greedy-per-page with best-break-seen. We borrow the page-breaker, not the line-breaker:

- Content is a **vertical list** of items.
- Items are one of: **atoms** (measured rectangles), **glue** (stretchy vertical space — deferred to post-V1), **penalties** (numeric break-preference signals).
- The page-builder walks the list, accumulating height, tracking the best break candidate seen so far, and committing when forced (mandatory break, overfull).
- Inter-item features that today are hardcoded edge cases — `keepWithNext`, forced breaks, forbidden breaks — become data on the list (penalties), not code paths. Intra-leaf concerns (widows/orphans on a text paragraph) stay inside the leaf's own `split()` implementation since they depend on the leaf's internal line structure.

### 4.2 The paginator's commitment rule

Once an atom is placed on a page, the decision is final. The paginator never backtracks across page boundaries. This matches TeX and guarantees termination, at the cost of occasionally producing a suboptimal break that a global algorithm would avoid. V1 accepts this.

### 4.3 Internal shape vs. external view

- The document is **a tree** internally — container atoms hold inner item lists. Splits across pages must carry parent context (zeroed margin/padding/border on the split side).
- The paginator's traversal is a **linear cursor over breakable positions along the current vertical flow**. Break points only exist along vertical flow axes. Horizontal flex rows are measured as single atoms.

## 5. Core types

```ts
type Item = Atom | Glue | Penalty

type Atom = LeafAtom | ContainerAtom | LazyAtom

interface LeafAtom {
  kind: 'leaf'
  measure(width: number, ctx: Ctx): { height: number }
  split?(availHeight: number, ctx: Ctx): { current: LeafAtom; next: LeafAtom } | null
  hints?: Hints
  source: unknown
}

interface ContainerAtom {
  kind: 'container'
  frame: { marginTop: number; marginBottom: number
           paddingTop: number; paddingBottom: number
           borderTop: number; borderBottom: number }
  inner: Item[]
  hints?: Hints
  source: unknown
}

interface LazyAtom {
  kind: 'lazy'
  materialize(ctx: Ctx): Item[]
  needsTotalPages?: boolean
  hints?: Hints
  source: unknown
}

interface Glue {
  kind: 'glue'
  size: number
  stretch?: number   // deferred to post-V1
  shrink?: number    // deferred to post-V1
}

interface Penalty {
  kind: 'penalty'
  cost: number   // -Infinity = must break, +Infinity = must not break
}

interface Hints {
  // Inter-item hints — canonicalized into Penalty items at translate time.
  keepWithNext?: boolean
  breakBefore?: boolean
  breakAfter?: boolean

  // Intra-leaf hints — read by the leaf's own split() impl, not
  // converted to penalties. Only meaningful on leaves whose split()
  // honors them (e.g. a Text leaf).
  widows?: number
  orphans?: number
}

interface Ctx {
  pageNumber: number
  totalPages?: number
}
```

Hints are a convenience field on atoms. Inter-item hints (`keepWithNext`, `breakBefore`, `breakAfter`) are canonicalized into `Penalty` items around the atom at translation time, so the paginator sees a single canonical ingest shape. Intra-leaf hints (`widows`, `orphans`) are passed through untouched — the leaf's `split()` implementation is responsible for honoring them, since they depend on the leaf's internal structure (line boundaries) that the paginator never sees.

**Bookmarks, anchors, and any semantic metadata are not concerns of the paginator.** They live on each atom's `source` reference and are processed by the forward translator (Step 10 in §13) and the reverse translator (§12). The paginator only reads `measure`, `split`, `materialize`, `hints`, and frame fields.

## 6. Paginator API

```ts
interface Region {
  width: number
  height: number
}

interface PlacedItem {
  atom: Atom
  y: number
  height: number
  children?: PlacedItem[]
  // Marks whether this PlacedItem represents a whole atom, or a split slice,
  // so the reverse-translator can handle continuation-aware concerns
  // (bookmarks only on first slice, etc.).
  part: { isFirst: boolean; isLast: boolean }
}

interface PaginationResult {
  placed: PlacedItem[]
  remaining: Item[]
}

// Core: fill one region with as many items as will fit.
function fillRegion(items: Item[], region: Region, ctx: Ctx): PaginationResult

// Outer loop: turn a flow plus fixed items into a sequence of pages.
interface FixedLists {
  absolute: Item[]
  top: Item[]
  bottom: Item[]
}

function paginate(
  flow: Item[],
  fixed: FixedLists,
  pageRegion: Region
): Page[]
```

`fillRegion` is the one pure function the entire engine revolves around. `paginate` orchestrates per-page fixed items and calls `fillRegion`.

## 7. Algorithm — `fillRegion`

State: `usedHeight` (running total), `bestBreak` (last seen viable break: `{ index, y, cost }`).

For each item in order:

1. **`Penalty(-Infinity)`**: force break now. Commit everything before this penalty. Items at this position and after go to `remaining`.
2. **`Penalty(+Infinity)`**: mark subsequent positions as non-break until cleared.
3. **`Penalty(cost)` / `Glue`**: update `bestBreak` if this cost is better than the current best *and* current `usedHeight` fits within region.
4. **`LazyAtom`**: call `materialize(ctx)`, splice the result in at the lazy atom's position, do not advance the cursor (continue with the first spliced item).
5. **`LeafAtom` / `ContainerAtom`**:
   - Call `measure(region.width, ctx)`.
   - If `usedHeight + height <= region.height`: place at `y = usedHeight`, advance `usedHeight`.
   - Else:
     - **`LeafAtom` with `split`**: invoke `split(region.height - usedHeight, ctx)`. Place the `current` half, push `next` onto `remaining`.
     - **`ContainerAtom`**: recurse: `fillRegion(container.inner, innerRegion, ctx)` where `innerRegion.height = region.height - usedHeight - frame.top`. Split the container into two halves using the recursion result: current-page half with `zeroBottomFrame(frame)` wrapping `placed`; next-page half with `zeroTopFrame(frame)` wrapping `remaining`.
     - **Unsplittable and no viable `bestBreak`**: emit a warning; place the oversized atom on its own page (single-atom overflow).
     - **Unsplittable with a viable `bestBreak`**: commit at `bestBreak`; everything after goes to `remaining`.

Return `{ placed, remaining }` when the list is exhausted or after a forced commit.

### 7.1 Frame zeroing

`zeroBottomFrame({ marginTop, paddingTop, borderTop, … })` returns the same frame with `marginBottom`, `paddingBottom`, `borderBottom` set to 0. The current-page half of a split container keeps its top frame (natural start) but zeroes its bottom frame (continuation). The next-page half is the mirror.

### 7.2 Lazy re-materialization

If a lazy atom's materialization yields items that don't fit at all on the current page (first item can't fit even alone and forces a page boundary), **drop the entire materialization and re-call `materialize` with the new page's ctx**. This guarantees the render function always sees the page where its output lands first.

If the materialization fits partially — first N items fit, remainder overflows — the materialization is committed at the original pageNumber. Subsequent overflow items carry that materialization forward into later pages unchanged. The render function "saw" the page it landed on, consistent with the commitment rule.

## 8. `paginate` — outer loop

```
page = 1
remainingFlow = flow
pages = []
repeat:
  ctx = { pageNumber: page, totalPages: (from outer runner if set) }

  # Materialize per-page fixed items with the current ctx:
  topItems    = materializeAndMeasure(fixed.top, ctx)
  bottomItems = materializeAndMeasure(fixed.bottom, ctx)
  absItems    = materializeAndMeasure(fixed.absolute, ctx)

  topReserved    = sum(topItems heights)
  bottomReserved = sum(bottomItems heights)

  effectiveRegion = {
    width: pageRegion.width,
    height: pageRegion.height - topReserved - bottomReserved
  }

  { placed, remaining } = fillRegion(remainingFlow, effectiveRegion, ctx)

  # Compose the page output:
  # - topItems at y=0..topReserved
  # - placed at y=topReserved..topReserved+flowHeight
  # - bottomItems at y=pageHeight-bottomReserved..pageHeight
  # - absItems at their own absolute coordinates
  pages.push(composePage(topItems, placed, bottomItems, absItems))

  remainingFlow = remaining
  page += 1
until remainingFlow is empty
```

Key property: `fillRegion` is unaware of fixed items. All per-page orchestration lives in `paginate`.

## 9. `totalPages` — fixed-point iteration

`totalPages` is needed by lazy atoms that render `"Page X of Y"` content, but only known after the whole document has been paginated. We resolve it with a fixed-point runner wrapped around `paginate`:

1. Run `paginate` with `ctx.totalPages: undefined`.
2. Count the pages produced.
3. If any lazy atom in the tree declared `needsTotalPages: true`, re-run `paginate` with `ctx.totalPages` set to the count.
4. If the new count differs from the previous, repeat. Cap at 3 iterations.
5. If still not converged, emit a warning and use the last result.

In practice `"Page X of Y"` content barely changes size across iterations, so convergence is typical on iteration 2.

The same fixed-point shape is what would later extend to other layout-dependent derivations (e.g., table-of-contents entry page numbers, cross-references), but those are not implemented as part of V1.

## 10. Dynamic content affecting layout

**Vertical flow**: a `LazyAtom` in vertical flow materializes to items that enter `fillRegion`'s height accounting. Items following it on the same page naturally shift by the materialized height. Items that don't fit overflow.

**Inside a flex row / non-breakable container**: the `LazyAtom` is a child of a `ContainerAtom` whose `measure(width)` invokes Yoga on the subtree. During measurement, the container triggers `materialize` on any lazy descendants with the current `ctx`, feeds the resolved subtree to Yoga, and returns the measured height. Siblings inside the row are laid out by Yoga with the lazy content resolved — they shift naturally. **One measurement pass, no cycle**, because the row is measured as a single atom for a single page.

If the row doesn't fit on the current page and is forced to the next, the container is pushed to `remaining` and re-measured on the next iteration of `paginate` with the new `ctx`. Measurement is keyed by `ctx` (§11), so the re-measurement re-triggers `materialize` on any lazy descendants with the new pageNumber. This preserves the invariant that a lazy atom always sees the page where its output lands.

## 11. Yoga's role

Yoga is the **measurement oracle** for atoms. The paginator never calls Yoga directly.

- `LeafAtom.measure(width)` for an image, canvas, svg: returns measured dimensions.
- `LeafAtom.measure(width)` for a text paragraph: textkit lays out the paragraph at the given width, returning total height. The leaf's `split()` later slices along line boundaries, consulting its own `widows`/`orphans` hints.
- `ContainerAtom.measure(width)`: calls Yoga once for this subtree at the given width. Result is cached.

Yoga is called **per atom, not per page, not per split**. Measurement results are cached, **keyed by `(width, ctx)`**. The `ctx` key matters for atoms whose subtree contains lazy descendants: re-measuring the same atom at the same width but a different `pageNumber` invalidates the cache and re-triggers materialization. For atoms with no lazy descendants, the `ctx` is effectively irrelevant and the cache hits unconditionally after the first measurement.

No full-page or full-document relayout ever happens inside the paginator.

The recursive case (`fillRegion` called on `container.inner`) does not re-invoke Yoga — the inner items are already `Item[]`. Only top-level atom measurement uses Yoga.

## 12. From placed output to React-PDF layout tree

The paginator's output is a `PlacedItem[]` sequence per page, in the paginator's own type system. The renderer, bookmarks resolver, link resolver, and everything downstream of pagination in react-pdf today expect the React-PDF layout tree (one subtree per page, with React-PDF node types, `box` coordinates, `props`, `style`, `children`). A **reverse-translator** bridges the two.

The reverse-translator is a separate module (living alongside the forward translator in `@react-pdf/layout`) whose job is:

1. **Per page**: walk the `PlacedItem` tree and materialize a React-PDF `SafePageNode`.
2. For each `PlacedItem`:
   - Look up its originating React-PDF node via `atom.source`.
   - Produce a new React-PDF node with `box` populated from `{ y, height, width: region.width, x: derived }`.
   - Copy props/style from the source, **modulated by `part`**: on a non-first slice, null out `bookmark`, zero `paddingTop` / `borderTop` / `marginTop` / `borderTopLeftRadius` / `borderTopRightRadius`; on a non-last slice, zero the bottom equivalents.
   - Recurse into `children` for containers.
3. For absolute fixed items: render them into the page tree at their absolute coordinates, `part: { isFirst: true, isLast: true }` (they never split).
4. For top/bottom flow fixed items: same, slotted at their reserved y-coordinates.

**What the reverse-translator owns** (and the paginator does not):
- Bookmark handling (first-slice-only rule).
- Link substitution / link node placement.
- Border / margin / padding / radius zeroing on split halves (logically expressed as `part` flags by the paginator; mechanically applied here).
- `source`-specific semantics.

The reverse-translator is a pure function: `(placedPages: PlacedItem[][], sources: SourceMap) → SafePageNode[]`. Unit-testable with synthetic paginator output, independent of both the paginator and Yoga.

## 13. Phasing — development order

All of Part A lives in a private package with synthetic-item tests. No Yoga, no React, no integration with the rest of the monorepo.

### Part A — Pure paginator

1. **Fixed-height boxes, no splits.** Bin-packing with overflow warnings.
2. **Splittable leaves.** Leaves gain an optional `split(availHeight) → { current, next } | null` callback, and `PlacedItem` gains `part: { isFirst, isLast }`. The spec-level `ctx` argument is deferred to Step 6 (LazyAtom), which is when it first has anything meaningful to read.
3. **Container recursion.** `Item` becomes a discriminated union `LeafItem | ContainerItem` via a `kind` field. `ContainerItem` has `inner: Item[]` and `PlacedItem` gains `children?: PlacedItem[]`. When a container doesn't fit, `fillRegion` recurses into `inner` and splits the container across pages; continuation state for in-flight inner items is carried on the internal `Entry` queue. Frames (`{ marginTop, marginBottom, paddingTop, paddingBottom, borderTop, borderBottom }`) and the `zeroTopFrame`/`zeroBottomFrame` semantics are deferred to Step 4.
4. **Frames.** `ContainerItem` gains an optional `frame` field with six vertical numbers (`marginTop`/`marginBottom`/`borderTop`/`borderBottom`/`paddingTop`/`paddingBottom`). `entryHeight` returns `frameTop + sum(inner) + frameBottom`. The fit branch offsets children by the top frame and shrinks the inner recursion region by top + bottom frame. On a split, the current-page slice has its bottom frame zeroed (no bottom reservation on the inner recursion budget); the continuation carries `isFirst: false`, which zeros the top frame on the next-page placement via `effectiveFrame`. `PlacedItem.frame` records the effective (possibly zeroed) frame for downstream consumers.
5. **Forced and forbidden breaks.** `Penalty` is a zero-height third `Item` variant (`kind: 'penalty'`, `cost: number`), with only ±Infinity costs handled in this step. A `-Infinity` penalty (`FORCE_BREAK`) commits whatever has been placed so far and sends everything after it to `remaining`. A `+Infinity` penalty (`FORBID_BREAK`) suppresses the `bestBreak` update for the boundary it sits adjacent to. `fillRegion` gains a `bestBreak` cursor that tracks the latest viable break (a `{remainingIndex, placedCount}` snapshot, updated after each successful atom placement unless the next entry is a forbid penalty); on unsplittable overflow the cursor rewinds to that snapshot instead of committing at the failure point. Penalties propagate through containers via the shared fillRegion recursion.
6. **Lazy items.** `LazyItem` is a fourth `Item` variant (`kind: 'lazy'`, `materialize(ctx): Item[]`). `Ctx` (`{ pageNumber, totalPages? }`) is introduced and threaded from `paginate` into `fillRegion` (with `pageNumber` starting at 1 and incrementing per page; `totalPages` stays undefined until Step 8). On a lazy entry, `fillRegion` calls `materialize(ctx)`, converts the result via the shared `toEntries` helper, splices the materialized entries in place of the lazy, and re-processes the position. A `pendingLazy` slot tracks the in-flight, uncommitted materialization; placing any item whose index falls inside the spliced range clears it (commitment). On overflow while `pendingLazy` is still set, the lazy is un-spliced back into the entry stream so the next page re-invokes `materialize` with the advanced `pageNumber`. Empty materializations auto-commit. Lazy items inside containers materialize naturally during the inner recursion because `ctx` is threaded through. `needsTotalPages`, `hints`, and `source` remain deferred to later steps.
7. **Fixed items.** Outer `paginate(flow, fixed, pageRegion)` function.
8. **`totalPages` fixed-point iteration.** Capped multi-pass runner.

### Part B — Integration

9. **Yoga-backed atom measurement.** Swap synthetic heights for Yoga-measured atoms. Paginator unchanged.
10. **React-PDF forward translator.** Walk the element tree; produce `Item[]` and the fixed lists. This is where all React-PDF-specific mapping lives: view → container, render-prop → lazy, fixed prop → routed, break/wrap/`keepWithNext` → penalties. A `<Text>` element becomes a single `LeafAtom` whose `measure(width)` returns the paragraph's total height (lines laid out internally by textkit) and whose `split(availHeight)` slices along line boundaries while honoring the leaf's own `widows`/`orphans` hints — the paginator itself stays generic and knows nothing about text.
11. **React-PDF reverse translator.** Walk each page's `PlacedItem` tree; emit React-PDF `SafePageNode` trees ready for the renderer. Handle bookmark nulling on non-first slices, border/margin/padding zeroing on split boundaries, and `source`-derived metadata propagation (§12).
12. **Wire into renderer; regression.** Replace the old `resolvePagination` call site. Keep the old path behind a feature flag during battle-testing. Remove once confidence is high.

### Part C — New features (post-cutover)

13. **Multi-column regions.** Page region becomes `Region[]`; outer loop fills each in order.
14. **Footnotes** (scope TBD). Footnote atoms route to a secondary region; body region's effective height shrinks as footnotes accumulate.

## 14. Accepted semantic changes

- **`justifyContent: space-between` (and friends) at the page root.** In the current algorithm, this applies to the first page before splitting; semantics for continuation pages are de facto "it depends on Yoga's second relayout." In the new algorithm, flex justify/align at the page root does not meaningfully apply to content that streams across pages, because there is no whole-page layout pass post-split. The flex content participates in atom measurement inside containers as usual, so justify/align inside nested containers continues to work. This will need documentation and a migration note.
- **Glue with stretch/shrink deferred.** V1 uses numeric sizes for vertical space; stretchy glue (for future `justifyContent` behavior and clean page-body space distribution) lands post-V1.

## 15. Package boundary

A new package, **`@react-pdf/paginate`**, contains:

- The `Item` / `Atom` / `Glue` / `Penalty` / `Hints` / `Ctx` / `Region` / `PlacedItem` types.
- `fillRegion` and `paginate`.
- The fixed-point iteration runner.
- Unit tests over synthetic items.
- Visual regression tests (§17.2) that render paginator output to PNG and compare against committed images.

**No dependency on**: `@react-pdf/layout`, `@react-pdf/primitives`, `@react-pdf/reconciler`, React, Yoga, textkit. The package is purely algorithmic (dev-only deps: `@napi-rs/canvas`, `jest-image-snapshot`).

The React-PDF forward translator (Step 10) and reverse translator (Step 11) live in `@react-pdf/layout` (or alongside it) and know about `@react-pdf/paginate`'s types but not its internals.

## 16. Resolved decisions

- **Package name**: `@react-pdf/paginate`.
- **Hint canonicalization**: whichever path is simpler during implementation. Default choice is translation-time (hints on atoms become penalty items at forward-translator emit), decided at Step 10 based on what produces the cleanest code.
- **Bookmarks**: not a paginator concern. The paginator propagates `part.isFirst` / `part.isLast` on `PlacedItem`. The reverse translator (§12) applies bookmark nulling on non-first slices. Forward translator does not emit bookmark-specific items.
- **Error paths**: when an unsplittable atom is taller than the region and no viable break exists, emit a console warning and overflow (place the atom on its own page). Matches current behavior.

## 17. Testing approach

### 17.1 Unit tests (Part A)

Each step in Part A ships with a focused unit-test file covering the one capability added by that step. Tests use hand-built `Item[]` arrays with synthetic heights, synthetic penalties, and synthetic lazy materialization — no Yoga, no React, no measurement oracles that vary. The paginator's purity makes these tests deterministic and fast.

### 17.2 Visual regression tests

Each step's capability gets at least one visual test: render the `Page[]` output to a PNG and compare against a committed snapshot via `jest-image-snapshot`. Rendering is done with `@napi-rs/canvas` (a drop-in canvas implementation with no native build dependencies, already used by sibling packages in this monorepo). The renderer itself is a test helper in `tests/renderCanvas.js` — it draws page outlines and placed-item rectangles with ID labels.

Why canvas instead of SVG-text snapshots: PNG snapshots are eyes-on — committed images visible in file browsers, PR diffs, and GitHub's image-diff view. SVG-text diffs are mechanically easy to assert on but don't give a reader any visual sense of what changed. The paginator's output is geometric; a geometric regression test should be geometric.

Tolerance is kept tight (`failureThreshold: 0.01` / 1%) because our rendering is deterministic — no font antialiasing variance affects the colored rectangles, and the few text labels are small relative to the whole image. Truly meaningful changes always exceed the threshold; trivial noise does not.

### 17.3 Integration tests (Part B)

Once the forward and reverse translators are wired (Steps 10–11), the existing `packages/layout/tests/steps/resolvePagination.test.ts` suite runs against the new pipeline. Snapshot tests elsewhere in the monorepo (`jest-image-snapshot`-based visual regression in `packages/renderer/tests`) catch end-to-end regressions.

### 17.4 Battle-testing during cutover (Step 12)

Out of scope for this spec. Strategy will be designed when Step 12 is scheduled; likely includes a feature flag, running both pipelines in parallel on a corpus of real documents, and comparing outputs.

## 18. Out of scope for this spec

- Exact internal API shape of the forward and reverse translators (Steps 10–11) — subject to design during those steps.
- Migration notes for end users (written once Step 12 is in a near-final state).
- Columns, footnotes, and table-of-contents user-facing APIs — only structurally accommodated in this design; their UX and feature design is their own later specs.
