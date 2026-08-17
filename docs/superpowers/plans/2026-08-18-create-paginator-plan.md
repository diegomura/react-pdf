# `createPaginator` Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Expose stepwise pagination from `@react-pdf/paginate`: `createPaginator(root)` fills one page per `next(height)` call, enabling a different height per page. `paginate(root, height)` becomes a wrapper. Zero behavior change for existing callers.

**Architecture:** The engine is already internally stepwise — `paginate`'s while-loop calls `fill(fragments, height, pageNumber, canForce)` once per page. This plan lifts that loop body into a sealed iterator object (fragments, page numbering stay private; no `Fragment` exposure) and rebuilds `paginate` on top of it. Spec: `docs/superpowers/specs/2026-08-17-page-layout-design.md` §5.3.

**Explicitly out of scope:** `tryNext`/snapshot-restore (the footnote hook). Do NOT add defensive copies of fragment arrays: `repeatFragments`'s lazy-origin detection depends on `materialize` splicing into the live `fragment.children` (see Task 5 of the repeat plan) — a copy would silently break repeat-lazy. The snapshot invariant is satisfied later by cloning wrappers at snapshot time, not by changing fill semantics now.

**Tech Stack:** TypeScript, Vitest, image snapshots via the existing `snapshotPages` helper.

**Environment:** Prefix every command with the Node 22 path (machine default Node 18 breaks tooling):

```bash
export PATH="$HOME/.nvm/versions/node/v22.15.0/bin:$PATH"
```

Run tests only via `yarn vitest run <path>` (never `npx vitest`). Run `npx prettier --write` on edited files before committing (pre-commit hook enforces it).

---

## File Structure

- Create: `packages/paginate/src/paginator.ts` — `createPaginator` + `Paginator` interface (one-unit-per-file, matching package convention)
- Modify: `packages/paginate/src/index.ts` — `paginate` becomes the loop wrapper; re-export `createPaginator`/`Paginator`
- Modify: `packages/paginate/README.md` — document the stepwise API
- Test: `packages/paginate/tests/paginate.test.ts` — new `describe('createPaginator')` block (no new test files)

---

### Task 1: `createPaginator` + `paginate` as wrapper

**Files:**
- Create: `packages/paginate/src/paginator.ts`
- Modify: `packages/paginate/src/index.ts`
- Test: `packages/paginate/tests/paginate.test.ts`

- [ ] **Step 1: Write the failing test**

In `packages/paginate/tests/paginate.test.ts`, extend the src import at the top of the file:

```ts
import { paginate, createPaginator } from '../src';
```

(Adjust to match the existing import line — add `createPaginator` to it.)

Add a new top-level `describe` block:

```ts
describe('createPaginator', () => {
  test('iterating next(height) matches paginate exactly', () => {
    const root = column([
      leaf(40, 'a'),
      splittable(80, 'b'),
      spacer(10, 'gap'),
      leaf(30, 'c'),
    ]);

    const paginator = createPaginator(root);
    const pages: ReturnType<typeof paginate> = [];

    while (!paginator.done) {
      pages.push(paginator.next(50));
    }

    // Split remainders carry fresh `split` closures per run; a JSON
    // round-trip drops functions so the comparison sees only structure.
    const shape = (result: ReturnType<typeof paginate>) =>
      JSON.parse(JSON.stringify(result));

    expect(shape(pages)).toEqual(shape(paginate(root, 50)));
    snapshotPages(pages, region(50), 'paginator-parity');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
yarn vitest run --project @react-pdf/paginate packages/paginate/tests/paginate.test.ts -t 'matches paginate exactly'
```

Expected: FAIL — `createPaginator` is not exported.

- [ ] **Step 3: Create the paginator**

Create `packages/paginate/src/paginator.ts`:

```ts
import fill from './fill/fill';
import toFragments from './fragment/toFragments';
import { Item, Page } from './types';

export interface Paginator {
  readonly done: boolean;
  next(height: number): Page;
}

// Stepwise pagination: each next(height) fills exactly one page, so callers
// can pass a different height per page (a template whose chrome varies).
// Fragments and page numbering stay sealed inside; callers own termination.
const createPaginator = (root: Item): Paginator => {
  let pageNumber = 1;
  let fragments = toFragments([root]);

  return {
    get done() {
      return fragments.length === 0;
    },

    next(height: number): Page {
      if (fragments.length === 0) {
        throw new Error('[paginate] next() called after done');
      }

      // canForce: true. If something doesn't fit even at the top of an empty
      // page, moving it to the next page won't help — place it anyway.
      const result = fill(fragments, height, pageNumber, true);

      pageNumber += 1;
      fragments = result.remaining;

      return result.placed;
    },
  };
};

export default createPaginator;
```

- [ ] **Step 4: Rebuild `paginate` on top of it**

Replace the `paginate` function in `packages/paginate/src/index.ts` (currently the while-loop over `fill`) with:

```ts
import createPaginator from './paginator';
import { Page, Item } from './types';

const MAX_PAGES = 10_000;

export const paginate = (root: Item, height: number): Page[] => {
  const pages: Page[] = [];
  const paginator = createPaginator(root);

  let safety = 0;

  while (!paginator.done) {
    safety += 1;

    if (safety > MAX_PAGES) {
      throw new Error(
        `[paginate] Exceeded ${MAX_PAGES} pages; likely an infinite loop.`,
      );
    }

    pages.push(paginator.next(height));
  }

  return pages;
};

export { default as createPaginator } from './paginator';
export type { Paginator } from './paginator';
```

