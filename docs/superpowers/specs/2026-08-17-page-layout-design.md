# Page Layout (`layout` prop) — Design Spec

**Date**: 2026-08-17
**Status**: Design approved; pending implementation plan
**Scope**: A master-page API for react-pdf — `<Page layout={Component}>` renders repeating page chrome around a content slot. Ships with: a stepwise pagination API in `@react-pdf/paginate` (`createPaginator`), per-page chrome measurement, and the restriction of `fixed` to prefix position. All of it lands in the pagination-rewrite major as one migration event.

---

## 1. Motivation

1. **`fixed` is the most-confused API in react-pdf.** Repeating chrome is declared per-node, space is not reserved (footers overlap content or hide in page padding), and in-flow suffix `fixed` "works" by squeezing content during relayout — the least defensible behavior in the system.
2. **The header/footer asymmetry is felt.** The adapter reserves a band for in-flow prefix fixed (`flowTop`) but nothing for suffix fixed. Extending the band arithmetic to footers adds code; a measured template deletes it.
3. **Capability gap.** With `fixed`, repeating elements can only sit *beside* the flow. They can never *contain* it — a sidebar next to content on every page, a frame wrapping the content region, and full-page watermark layers are inexpressible today.
4. **The architecture already models this.** `splitPage` literally treats a page as "a template with one flow slot" — with the template implicit and its geometry hand-computed. This feature makes the template explicit, user-authored, and Yoga-measured.

Prior art: InDesign parent pages with a primary text frame, QuestPDF's header/content/footer slots, SILE frames — the master-page lineage, strictly more general than the band model (Word sections, CSS `@page` margin boxes, XSL-FO regions), which falls out as the trivial case.

## 2. Goals

- `<Page layout={PageLayout}>` where `PageLayout` is an ordinary component receiving `{ children }`; where it renders `children` is where page content flows. Chrome repeats on every page and reserves its space by construction.
- Dynamic chrome (`<Text render={({ pageNumber }) => ...} />` inside the template), including chrome whose **height varies per page** — the flow region is measured just-in-time for each page.
- `@react-pdf/paginate` gains a sealed stepwise API (`createPaginator`) so the adapter can pass a different height per page.
- `fixed` becomes prefix-only; `layout` is the suffix/chrome story. One breaking major, one migration.
- Delete the `flowTop` band arithmetic for pages that use `layout`.

## 3. Non-goals (explicit doors, not walls)

