# Page `layout` Prop Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** `<Page layout={PageLayout}>` — a master-page template component whose `{children}` marks the flow slot; chrome repeats on every page, reserves its space by construction, and may vary per page via page props. Spec: `docs/superpowers/specs/2026-08-17-page-layout-design.md`.

**Architecture (three discoveries from recon, superseding the spec's §4.3 sketch):**

1. **No composite `Page` component.** The `'PAGE'` host primitive passes arbitrary props through the reconciler, so `layout` arrives on `page.props.layout` as a plain function. The renderer package needs only a TypeScript prop type and docs — zero runtime changes.
2. **Template instantiation uses the render-prop machinery.** `createInstances` already executes function components (`element.type(element.props)`), so the adapter instantiates `layout` outside React — once so the first Yoga pass measures content *inside* the slot (at slot width), and again per page with that page's props. Same mechanism, same documented limitation as render props: no hooks inside `layout`.
3. **The slot marker is a plain View** carrying an internal prop (`__slot`) with `flexGrow: 1` default styles.

**Pipeline shape** (all in `@react-pdf/layout`):

- A new early step splices the template into each laid-out page's children: `children = instantiate(layout, { children: <SLOT>{children}</SLOT> , pageNumber: 1 })`. Runs before style/dimension resolution so the first unconstrained pass measures template + content-in-slot together.
- `splitPage` gains a template path: find the slot node → flow region = slot's measured box → `createPaginator(content)` loop, measuring chrome per page (`chrome_n`) for its slot height → build each page by filling `chrome_n`'s slot with that page's `fromPage` nodes → existing per-page relayout.
- Pages without `layout` keep the current template path untouched (parity guaranteed by the existing suites).

**Environment:** prefix every command with `export PATH="$HOME/.nvm/versions/node/v22.15.0/bin:$PATH"`; tests only via `yarn vitest run`; `npx prettier --write` edited files before committing. After changing `packages/paginate` or `packages/layout` sources, rebuild those packages before running renderer tests (stale-lib rule).

---

## File Structure

- Create: `packages/layout/src/paginate/template.ts` — slot marker constant, `instantiateTemplate(layout, children, props)` (wraps `createInstances`), `findSlot(node)`, validations (slot count, slot height, width variance)
- Modify: `packages/layout/src/paginate/index.ts` — template-aware `splitPage`: slot-derived flow region, `createPaginator` loop, per-page chrome
- Modify: `packages/layout/src/index.ts` — run template splicing in the resolve pipeline (before styles/dimensions)
- Modify: `packages/layout/src/paginate/toItems.ts` — dev warning for in-flow suffix `fixed` (spec §6)
- Modify: `packages/types` Page props — `layout?: (props: PageLayoutProps) => ReactNode`
- Test: `packages/layout/tests/paginate/layout.test.ts` — new file for template tests (the paginate test file is large already)
- Modify: `packages/renderer/tests/` — one end-to-end template document with image snapshot
- Docs: react-pdf site docs are out of scope for this plan; README notes only

---

### Task 1: Template instantiation + slot discovery

**Files:**
- Create: `packages/layout/src/paginate/template.ts`
- Test: `packages/layout/tests/paginate/layout.test.ts`

- [ ] **Step 1: Write failing tests** for the pure helpers (no pagination yet):

```ts
import { describe, expect, test } from 'vitest';
import {
  instantiateTemplate,
  findSlot,
  SLOT_PROP,
} from '../../src/paginate/template';

const layout = ({ children }: any) => ({
  type: 'VIEW',
  props: { style: { flexDirection: 'row' }, children: [children] },
});

describe('template', () => {
  test('instantiates the layout with a slot wrapping the content', () => {
    const content = [{ type: 'VIEW', props: { style: { height: 10 } } }];
    const nodes = instantiateTemplate(layout as any, content, {
      pageNumber: 1,
    });

    const slot = findSlot({ type: 'PAGE', children: nodes } as any);
    expect(slot).toBeTruthy();
    expect(slot!.children).toHaveLength(1);
  });

  test('throws when the layout renders children twice or never', () => {
    const twice = ({ children }: any) => ({
      type: 'VIEW',
      props: { children: [children, children] },
    });
    const never = () => ({ type: 'VIEW', props: {} });

    expect(() => instantiateTemplate(twice as any, [], { pageNumber: 1 }))
      .toThrow(/exactly one/);
    expect(() => instantiateTemplate(never as any, [], { pageNumber: 1 }))
      .toThrow(/exactly one/);
  });
});
```

- [ ] **Step 2: Implement** `template.ts`:

```ts
import React from 'react';

import createInstances from '../node/createInstances';
import { DynamicPageProps, SafeNode } from '../types';

export const SLOT_PROP = '__slot';

export type PageLayout = (props: {
  children: React.ReactNode;
  pageNumber?: number;
  totalPages?: number;
  subPageNumber?: number;
  subPageTotalPages?: number;
}) => React.ReactNode;

// The slot is a plain flex-grown View: it claims leftover space in a column
// and width in a row, so bands and asides both work without users thinking
// about flexbox.
const slotElement = (children: unknown) =>
  React.createElement('VIEW' as any, {
    [SLOT_PROP]: true,
    style: { flexGrow: 1, flexShrink: 1 },
    children,
  });

export const findSlot = (node: SafeNode): SafeNode | null => {
  if (node.props && SLOT_PROP in node.props) return node;

  for (const child of (node.children || []) as SafeNode[]) {
    const found = findSlot(child);
    if (found) return found;
  }

  return null;
};

const countSlots = (nodes: unknown[]): number =>
  nodes.reduce(
    (acc: number, node: any) =>
      acc +
      (node?.props && SLOT_PROP in node.props ? 1 : 0) +
      countSlots(node?.children || []),
    0,
  );

// Runs the user's layout component through the same machinery as render
// props (createInstances executes function components) — so, like render
// props, hooks are not supported inside a layout.
export const instantiateTemplate = (
  layout: PageLayout,
  children: unknown,
  props: Omit<DynamicPageProps, 'pageNumber'> & { pageNumber?: number },
) => {
  const element = React.createElement(layout as any, {
    ...props,
    children: slotElement(children),
  });

  const nodes = createInstances(element);
  const slots = countSlots(nodes);

  if (slots !== 1) {
    throw new Error(
      `[layout] A page layout must render its children exactly once (found ${slots} slots).`,
    );
  }

  return nodes;
};
```

Note: `createInstances` input types may need small casts — the test harness nodes mimic reconciler output like the existing paginate tests do. If `createInstances`'s element handling rejects the plain-object test doubles, mirror how `renderDynamic`'s tests fake elements instead of fighting types.

- [ ] **Step 3:** Run, expect PASS: `yarn vitest run packages/layout/tests/paginate/layout.test.ts`
- [ ] **Step 4:** Commit: `feat(layout): template instantiation and slot discovery`

---

### Task 2: Splice templates into the pipeline (first pass measures content at slot width)

**Files:**
- Modify: `packages/layout/src/index.ts` (the resolve pipeline — read its current WIP state first)
- Create: `packages/layout/src/steps/resolvePageTemplates.ts`
- Test: `packages/layout/tests/paginate/layout.test.ts`

- [ ] **Step 1: Failing test** — an aside template must narrow content measurement:

```ts
  test('content inside an aside template measures at slot width', async () => {
    const withAside = ({ children }: any) =>
      view({ flexDirection: 'row', flexGrow: 1 }, [
        view({ width: 40 }),
        children,
      ]);

    const pages = await run({ width: 100, height: 100 }, [text('...long text...')], {
      layout: withAside,
    });

    // every text line box must fit in the 60pt slot, not the 100pt page
    pages.forEach((page) =>
      boxes(page).forEach((b) => expect(b.width ?? 60).toBeLessThanOrEqual(60.001)),
    );
  });
```

(Adapt the harness: `run` already forwards `pageProps`; `walk`/`boxes` need `width` added alongside `top`/`height`. Exact assertion values to be pinned when the harness runs — derive them, don't guess.)

- [ ] **Step 2: Implement** `resolvePageTemplates.ts`: for each page with `props.layout`, replace `page.children` with `instantiateTemplate(layout, originalChildren, { pageNumber: 1 })` and stash the original content nodes are NOT needed — the slot holds them. Wire it into `packages/layout/src/index.ts`'s step order immediately before style resolution. Pages without `layout` pass through untouched.
- [ ] **Step 3:** Run new + full layout suite; commit: `feat(layout): splice page templates before first layout pass`

---

### Task 3: Template-aware splitPage — the per-page loop

The core task. **Files:** `packages/layout/src/paginate/index.ts`, tests in `layout.test.ts`.

- [ ] **Step 1: Failing tests** — the band template end-to-end:

```ts
  test('band template reserves header and footer space on every page', async () => {
    const band = ({ children }: any) => [
      view({ height: 20 }),      // header chrome
      children,
      view({ height: 10 }),      // footer chrome
    ];

    const pages = await run({ width: 100, height: 100 }, [
      view({ height: 60 }),
      view({ height: 60 }),
    ], { layout: band });

    expect(pages).toHaveLength(2);
    // flow region is 70 (100 − 20 − 10): first view + 10pt split of second
    // page 1: header 20, content 60 + 10 (split), footer at 90
    // page 2: header 20, remainder 50, footer at 90
    // (derive exact boxes when running; the invariants to assert:
    //  - chrome present on BOTH pages at the same positions
    //  - no content box intrudes into [0,20) or [90,100) bands)
  });

  test('footer with pageNumber render prop counts pages', async () => {
    const numbered = ({ children }: any) => [
      children,
      view({ height: 10 }, [
        dynamicView(({ pageNumber }: any) => [view({ height: 5, width: pageNumber })]),
      ]),
    ];
    // assert the footer's dynamic content differs per page (width 1, 2, ...)
  });
```

- [ ] **Step 2: Implement** the template path in `splitPage`. Shape (pseudocode contract — exact code driven by the tests):

```
if (!page.props.layout) → existing path, unchanged.

template path:
  slot        = findSlot(page)               // page.children already ARE the round-1 template (Task 2)
  content     = slot.children                // measured at slot width by the first pass
  root        = { kind: 'column', children: toItems(content, env) }
  paginator   = createPaginator(root)

  measureChrome(n):
    nodes  = instantiateTemplate(layout, [], props(n))   // empty slot
    laid   = relayoutPage({ ...page, children: nodes }, fontStore, yoga)
    slotBox = box of findSlot(laid)          // absolute within page: accumulate parent tops/lefts
    validate: slotBox.height > 0; slotBox.width ≈ reference width (first page's) else throw
    return { laid, slotBox }

  loop while !paginator.done:
    { laid, slotBox } = measureChrome(pageNumber)
    placed   = paginator.next(slotBox.height)
    flow     = fromPage(placed[0]?.children || [], 0)    // slot-relative coordinates
    built    = laid with the slot node's children = flow  // fill the measured chrome
    pages.push(relayoutPage(built))
```

Key details the implementer must respect:
- `fromPage` offsets are slot-relative now (`0`, not `flowTop`) because the nodes nest *inside* the slot node, whose own box carries the offset.
- The slot node in `built` needs its height pinned for non-final… no — the slot is chrome, present on every page; content fragments inside it carry their own pinned heights exactly as today. The slot itself keeps `flexGrow`.
- Static templates: memoization is explicitly NOT required (spec §4.2) — measure per page.
- Out-of-flow direct children and `fixed` handling do not apply inside the template path (chrome repeats by definition); a template page ignores the `slot`/`flowTop` band logic entirely.
- Reference slot width = page 1's; comparison per §5.4 with ~0.001 epsilon.

- [ ] **Step 3:** Full suites (`packages/layout packages/paginate`), rebuild layout, renderer suite. Commit: `feat(layout): paginate template pages with per-page chrome`

---

### Task 4: Page-variant chrome + remaining validations

**Files:** `layout.test.ts`, `packages/layout/src/paginate/index.ts` (only if tests expose gaps)

- [ ] Tests: first-page variant (taller cover header on page 1 shrinks only page 1's flow); odd/even mirrored aside (same slot width, position flips — must NOT trigger the width error); slot-width violation (aside width depending on `pageNumber` → expect throw naming the page); `wrap={false}` template page (single page, unconstrained slot).
- [ ] `totalPages` in chrome: assert the existing two-round machinery re-runs template pages (footer showing `X of Y`). If the round-2 path needs `totals` threaded into `measureChrome`'s props, it comes via the existing `props(n)` factory — verify, don't rebuild.
- [ ] Commit: `test(layout): page-variant templates and validations`

---

### Task 5: Suffix-`fixed` dev warning

**Files:** `packages/layout/src/paginate/index.ts` (page template path selection point), test in `layout.test.ts`

- [ ] In the no-layout path, when a direct in-flow `fixed` child sits after the first flow child, `console.warn` once per document: suffix fixed is deprecated, use `layout`. Test with a warn spy. (Absolute fixed anywhere: no warning. Prefix: no warning.)
- [ ] Commit: `feat(layout): deprecation warning for in-flow suffix fixed`

---

### Task 6: Renderer type + E2E + docs

- [ ] `packages/types`: add `layout` to Page props (find the `PageProps` type; mirror how `render` props are typed).
- [ ] Renderer E2E: one test in `packages/renderer/tests/` rendering a document with header/aside/footer template + page numbers across 3 pages, image snapshot. Rebuild layout/paginate libs first.
- [ ] `packages/layout` or repo README note + spec status flip to "Implemented".
- [ ] Amend spec §4.3: no composite `Page` — the host primitive carries `layout` through, and the layout package owns instantiation (recon findings; note the shared no-hooks limitation with render props).
- [ ] Full verification: paginate, layout, renderer suites + both typechecks.
- [ ] Commit: `feat(renderer): layout page prop types, e2e template test`

---

## Known unknowns the implementer should resolve by testing, not guessing

1. Whether `relayoutPage` on a chrome-only page needs the page's `style.height` pinned (it should already be set — same as the existing per-page relayout).
2. Exact absolute-position accumulation for the slot box (`top`/`left` are parent-relative — accumulate like the tests' `walk` helper).
3. Whether `instantiateTemplate`'s output needs the same `Safe*` casts as `renderDynamic`'s (`createInstances` returns `Node[]`, the pipeline wants `SafeNode[]` post-resolve — Task 2's pipeline placement should make this moot since the spliced nodes flow through the normal resolve steps).
4. The `dynamicView` inside chrome resolves against `measureChrome`'s per-page instantiation — NOT via `env.measure` — because the whole template re-instantiates. If `hasDynamic` machinery double-processes it, drop the `render` prop during instantiation like `renderDynamic` does.