Keep the existing type re-exports at the bottom of `index.ts` unchanged. The `fill`/`toFragments` imports and the `pageNumber` bookkeeping move out of this file — the comment about `canForce` lives in `paginator.ts` now.

- [ ] **Step 5: Run the test to verify it passes**

```bash
yarn vitest run --project @react-pdf/paginate packages/paginate/tests/paginate.test.ts -t 'matches paginate exactly'
```

Expected: PASS (snapshot `paginator-parity` written on first run).

- [ ] **Step 6: Run the full engine suite — zero regressions**

```bash
yarn vitest run packages/paginate
npx tsc --noEmit -p packages/paginate
```

Expected: all tests PASS (85 existing + 1 new = 86), typecheck clean. Every existing test exercises the rebuilt `paginate` wrapper, which is the refactor's real safety net.

- [ ] **Step 7: Commit**

```bash
git add packages/paginate/src packages/paginate/tests
git commit -m "feat(paginate): createPaginator — stepwise pagination with per-page heights"
```

---

### Task 2: Per-page heights and `done` semantics

**Files:**
- Test: `packages/paginate/tests/paginate.test.ts` (inside `describe('createPaginator')`)

- [ ] **Step 1: Add the tests**

```ts
  test('each page can have its own height', () => {
    const root = column([leaf(40, 'a'), leaf(25, 'b'), leaf(45, 'c')]);
    const paginator = createPaginator(root);

    const pages = [paginator.next(50), paginator.next(30), paginator.next(50)];

    expect(paginator.done).toBe(true);
    expect(
      pages.map((p) => p[0]?.children?.map((c) => c.item.id)),
    ).toEqual([['a'], ['b'], ['c']]);
    snapshotPages(pages, region(50), 'paginator-heights');
  });

  test('done flips after the last page and next() then throws', () => {
    const paginator = createPaginator(column([leaf(10, 'a')]));

    expect(paginator.done).toBe(false);
    paginator.next(50);
    expect(paginator.done).toBe(true);
    expect(() => paginator.next(50)).toThrow('after done');
  });
```

Derivation of the first test: page 1 at height 50 holds `a`(40) but not `b` (65 > 50); page 2 at height 30 holds `b`(25) but not `c`; page 3 at height 50 holds `c`(45). The middle page's smaller budget is what a fixed-height `paginate` cannot express — `b`+`c` would otherwise share a page.

- [ ] **Step 2: Run and verify**

```bash
yarn vitest run --project @react-pdf/paginate packages/paginate/tests/paginate.test.ts -t 'createPaginator'
```

Expected: PASS (snapshot `paginator-heights` written; heights all ≤ region so the render shows free space, not overflow).

- [ ] **Step 3: Commit**

```bash
git add packages/paginate/tests
git commit -m "test(paginate): paginator per-page heights and done semantics"
```

---

### Task 3: `repeat` and `lazy` compose through the iterator

Both features live below `fill`, so they must work identically through `next()`. These tests lock that in and are expected to pass.

**Files:**
- Test: `packages/paginate/tests/paginate.test.ts` (inside `describe('createPaginator')`)

- [ ] **Step 1: Add the tests**

```ts
  test('repeat items re-emit across next() calls', () => {
    const root = column([
      repeatLeaf(10, 'h'),
      leaf(30, 'a'),
      leaf(30, 'b'),
      leaf(30, 'c'),
    ]);
    const paginator = createPaginator(root);
    const pages = [];

    while (!paginator.done) pages.push(paginator.next(50));

    expect(
      pages.map((p) => p[0]?.children?.map((c) => c.item.id)),
    ).toEqual([
      ['h', 'a'],
      ['h', 'b'],
      ['h', 'c'],
    ]);
    snapshotPages(pages, region(50), 'paginator-repeat');
  });

  test('lazy items see the page number the iterator tracks', () => {
    const seen: number[] = [];
    const header: LazyItem = {
      kind: 'lazy',
      repeat: true,
      materialize: (ctx) => {
        seen.push(ctx.pageNumber);
        return [leaf(10, `h${ctx.pageNumber}`)];
      },
    };
    const root = column([header, leaf(30, 'a'), leaf(30, 'b')]);
    const paginator = createPaginator(root);

    while (!paginator.done) paginator.next(50);

    expect(seen).toEqual([1, 2]);
  });
```

- [ ] **Step 2: Run and verify**

```bash
yarn vitest run --project @react-pdf/paginate packages/paginate/tests/paginate.test.ts -t 'createPaginator'
```

Expected: PASS. If the repeat test fails, the paginator is not passing `canForce: true` or is rebuilding fragments between calls — compare against `paginate`'s loop.

- [ ] **Step 3: Commit**

```bash
git add packages/paginate/tests
git commit -m "test(paginate): repeat and lazy compose through createPaginator"
```

---

### Task 4: README + final verification

**Files:**
- Modify: `packages/paginate/README.md`

- [ ] **Step 1: Document the API**

In `packages/paginate/README.md`, after the `### paginate(root, height)` section, add:

````markdown
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
- `paginate(root, height)` is this loop with a constant height and a
  10,000-page safety cap; iterator callers own their own termination.
````

- [ ] **Step 2: Full verification**

```bash
yarn vitest run packages/paginate packages/layout
npx tsc --noEmit -p packages/paginate
```

Expected: all suites PASS (paginate 90 = 85 existing + 5 new, layout unchanged), typecheck clean.

- [ ] **Step 3: Commit**

```bash
git add packages/paginate/README.md
git commit -m "docs(paginate): document createPaginator"
```