- **Per-page layout variants** (`layout` receiving `{ pageNumber }` for first/odd/even pages — the Word feature). The v1 signature is `{ children }` only; extra named props can arrive later without breaking.
- **Marks / running headers** (chrome reading strings from placed content — TeX `\mark`, CSS `string-set`). Needs only an adapter walk over placed output plus a running state in the sequential loop; designed later.
- **Table of contents.** A document-global fixpoint generalizing the existing totals round (collect anchor→page, re-run until stable, capped). Pairs with marks, not with this feature.
- **Footnotes.** A page-local budget fixpoint with a known oscillation hazard (TeX's insertions problem). The layout API only leaves room for a future footnote area; it does not attempt one.
- **Multi-slot pages** (columns, regions). Exactly one slot in v1; the validation error keeps the door visible.
- **Varying slot width.** Explicitly rejected (§5.4).

## 4. API

### 4.1 Usage

```jsx
const PageLayout = ({ children }) => (
  <>
    <Header />
    <View style={{ flexDirection: 'row', flexGrow: 1 }}>
      <Aside />
      {children}
    </View>
    <Footer>
      <Text render={({ pageNumber }) => `Page ${pageNumber}`} />
    </Footer>
  </>
);

<Page size="A4" layout={PageLayout}>
  {content}
</Page>;
```

### 4.2 Semantics

- The template repeats on every page the `Page` produces. Repetition is definitional — no `fixed` needed inside a template, and `fixed` inside a template is ignored.
- `children` must be rendered exactly once. Zero or multiple slots is a layout-time error naming the component.
- Dynamic chrome uses the existing render-prop channel. The `layout` component itself is instantiated per pagination round, not per page; per-page work happens in its dynamic nodes. This keeps static templates measured once (memoized via `hasDynamic`) and localizes per-page cost to the nodes that need it.
- Absolutely-positioned template elements repeat like everything else — full-page backgrounds and watermarks are the intended use, and get documented as such.
- `wrap={false}`: single page, slot without a height ceiling; chrome unaffected.
- Duplicate-sensitive props in chrome (`bookmark`, link `id`s) are stripped on repetitions, same policy as continuation pages.

### 4.3 Internals

`Page` becomes a thin composite in the renderer: with a `layout` prop it renders `layout({ children: <View __slot>{children}</View> })` under the host PAGE node. The slot marker is a plain View carrying an internal prop and a `flexGrow: 1` default — no new primitive, nothing for the render package to draw, and slot width follows from the template's flex layout (which is how sidebars work without users thinking about it).

## 5. The pagination loop

### 5.1 Per-page, just-in-time measurement

Pagination is sequential, so before filling page *n*, `props(n)` (`pageNumber`, `subPageNumber`) is known. The loop:

```
n = 1
paginator = createPaginator(content)
while not paginator.done:
  chrome_n = render template's dynamic nodes with props(n)   # skipped if static
  slot_n   = measure(chrome_n at real page size, slot empty)  # memoized if static
  fragment = paginator.next(slot_n.height)
  pages.push(build(chrome_n, fragment))
  n += 1
```

`measure` is one small Yoga pass of the template (same trick as `measureDynamic`'s throwaway page). The slot's measured box is that page's flow region — top, left, width, height. `build` clones the chrome, drops the fragment into the slot, and runs the existing per-page relayout.

### 5.2 `totalPages` and stability

Chrome depending on `totalPages` resolves in round 2, exactly like today. If round 2's chrome heights shift the partition enough to change the page count, re-run; iterate until the count stabilizes, capped (small constant, e.g. 5 — Typst does the same). Round 1 renders totals-dependent chrome with `totalPages: undefined`.

### 5.3 Engine change: `createPaginator`

```ts
const p = createPaginator(root);
p.next(height); // fills exactly one page against `height`, returns Page (PlacedItem[])
p.done;         // true when the stream is exhausted
```

- Internal state (fragments, lazy bookkeeping, page numbering) stays sealed — no `Fragment` exposure, no caller mutation of in-flight state.
- `paginate(root, height)` remains as the loop wrapper and keeps its `MAX_PAGES` backstop; iterator callers own their own termination.
- Everything below `fill` — `repeat` prefixes, progress guard, lazy `origin` re-materialization — is untouched and composes unchanged.

### 5.4 The width invariant

**Slot height may vary per page; slot width may not.** Content is measured once at slot width; a per-page width would force re-measuring (re-wrapping text) mid-pagination — the O(N²) reflow trap this architecture exists to avoid, and a known tar pit for CSS fragmentation engines. If page *n*'s measured slot width differs from the reference width (beyond epsilon), fail with a clear error naming the offending page and the template.

Also validated: a template whose slot measures to height ≤ 0 (chrome ate the page) is an error, not an infinite loop.

## 6. `fixed` policy — prefix-only

Usage splits three ways, and only one breaks:

| Case | Today | After |
| --- | --- | --- |
| Absolute fixed (e.g. `position: 'absolute', bottom: 5` page numbers) | repeats, no flow participation | **unchanged** — works anywhere in the children list |
| In-flow prefix fixed (header band above first flow child) | repeats, space reserved via `flowTop` | **unchanged** — the API that makes sense |
| In-flow suffix or sandwiched fixed | repeats, space *not* reserved; squeezes content via relayout | **dev-mode warning in this major** pointing at `layout`; **error in the next major** |

Nested `fixed` (mapped to engine `repeat`) is already prefix-semantic via the placed-once rule, so page level and nested level now state one rule: **`fixed` is prefix chrome; suffix chrome is `layout`'s job.**

Pages without a `layout` prop keep the existing template path (prefix band + absolute repeats). End state after the following major: `splitPage` is "prefix band + absolute repeats + slot", and the squeeze path is deleted.

## 7. Release shape

Everything ships together in the pagination-rewrite major: `layout`, `createPaginator`, the width/slot validations, and the suffix-`fixed` dev warning. Users migrate once, with the replacement available the whole time. The suffix-`fixed` error lands in the major after.

## 8. Edge cases

| Case | Behavior |
| --- | --- |
| No `layout` prop | Existing template path, byte-compatible with today |
| `layout` and page-level `fixed` children together | Both repeat; fixed children follow §6 rules; discouraged in docs |
| Slot rendered twice / not at all | Layout-time error naming the component |
| Template taller than the page (slot ≤ 0) | Layout-time error |
| Slot width differs across pages | Error naming the page (§5.4) |
| Dynamic chrome height varies per page | Supported; that page's slot height shrinks/grows (§5.1) |
| `totalPages` chrome changes page count | Bounded re-run until stable (§5.2) |
| `wrap={false}` | One page, slot height unconstrained |
| `bookmark` / link ids in chrome | Stripped on repetitions |

## 9. Testing

- **Engine** (`packages/paginate/tests/`, all ending in `snapshotPages(...)`): `createPaginator` parity with `paginate` (same input → same pages); varying heights per page (e.g. 50/30/50) placing content correctly; `done` semantics; `repeat` items across `next()` calls.
- **Layout** (`packages/layout/tests/paginate/`): band template (header+footer) reserving space on every page; aside template (slot narrower than page, content measured at slot width); dynamic footer height shrinking a page's slot; slot validation errors (0, 2 slots; slot ≤ 0); width-variance error; suffix-fixed warning fires; no-layout pages byte-identical to today (parity suite).
- **Renderer**: one end-to-end template document with visual snapshot.

## 10. Future unification (noted, not scheduled)

Once `layout` is stable, page-level `fixed` can be internally desugared into an implicit template (prefix fixed → chrome above the slot), collapsing the two page-building code paths into one. Deferred until `layout` has earned trust: the desugaring changes subtle in-flow geometry.
