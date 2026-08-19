# Page Layout (`layout` prop) — Design Spec

**Date**: 2026-08-17
**Status**: Implemented (2026-08-19) — see `docs/superpowers/plans/2026-08-19-page-layout-plan.md`
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
- Per-page structural variants from v1: the layout component receives page props, so "different first page" and odd/even mirroring work out of the box.
- `@react-pdf/paginate` gains a sealed stepwise API (`createPaginator`) so the adapter can pass a different height per page.
- `fixed` becomes prefix-only; `layout` is the suffix/chrome story. One breaking major, one migration.
- Delete the `flowTop` band arithmetic for pages that use `layout`.

## 3. Non-goals (explicit doors, not walls)

- **Footnote slot** (`layout` receiving `{ footnotes }` as a second slot, placed like `children`; absent → notes default to the slot's bottom edge; margin placement gives sidenotes and needs no retry since it doesn't steal slot height). Sketched here so the future API is contemplated; not built in v1.
- **Marks / running headers** (chrome reading strings from placed content — TeX `\mark`, CSS `string-set`). Needs only an adapter walk over placed output plus a running state in the sequential loop; designed later.
- **Table of contents.** A document-global fixpoint generalizing the existing totals round (collect anchor→page, re-run until stable, capped). Pairs with marks, not with this feature.
- **Footnotes.** A page-local budget fixpoint with a known oscillation hazard (TeX's insertions problem). Not attempted — but the design contemplates it: the future mechanism is per-page retry (snapshot paginator state → fill → measure footnotes for what landed → restore and refill at the reduced height, capped against oscillation), which requires the paginator-state invariant in §5.3. The footnote *area* fits the template model as a future marker element or the slot's bottom edge — deliberately undecided here.
- **Multi-slot pages** (columns, regions). Exactly one slot in v1; the validation error keeps the door visible.
- **Varying slot width.** Explicitly rejected (§5.4).

## 4. API

### 4.1 Usage

Naming: `layout` was chosen over `template` — the Next.js layout precedent transfers users' intuition exactly (same concept, same `{ children }` signature), outweighing the overlap with react-pdf's internal "layout step" vocabulary. Decided 2026-08-18; don't reopen in PR review.

```jsx
const PageLayout = ({ children, pageNumber }) => (
  <>
    <Header title={pageNumber === 1 ? 'Report' : 'Report (cont.)'} />
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
- The layout component receives `{ children, pageNumber, totalPages, subPageNumber }` (`totalPages` is `undefined` in round 1, like render props). This supports first-page and odd/even variants from v1: different chrome per page, including mirrored sidebars — legal because the §5.4 invariant constrains slot *width*, not position.
- v1 measures the template per page, unconditionally. This is affordable because the measure is a chrome-only pass and every built page runs a full relayout (chrome + content) regardless — the pre-measure is a fraction of per-page work. If profiling ever shows it mattering, the optimization is **structural-equality memoization** (reuse the measurement when the produced chrome tree is identical to the previous page's — a cheap short-circuiting JS walk versus a style+Yoga+text-shaping pass, so the compare always costs less than what it saves). An optimization door, not a v1 requirement.
- Docs guidance: render props inside the template for text-level dynamism (page-number footers); component params for structural variation (cover chrome, odd/even).
- Absolutely-positioned template elements repeat like everything else — full-page backgrounds and watermarks are the intended use, and get documented as such.
- `wrap={false}`: single page, slot without a height ceiling; chrome unaffected.
- Duplicate-sensitive props in chrome (`bookmark`, link `id`s) are stripped on repetitions, same policy as continuation pages.

### 4.3 Internals

*(Superseded during implementation — recon found a simpler shape.)* No composite `Page`: the `'PAGE'` host primitive passes `layout` through the reconciler as a plain prop, and the **layout package** owns instantiation via the render-prop machinery (`createInstances` executes function components). A new early pipeline step (`resolvePageTemplates`) splices the instantiated template around each page's content before the first pass, so content measures at slot width; `splitPage` re-instantiates chrome per page. The slot marker is a plain View with an internal prop and `flexGrow: 1` defaults. Consequence shared with render props: **no hooks inside layout components**.

## 5. The pagination loop

### 5.1 Per-page, just-in-time measurement

Pagination is sequential, so before filling page *n*, `props(n)` (`pageNumber`, `subPageNumber`) is known. The loop:

```
n = 1
paginator = createPaginator(content)
while not paginator.done:
  chrome_n = layout(props(n))                                  # per page
  slot_n   = measure(chrome_n at real page size, slot empty)   # chrome-only pass; memoizable later (§4.2)
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
- **Invariant: paginator state is cheaply snapshotable.** Fragment wrappers must be shallow-cloneable with items shared immutably — in particular, lazy materialization may not make un-cloneable in-place mutations the only record of progress. This is what keeps a future `tryNext(height)` / snapshot-restore API (the footnote fixpoint hook, §3) an additive change instead of a redesign.
- `paginate(root, height)` remains as the loop wrapper and keeps its `MAX_PAGES` backstop; iterator callers own their own termination.
- Everything below `fill` — `repeat` prefixes, progress guard, lazy `origin` re-materialization — is untouched and composes unchanged.

### 5.4 The width invariant

**Slot height may vary per page; slot width may not.** Content is measured once at slot width; a per-page width would force re-measuring (re-wrapping text) mid-pagination — the O(N²) reflow trap this architecture exists to avoid, and a known tar pit for CSS fragmentation engines. If page *n*'s measured slot width differs from the reference width (beyond epsilon), fail with a clear error naming the offending page and the template.

Also validated: a template whose slot measures to height ≤ 0 (chrome ate the page) is an error, not an infinite loop.

## 6. `fixed` policy — one semantic everywhere

*(Restated after the §10 unification landed early.)* In-flow `fixed` means one thing at every depth: the engine's `repeat` semantics — re-emit at the **top** of continuations, from where the flow reaches it, no future lookup. Page-level in-flow fixed is not special: the synthesized template keeps it *inside* the slot as a stream repeat item, exactly like nested fixed. Only absolutes live outside the slot, since they never enter the flow and anchor to the page.

| Case | Behavior |
| --- | --- |
| Absolute fixed (e.g. `position: 'absolute', bottom: 5` page numbers) | per-page chrome: repeats anchored to the page, anywhere in the children list |
| In-flow fixed before content (header) | repeats at the top of every page, consuming stream budget — visually the reserved band, with no band arithmetic |
| In-flow fixed after content | engine-honest behavior: places once when reached, repeats only at later tops — **not a footer**. Dev warning pointing at `layout`; error in the next major |

Footers are `layout`'s job. The rule stays: **`fixed` is prefix chrome; suffix chrome is `layout`'s.**

## 7. Release shape

The engine change (`createPaginator`) shipped independently (paginate 0.1.0). The user-facing surface ships together in the pagination-rewrite major: `layout`, the width/slot validations, and the suffix-`fixed` dev warning. The suffix-`fixed` error lands in the major after.

## 8. Edge cases

| Case | Behavior |
| --- | --- |
| No `layout` prop | Existing template path, byte-compatible with today |
| `layout` and page-level `fixed` children together | Both repeat; fixed children follow §6 rules; discouraged in docs |
| Slot rendered twice / not at all | Layout-time error naming the component |
| Template taller than the page (slot ≤ 0) | Layout-time error |
| Slot width differs across pages | Error naming the page (§5.4) |
| Dynamic chrome height varies per page | Supported; that page's slot height shrinks/grows (§5.1) |
| First-page / odd-even chrome variants | Supported via page props; slot position may move, width may not (§5.4) |
| `totalPages` chrome changes page count | Bounded re-run until stable (§5.2) |
| `wrap={false}` | One page, slot height unconstrained |
| `bookmark` / link ids in chrome | Stripped on repetitions |

## 9. Testing

- **Engine** (`packages/paginate/tests/`, all ending in `snapshotPages(...)`): `createPaginator` parity with `paginate` (same input → same pages); varying heights per page (e.g. 50/30/50) placing content correctly; `done` semantics; `repeat` items across `next()` calls.
- **Layout** (`packages/layout/tests/paginate/`): band template (header+footer) reserving space on every page; aside template (slot narrower than page, content measured at slot width); dynamic footer height shrinking a page's slot; first-page variant (taller cover chrome on page 1 only); odd/even mirrored aside (same slot width, moving position); slot validation errors (0, 2 slots; slot ≤ 0); width-variance error; suffix-fixed warning fires; no-layout pages byte-identical to today (parity suite).
- **Renderer**: one end-to-end template document with visual snapshot.

## 10. Future unification (noted, not scheduled)

Once `layout` is stable, page-level `fixed` can be internally desugared into an implicit template (prefix fixed → chrome above the slot), collapsing the two page-building code paths into one. Deferred until `layout` has earned trust: the desugaring changes subtle in-flow geometry.
