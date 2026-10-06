import { afterEach, describe, expect, test, vi } from 'vitest';

import renderPagesToPNG from './renderCanvas.js';
import fill from '../src/fill/fill';
import toFragments from '../src/fragment/toFragments';
import {
  ColumnItem,
  Ctx,
  Item,
  LazyItem,
  LeafItem,
  Page,
  PenaltyItem,
  RowItem,
  SpacerItem,
} from '../src/types';

// Item-level stepper: the public paginator speaks flow nodes, so the engine
// tests drive the fill loop directly.
const createPaginator = (root: Item) => {
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

      const result = fill(fragments, height, pageNumber, true);

      pageNumber += 1;
      fragments = result.remaining;

      return result.placed;
    },
  };
};

const MAX_PAGES = 10_000;

// Constant-height convenience loop over the stepwise paginator.
const paginate = (root: Item, height: number): Page[] => {
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

const FORBID_BREAK: PenaltyItem = Object.freeze({
  kind: 'penalty',
  type: 'forbid',
});

const FORCE_BREAK: PenaltyItem = Object.freeze({
  kind: 'penalty',
  type: 'force',
});

const region = (height: number, width = 100) => ({ width, height });

const snapshotPages = (
  pages: ReturnType<typeof paginate>,
  r: ReturnType<typeof region> | ReturnType<typeof region>[],
  name: string,
) => {
  if (pages.length === 0) return;

  expect(renderPagesToPNG(pages, r)).toMatchImageSnapshot({
    customSnapshotIdentifier: name,
  });
};

const silenceWarnings = () =>
  vi.spyOn(console, 'warn').mockImplementation(() => undefined);

const leaf = (height: number, id?: string): LeafItem => ({
  kind: 'leaf',
  height,
  ...(id !== undefined ? { id } : {}),
});

const repeatLeaf = (height: number, id: string): LeafItem => ({
  kind: 'leaf',
  height,
  id,
  repeat: true,
});

// Parts are numbered from the first slice: an item that never splits keeps its
// plain id, one that splits reads b/1, b/2, b/3…
const splittable = (height: number, id: string, part = 1): LeafItem => ({
  kind: 'leaf',
  height,
  id: part === 1 ? id : `${id}/${part}`,
  split: (avail) => {
    if (avail <= 0 || height <= avail) return null;
    return {
      current: { kind: 'leaf', height: avail, id: `${id}/${part}` },
      next: splittable(height - avail, id, part + 1),
    };
  },
});

const column = (children: Item[], id?: string): ColumnItem => ({
  kind: 'column',
  children,
  ...(id !== undefined ? { id } : {}),
});

const row = (children: Item[], id?: string): RowItem => ({
  kind: 'row',
  children,
  ...(id !== undefined ? { id } : {}),
});

// Spacers behave like leaves; the kind marks them as spacing, not content.
// Consumers encode container edges (margin/border/padding) this way, picking
// a policy through how the spacer breaks — plain (may land alone), splittable
// (distributes), or guarded by FORBID_BREAK (travels with its neighbor).
const spacer = (height: number, id: string): SpacerItem => ({
  kind: 'spacer',
  height,
  id,
});

const splittableSpacer = (
  height: number,
  id: string,
  part = 1,
): SpacerItem => ({
  kind: 'spacer',
  height,
  id: part === 1 ? id : `${id}/${part}`,
  split: (avail) => {
    if (avail <= 0 || height <= avail) return null;
    return {
      current: { kind: 'spacer', height: avail, id: `${id}/${part}` },
      next: splittableSpacer(height - avail, id, part + 1),
    };
  },
});

// The engine paginates a single root item; most tests describe a flow, so they
// go through a plain root column and read its placed children back out.
const paginateFlow = (flow: Item[], height: number) =>
  paginate(column(flow), height).map((page) => page[0]?.children ?? []);

describe('paginate', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('root item', () => {
    test('empty root column yields one empty page', () => {
      const pages = paginate(column([]), 100);

      expect(pages).toHaveLength(1);
      expect(pages[0][0].children).toEqual([]);
    });

    test('root is placed like any other item, children nested under it', () => {
      const pages = paginate(column([leaf(10, 'a'), leaf(10, 'b')]), 100);

      expect(pages[0]).toHaveLength(1);
      expect(pages[0][0].part).toEqual({ isFirst: true, isLast: true });
      expect(pages[0][0].children?.map((c) => c.item.id)).toEqual(['a', 'b']);
    });

    test('root edge spacers land on the pages they belong to', () => {
      const items = [
        spacer(10, 'padT'),
        leaf(30, 'a'),
        leaf(30, 'b'),
        spacer(10, 'padB'),
      ];
      const pages = paginate(column(items), 50);

      expect(pages).toHaveLength(2);
      expect(pages[0][0].part).toEqual({ isFirst: true, isLast: false });
      expect(pages[0][0].children?.map((c) => c.item.id)).toEqual([
        'padT',
        'a',
      ]);
      expect(pages[1][0].part).toEqual({ isFirst: false, isLast: true });
      expect(pages[1][0].children?.map((c) => c.item.id)).toEqual([
        'b',
        'padB',
      ]);
      snapshotPages(pages, region(50), 'root-column-frame');
    });

    test('a row root lays its children side by side', () => {
      const pages = paginate(row([leaf(10, 'a'), leaf(20, 'b')]), 100);

      expect(pages).toHaveLength(1);
      expect(pages[0][0].children?.map((c) => c.y)).toEqual([0, 0]);
      snapshotPages(pages, region(100), 'root-row');
    });

    test('a leaf root is a one-item document', () => {
      const pages = paginate(leaf(10, 'only'), 100);

      expect(pages).toHaveLength(1);
      expect(pages[0][0].item.id).toBe('only');
    });
  });

  describe('basic flow', () => {
    test('single-page result when flow fits', () => {
      const items: Item[] = [leaf(10, 'a'), leaf(10, 'b'), leaf(10, 'c')];
      const pages = paginateFlow(items, 100);

      expect(pages).toHaveLength(1);
      expect(pages[0]).toHaveLength(3);
      snapshotPages(pages, region(100), 'single-page');
    });

    test('whole placements carry part.isFirst = part.isLast = true', () => {
      const items: Item[] = [leaf(10, 'a'), leaf(10, 'b')];
      const pages = paginateFlow(items, 100);

      expect(pages[0]).toHaveLength(2);
      pages[0].forEach((p) => {
        expect(p.part).toEqual({ isFirst: true, isLast: true });
      });
    });
  });

  describe('multi-page splits', () => {
    test('10 items of 10 into region of 30 → 4 pages (3+3+3+1)', () => {
      const items: Item[] = Array.from({ length: 10 }, (_, i) =>
        leaf(10, String(i)),
      );
      const pages = paginateFlow(items, 30);

      expect(pages.map((p) => p.length)).toEqual([3, 3, 3, 1]);
      snapshotPages(pages, region(30), 'multi-page-split');
    });

    test('exact boundary — 6 items of 10 into region of 30 → 2 pages of 3', () => {
      const items: Item[] = Array.from({ length: 6 }, (_, i) =>
        leaf(10, String(i)),
      );
      const pages = paginateFlow(items, 30);

      expect(pages).toHaveLength(2);
      expect(pages[0]).toHaveLength(3);
      expect(pages[1]).toHaveLength(3);
      snapshotPages(pages, region(30), 'page-boundary-exact');
    });
  });

  describe('oversized leaves', () => {
    test('oversized item mid-flow warns, gets its own page, flow continues', () => {
      const warn = silenceWarnings();

      const items: Item[] = [
        leaf(10, 'a'),
        leaf(10, 'b'),
        leaf(500, 'big'),
        leaf(10, 'c'),
      ];
      const pages = paginateFlow(items, 50);

      expect(warn).toHaveBeenCalledOnce();
      expect(pages.map((p) => p.map((x) => x.item.id))).toEqual([
        ['a', 'b'],
        ['big'],
        ['c'],
      ]);
      snapshotPages(pages, region(50), 'oversized-mid-flow');
    });

    test('every item oversized — one page per item', () => {
      const warn = silenceWarnings();

      const items: Item[] = [leaf(200, 'x'), leaf(200, 'y'), leaf(200, 'z')];
      const pages = paginateFlow(items, 50);

      expect(warn).toHaveBeenCalledTimes(3);
      expect(pages.map((p) => p.map((x) => x.item.id))).toEqual([
        ['x'],
        ['y'],
        ['z'],
      ]);
      snapshotPages(pages, region(50), 'every-item-oversized');
    });
  });

  describe('splittable leaves', () => {
    test('splittable leaf slices across a page boundary', () => {
      const items: Item[] = [leaf(10, 'a'), splittable(40, 'b')];
      const pages = paginateFlow(items, 30);

      expect(pages).toHaveLength(2);
      expect(pages[0]).toHaveLength(2);
      expect(pages[0][0].item.id).toBe('a');
      expect(pages[0][0].part).toEqual({ isFirst: true, isLast: true });
      expect(pages[0][1].item.id).toBe('b/1');
      expect(pages[0][1].part).toEqual({ isFirst: true, isLast: false });

      expect(pages[1]).toHaveLength(1);
      expect(pages[1][0].item.id).toBe('b/2');
      expect(pages[1][0].part).toEqual({ isFirst: false, isLast: true });

      snapshotPages(pages, region(30), 'split-at-boundary');
    });

    test('item splitting across many pages chains part flags correctly', () => {
      const pages = paginateFlow([splittable(100, 'long')], 30);

      expect(pages).toHaveLength(4);
      expect(pages.map((p) => p.map((x) => x.part))).toEqual([
        [{ isFirst: true, isLast: false }],
        [{ isFirst: false, isLast: false }],
        [{ isFirst: false, isLast: false }],
        [{ isFirst: false, isLast: true }],
      ]);
      expect(
        pages.map((p) => {
          const item = p[0].item;
          return item.kind === 'leaf' ? item.height : null;
        }),
      ).toEqual([30, 30, 30, 10]);

      snapshotPages(pages, region(30), 'split-chained');
    });

    test('split returning null treats item as unsplittable', () => {
      const warn = silenceWarnings();

      const items: Item[] = [
        leaf(10, 'a'),
        { kind: 'leaf', height: 100, id: 'big', split: () => null },
      ];
      const pages = paginateFlow(items, 30);

      // 'big' doesn't fit on page 1 and declines to split — page 1 keeps 'a',
      // 'big' moves to page 2 where it's oversized on an empty page and
      // triggers the oversized-overflow warning.
      expect(pages).toHaveLength(2);
      expect(pages[0].map((p) => p.item.id)).toEqual(['a']);
      expect(pages[1]).toHaveLength(1);
      expect(pages[1][0].item.id).toBe('big');
      expect(pages[1][0].part).toEqual({ isFirst: true, isLast: true });
      expect(warn).toHaveBeenCalledOnce();

      snapshotPages(pages, region(30), 'split-returns-null');
    });

    test('oversized splittable item slices cleanly without warning', () => {
      const warn = silenceWarnings();

      const pages = paginateFlow([splittable(90, 'tall')], 30);

      expect(warn).not.toHaveBeenCalled();
      expect(pages).toHaveLength(3);
      expect(
        pages.map((p) => {
          const item = p[0].item;
          return item.kind === 'leaf' ? item.height : null;
        }),
      ).toEqual([30, 30, 30]);
      expect(pages[0][0].part).toEqual({ isFirst: true, isLast: false });
      expect(pages[1][0].part).toEqual({
        isFirst: false,
        isLast: false,
      });
      expect(pages[2][0].part).toEqual({ isFirst: false, isLast: true });

      snapshotPages(pages, region(30), 'split-oversized');
    });
  });

  describe('containers', () => {
    test('fits whole with nested children', () => {
      const items: Item[] = [
        column([leaf(10, 'a'), leaf(10, 'b'), leaf(10, 'c')], 'C'),
      ];
      const pages = paginateFlow(items, 100);

      expect(pages).toHaveLength(1);
      expect(pages[0]).toHaveLength(1);
      expect(pages[0][0].item.id).toBe('C');
      expect(pages[0][0].y).toBe(0);
      expect(pages[0][0].part).toEqual({ isFirst: true, isLast: true });
      expect(pages[0][0].children).toHaveLength(3);
      expect(pages[0][0].children?.map((c) => c.item.id)).toEqual([
        'a',
        'b',
        'c',
      ]);
      expect(pages[0][0].children?.map((c) => c.y)).toEqual([0, 10, 20]);

      snapshotPages(pages, region(100), 'container-whole');
    });

    test('splits at page boundary', () => {
      const warn = silenceWarnings();

      const items: Item[] = [
        column(
          [leaf(10, 'a'), leaf(10, 'b'), leaf(10, 'c'), leaf(10, 'd')],
          'C',
        ),
      ];
      const pages = paginateFlow(items, 25);

      expect(warn).not.toHaveBeenCalled();
      expect(pages).toHaveLength(2);

      expect(pages[0][0].item.id).toBe('C');
      expect(pages[0][0].part).toEqual({ isFirst: true, isLast: false });
      expect(pages[0][0].children?.map((c) => c.item.id)).toEqual(['a', 'b']);

      expect(pages[1][0].item.id).toBe('C');
      expect(pages[1][0].part).toEqual({ isFirst: false, isLast: true });
      expect(pages[1][0].children?.map((c) => c.item.id)).toEqual(['c', 'd']);

      snapshotPages(pages, region(25), 'container-split');
    });

    test('nested containers split at inner boundary', () => {
      const warn = silenceWarnings();

      const items: Item[] = [
        column(
          [
            column(
              [leaf(10, 'b1'), leaf(10, 'b2'), leaf(10, 'b3'), leaf(10, 'b4')],
              'B',
            ),
          ],
          'A',
        ),
      ];
      const pages = paginateFlow(items, 30);

      expect(warn).not.toHaveBeenCalled();
      expect(pages).toHaveLength(2);

      // Page 1: A(isFirst=t, isLast=f) > B(isFirst=t, isLast=f) > [b1, b2, b3]
      const a1 = pages[0][0];
      expect(a1.part).toEqual({ isFirst: true, isLast: false });
      const b1 = a1.children?.[0];
      expect(b1?.item.id).toBe('B');
      expect(b1?.part).toEqual({ isFirst: true, isLast: false });
      expect(b1?.children?.map((c) => c.item.id)).toEqual(['b1', 'b2', 'b3']);

      // Page 2: A(isFirst=f, isLast=t) > B(isFirst=f, isLast=t) > [b4]
      const a2 = pages[1][0];
      expect(a2.part).toEqual({ isFirst: false, isLast: true });
      const b2 = a2.children?.[0];
      expect(b2?.part).toEqual({ isFirst: false, isLast: true });
      expect(b2?.children?.map((c) => c.item.id)).toEqual(['b4']);

      snapshotPages(pages, region(30), 'container-nested-split');
    });

    test('splits where an inner splittable leaf slices', () => {
      const warn = silenceWarnings();

      const items: Item[] = [column([leaf(10, 'a'), splittable(40, 'b')], 'C')];
      const pages = paginateFlow(items, 30);

      expect(warn).not.toHaveBeenCalled();
      expect(pages).toHaveLength(2);

      // Page 1: C (not last) > [a (whole), b/1 (not last)]
      const c1 = pages[0][0];
      expect(c1.part).toEqual({ isFirst: true, isLast: false });
      expect(c1.children).toHaveLength(2);
      expect(c1.children?.[0].item.id).toBe('a');
      expect(c1.children?.[0].part).toEqual({ isFirst: true, isLast: true });
      expect(c1.children?.[1].item.id).toBe('b/1');
      expect((c1.children?.[1].item as LeafItem).height).toBe(20);
      expect(c1.children?.[1].part).toEqual({ isFirst: true, isLast: false });

      // Page 2: C (not first) > [b/2 (not first)]
      const c2 = pages[1][0];
      expect(c2.part).toEqual({ isFirst: false, isLast: true });
      expect(c2.children).toHaveLength(1);
      expect(c2.children?.[0].item.id).toBe('b/2');
      expect((c2.children?.[0].item as LeafItem).height).toBe(20);
      expect(c2.children?.[0].part).toEqual({ isFirst: false, isLast: true });

      snapshotPages(pages, region(30), 'container-leaf-split');
    });
  });

  describe('edge spacers', () => {
    test('spacers contribute to fragment height — they can force a page break', () => {
      const items: Item[] = [
        column([spacer(5, 'padT'), leaf(20, 'a'), spacer(5, 'padB')], 'C'),
        leaf(10, 'next'),
      ];
      const pages = paginateFlow(items, 35);

      expect(pages).toHaveLength(2);
      expect(pages[0].map((p) => p.item.id)).toEqual(['C']);
      expect(pages[1].map((p) => p.item.id)).toEqual(['next']);
    });

    test('spacers occupy flow space like any child', () => {
      const items: Item[] = [
        column(
          [spacer(7, 'padT'), leaf(10, 'a'), leaf(10, 'b'), spacer(6, 'padB')],
          'C',
        ),
      ];
      const pages = paginateFlow(items, 100);

      expect(pages).toHaveLength(1);
      const c = pages[0][0];
      expect(c.y).toBe(0);
      expect(c.part).toEqual({ isFirst: true, isLast: true });
      expect(c.children?.map((k) => k.y)).toEqual([0, 7, 17, 27]);
    });

    test('split keeps y continuous on both slices', () => {
      const warn = silenceWarnings();

      // 7 + 10 + 10 = 27 ≤ 28; c would overflow → break after b
      const items: Item[] = [
        column(
          [
            spacer(7, 'padT'),
            leaf(10, 'a'),
            leaf(10, 'b'),
            leaf(10, 'c'),
            leaf(10, 'd'),
            spacer(6, 'padB'),
          ],
          'C',
        ),
      ];
      const pages = paginateFlow(items, 28);

      expect(warn).not.toHaveBeenCalled();
      expect(pages).toHaveLength(2);

      const c1 = pages[0][0];
      expect(c1.part).toEqual({ isFirst: true, isLast: false });
      expect(c1.children?.map((k) => k.item.id)).toEqual(['padT', 'a', 'b']);
      expect(c1.children?.map((k) => k.y)).toEqual([0, 7, 17]);

      const c2 = pages[1][0];
      expect(c2.part).toEqual({ isFirst: false, isLast: true });
      expect(c2.children?.map((k) => k.item.id)).toEqual(['c', 'd', 'padB']);
      expect(c2.children?.map((k) => k.y)).toEqual([0, 10, 20]);
    });

    test('edge spacers render on whole container', () => {
      const items: Item[] = [
        column(
          [
            spacer(9, 'padT'),
            leaf(10, 'a'),
            leaf(10, 'b'),
            leaf(10, 'c'),
            spacer(9, 'padB'),
          ],
          'C',
        ),
      ];
      const pages = paginateFlow(items, 100);

      expect(pages).toHaveLength(1);
      snapshotPages(pages, region(100), 'container-frame-whole');
    });

    test('edge spacers stay off the break pages', () => {
      const warn = silenceWarnings();

      const items: Item[] = [
        column(
          [
            spacer(9, 'padT'),
            leaf(10, 'a'),
            leaf(10, 'b'),
            leaf(10, 'c'),
            leaf(10, 'd'),
            spacer(9, 'padB'),
          ],
          'C',
        ),
      ];
      const pages = paginateFlow(items, 30);

      expect(warn).not.toHaveBeenCalled();
      // padT rides with page 1, padB with the last page; the middle break
      // carries no edge spacers at all.
      expect(pages[0][0].children?.[0].item.id).toBe('padT');
      const last = pages[pages.length - 1][0];
      expect(last.children?.[last.children.length - 1].item.id).toBe('padB');
      snapshotPages(pages, region(30), 'container-frame-split');
    });

    test('container with edge spacers spans three pages', () => {
      const warn = silenceWarnings();

      const items: Item[] = [
        column(
          [
            spacer(5, 'padT'),
            ...Array.from({ length: 7 }, (_, i) => leaf(10, `c${i + 1}`)),
            spacer(5, 'padB'),
          ],
          'C',
        ),
      ];
      const pages = paginateFlow(items, 30);

      expect(warn).not.toHaveBeenCalled();
      expect(pages).toHaveLength(3);

      expect(pages[0][0].part).toEqual({ isFirst: true, isLast: false });
      expect(pages[1][0].part).toEqual({ isFirst: false, isLast: false });
      expect(pages[2][0].part).toEqual({ isFirst: false, isLast: true });

      expect(pages[0][0].children?.map((c) => c.item.id)).toEqual([
        'padT',
        'c1',
        'c2',
      ]);
      expect(pages[1][0].children?.map((c) => c.item.id)).toEqual([
        'c3',
        'c4',
        'c5',
      ]);
      expect(pages[2][0].children?.map((c) => c.item.id)).toEqual([
        'c6',
        'c7',
        'padB',
      ]);

      snapshotPages(pages, region(30), 'container-frame-three-pages');
    });

    test('nested containers with edge spacers split', () => {
      const warn = silenceWarnings();

      const items: Item[] = [
        column(
          [
            spacer(6, 'A-padT'),
            column(
              [
                spacer(4, 'B-padT'),
                leaf(10, 'b1'),
                leaf(10, 'b2'),
                leaf(10, 'b3'),
                leaf(10, 'b4'),
                spacer(4, 'B-padB'),
              ],
              'B',
            ),
            spacer(6, 'A-padB'),
          ],
          'A',
        ),
      ];
      const pages = paginateFlow(items, 40);

      expect(warn).not.toHaveBeenCalled();
      expect(pages).toHaveLength(2);
      expect(pages[0][0].part).toEqual({ isFirst: true, isLast: false });
      expect(pages[1][0].part).toEqual({ isFirst: false, isLast: true });

      snapshotPages(pages, region(40), 'container-frame-nested-split');
    });

    test('column filling the region exactly stays whole', () => {
      const items: Item[] = [
        column(
          [
            spacer(10, 'padT'),
            leaf(40, 'a'),
            leaf(40, 'b'),
            spacer(10, 'padB'),
          ],
          'C',
        ),
      ];
      const pages = paginateFlow(items, 100);

      expect(pages).toHaveLength(1);
      expect(pages[0][0].part).toEqual({ isFirst: true, isLast: true });
      snapshotPages(pages, region(100), 'container-frame-exact-fit');
    });

    test('forbid-bound spacer travels with its neighbor', () => {
      const warn = silenceWarnings();

      // 10 + 40 + 45 + 10 = 105 > 100. The FORBID before padB pulls b along:
      // the break happens after a, and b arrives with the bottom spacer.
      const items: Item[] = [
        column(
          [
            spacer(10, 'padT'),
            leaf(40, 'a'),
            leaf(45, 'b'),
            FORBID_BREAK,
            spacer(10, 'padB'),
          ],
          'C',
        ),
      ];
      const pages = paginateFlow(items, 100);

      expect(warn).not.toHaveBeenCalled();
      expect(pages).toHaveLength(2);
      expect(pages[0][0].children?.map((c) => c.item.id)).toEqual([
        'padT',
        'a',
      ]);
      expect(pages[1][0].children?.map((c) => c.item.id)).toEqual([
        'b',
        'padB',
      ]);
      snapshotPages(pages, region(100), 'spacer-forbid-bound');
    });

    test('plain spacer may land alone on the next page', () => {
      const warn = silenceWarnings();

      const items: Item[] = [
        spacer(10, 'padT'),
        leaf(40, 'a'),
        leaf(45, 'b'),
        spacer(10, 'padB'),
      ];
      const pages = paginateFlow(items, 100);

      expect(warn).not.toHaveBeenCalled();
      expect(pages.map((p) => p.map((x) => x.item.id))).toEqual([
        ['padT', 'a', 'b'],
        ['padB'],
      ]);
    });

    test('splittable spacer distributes across the break', () => {
      const warn = silenceWarnings();

      const items: Item[] = [
        spacer(10, 'padT'),
        leaf(40, 'a'),
        leaf(45, 'b'),
        splittableSpacer(10, 'padB'),
      ];
      const pages = paginateFlow(items, 100);

      expect(warn).not.toHaveBeenCalled();
      expect(pages.map((p) => p.map((x) => x.item.id))).toEqual([
        ['padT', 'a', 'b', 'padB/1'],
        ['padB/2'],
      ]);
      // 5 units fill page 1 to the edge, the other 5 continue
      expect((pages[0][3].item as LeafItem).height).toBe(5);
      expect((pages[1][0].item as LeafItem).height).toBe(5);
      snapshotPages(pages, region(100), 'spacer-distributes');
    });
  });

  describe('mixed flows', () => {
    test('leaf → container → leaf on one page', () => {
      const items: Item[] = [
        leaf(10, 'head'),
        column([leaf(10, 'c1'), leaf(10, 'c2')], 'C'),
        leaf(10, 'tail'),
      ];
      const pages = paginateFlow(items, 100);

      expect(pages).toHaveLength(1);
      expect(pages[0].map((p) => p.item.id)).toEqual(['head', 'C', 'tail']);
      expect(pages[0].map((p) => p.y)).toEqual([0, 10, 30]);

      snapshotPages(pages, region(100), 'mixed-leaf-container-leaf');
    });

    test('leaf → splitting container → leaf across pages', () => {
      const warn = silenceWarnings();

      const items: Item[] = [
        leaf(10, 'head'),
        column([leaf(10, 'c1'), leaf(10, 'c2'), leaf(10, 'c3')], 'C'),
        leaf(10, 'tail'),
      ];
      const pages = paginateFlow(items, 20);

      expect(warn).not.toHaveBeenCalled();
      expect(pages.map((p) => p.map((x) => x.item.id))).toEqual([
        ['head', 'C'],
        ['C'],
        ['tail'],
      ]);
      expect(pages[0][1].part).toEqual({ isFirst: true, isLast: false });
      expect(pages[1][0].part).toEqual({ isFirst: false, isLast: true });

      snapshotPages(pages, region(20), 'mixed-container-split-tail');
    });

    test('forbid-bound bottom spacer breaks its container', () => {
      const warn = silenceWarnings();

      // 10 + 10 + 5 = 25 > 24; the forbid pulls b to page 2 with the spacer
      const items: Item[] = [
        column(
          [leaf(10, 'a'), leaf(10, 'b'), FORBID_BREAK, spacer(5, 'padB')],
          'C',
        ),
        leaf(10, 'next'),
      ];
      const pages = paginateFlow(items, 24);

      expect(warn).not.toHaveBeenCalled();
      expect(pages.map((p) => p.map((x) => x.item.id))).toEqual([
        ['C'],
        ['C'],
        ['next'],
      ]);
      expect(pages[0][0].part).toEqual({ isFirst: true, isLast: false });
      expect(pages[0][0].children?.map((k) => k.item.id)).toEqual(['a']);
      expect(pages[1][0].part).toEqual({ isFirst: false, isLast: true });
      expect(pages[1][0].children?.map((k) => k.item.id)).toEqual([
        'b',
        'padB',
      ]);

      snapshotPages(pages, region(24), 'container-bottom-frame-break');
    });

    test('triple-nested containers split together', () => {
      const warn = silenceWarnings();

      const items: Item[] = [
        column(
          [
            column(
              [column([leaf(10, 'l1'), leaf(10, 'l2'), leaf(10, 'l3')], 'C')],
              'B',
            ),
          ],
          'A',
        ),
      ];
      const pages = paginateFlow(items, 25);

      expect(warn).not.toHaveBeenCalled();
      expect(pages).toHaveLength(2);

      const a1 = pages[0][0];
      expect(a1.part).toEqual({ isFirst: true, isLast: false });
      const b1 = a1.children?.[0];
      expect(b1?.part).toEqual({ isFirst: true, isLast: false });
      const c1 = b1?.children?.[0];
      expect(c1?.part).toEqual({ isFirst: true, isLast: false });
      expect(c1?.children?.map((k) => k.item.id)).toEqual(['l1', 'l2']);

      const a2 = pages[1][0];
      expect(a2.part).toEqual({ isFirst: false, isLast: true });
      const b2 = a2.children?.[0];
      expect(b2?.part).toEqual({ isFirst: false, isLast: true });
      const c2 = b2?.children?.[0];
      expect(c2?.part).toEqual({ isFirst: false, isLast: true });
      expect(c2?.children?.map((k) => k.item.id)).toEqual(['l3']);

      snapshotPages(pages, region(25), 'triple-nested-split');
    });

    test('heterogeneous children — leaf, inner container, leaf', () => {
      const items: Item[] = [
        column(
          [
            leaf(10, 'pre'),
            column([leaf(10, 'i1'), leaf(10, 'i2')], 'inner'),
            leaf(10, 'post'),
          ],
          'C',
        ),
      ];
      const pages = paginateFlow(items, 100);

      expect(pages).toHaveLength(1);
      const c = pages[0][0];
      expect(c.children?.map((k) => k.item.id)).toEqual([
        'pre',
        'inner',
        'post',
      ]);
      expect(c.children?.map((k) => k.y)).toEqual([0, 10, 30]);

      snapshotPages(pages, region(100), 'heterogeneous-children');
    });
  });

  describe('penalties', () => {
    test('FORCE_BREAK between two leaves splits pages', () => {
      const items: Item[] = [leaf(10, 'a'), FORCE_BREAK, leaf(10, 'b')];
      const pages = paginateFlow(items, 100);

      expect(pages).toHaveLength(2);
      expect(pages[0].map((p) => p.item.id)).toEqual(['a']);
      expect(pages[1].map((p) => p.item.id)).toEqual(['b']);
    });

    test('FORCE_BREAK at start of flow produces an empty first page', () => {
      const items: Item[] = [FORCE_BREAK, leaf(10, 'a')];
      const pages = paginateFlow(items, 100);

      expect(pages).toHaveLength(2);
      expect(pages[0]).toEqual([]);
      expect(
        pages[1].map((p) => (p.item.kind !== 'penalty' ? p.item.id : null)),
      ).toEqual(['a']);
    });

    test('FORCE_BREAK inside a container splits the container across pages', () => {
      const items: Item[] = [
        column([leaf(10, 'a'), FORCE_BREAK, leaf(10, 'b')], 'C'),
      ];
      const pages = paginateFlow(items, 100);

      expect(pages).toHaveLength(2);
      const c1 = pages[0][0];
      expect(c1.item.kind === 'column' ? c1.item.id : undefined).toBe('C');
      expect(c1.part).toEqual({ isFirst: true, isLast: false });
      expect(
        c1.children?.map((k) => (k.item.kind !== 'penalty' ? k.item.id : null)),
      ).toEqual(['a']);

      const c2 = pages[1][0];
      expect(c2.item.kind === 'column' ? c2.item.id : undefined).toBe('C');
      expect(c2.part).toEqual({ isFirst: false, isLast: true });
      expect(
        c2.children?.map((k) => (k.item.kind !== 'penalty' ? k.item.id : null)),
      ).toEqual(['b']);
    });

    test('FORBID_BREAK between two leaves keeps them on the same page', () => {
      const items: Item[] = [
        leaf(10, 'a'),
        leaf(10, 'b'),
        FORBID_BREAK,
        leaf(10, 'c'),
        leaf(10, 'd'),
      ];
      const pages = paginateFlow(items, 25);

      expect(pages).toHaveLength(3);
      expect(
        pages[0].map((p) => (p.item.kind !== 'penalty' ? p.item.id : null)),
      ).toEqual(['a']);
      expect(
        pages[1].map((p) => (p.item.kind !== 'penalty' ? p.item.id : null)),
      ).toEqual(['b', 'c']);
      expect(
        pages[2].map((p) => (p.item.kind !== 'penalty' ? p.item.id : null)),
      ).toEqual(['d']);
    });

    test('consecutive FORBID_BREAK penalties still forbid the surrounded boundary', () => {
      const items: Item[] = [
        leaf(10, 'a'),
        leaf(10, 'b'),
        FORBID_BREAK,
        FORBID_BREAK,
        leaf(10, 'c'),
      ];
      const pages = paginateFlow(items, 25);

      expect(pages).toHaveLength(2);
      expect(
        pages[0].map((p) => (p.item.kind !== 'penalty' ? p.item.id : null)),
      ).toEqual(['a']);
      expect(
        pages[1].map((p) => (p.item.kind !== 'penalty' ? p.item.id : null)),
      ).toEqual(['b', 'c']);
    });

    test('FORBID_BREAK inside a container prevents inner split at that boundary', () => {
      const items: Item[] = [
        column(
          [leaf(10, 'a'), leaf(10, 'b'), FORBID_BREAK, leaf(10, 'c')],
          'C',
        ),
      ];
      const pages = paginateFlow(items, 25);

      expect(pages).toHaveLength(2);
      const c1 = pages[0][0];
      expect(c1.item.kind === 'column' ? c1.item.id : undefined).toBe('C');
      expect(c1.part).toEqual({ isFirst: true, isLast: false });
      expect(
        c1.children?.map((k) => (k.item.kind !== 'penalty' ? k.item.id : null)),
      ).toEqual(['a']);

      const c2 = pages[1][0];
      expect(c2.item.kind === 'column' ? c2.item.id : undefined).toBe('C');
      expect(c2.part).toEqual({ isFirst: false, isLast: true });
      expect(
        c2.children?.map((k) => (k.item.kind !== 'penalty' ? k.item.id : null)),
      ).toEqual(['b', 'c']);
    });

    test('unsplittable overflow still commits at the last placed item (no regression)', () => {
      const warn = silenceWarnings();

      const items: Item[] = [leaf(10, 'a'), leaf(10, 'b'), leaf(10, 'c')];
      const pages = paginateFlow(items, 25);

      expect(warn).not.toHaveBeenCalled();
      expect(pages).toHaveLength(2);
      expect(
        pages[0].map((p) => (p.item.kind !== 'penalty' ? p.item.id : null)),
      ).toEqual(['a', 'b']);
      expect(
        pages[1].map((p) => (p.item.kind !== 'penalty' ? p.item.id : null)),
      ).toEqual(['c']);
    });

    test('FORCE_BREAK snapshot — two pages with a visible break', () => {
      const items: Item[] = [leaf(15, 'a'), FORCE_BREAK, leaf(15, 'b')];
      const pages = paginateFlow(items, 100);

      expect(pages).toHaveLength(2);
      snapshotPages(pages, region(100), 'penalty-force-break');
    });

    test('FORCE_BREAK in container snapshot — container splits at the penalty', () => {
      const items: Item[] = [
        column(
          [
            spacer(5, 'padT'),
            leaf(10, 'a'),
            FORCE_BREAK,
            leaf(10, 'b'),
            spacer(5, 'padB'),
          ],
          'C',
        ),
      ];
      const pages = paginateFlow(items, 100);

      expect(pages).toHaveLength(2);
      snapshotPages(pages, region(100), 'penalty-force-break-in-container');
    });

    test('FORBID_BREAK group snapshot — b and c travel together to page 2', () => {
      const items: Item[] = [
        leaf(10, 'a'),
        leaf(10, 'b'),
        FORBID_BREAK,
        leaf(10, 'c'),
        leaf(10, 'd'),
      ];
      const pages = paginateFlow(items, 25);

      expect(pages).toHaveLength(3);
      snapshotPages(pages, region(25), 'penalty-forbid-break-group');
    });

    test('FORBID_BREAK in container snapshot — inner b,c travel together to page 2', () => {
      const items: Item[] = [
        column(
          [
            leaf(10, 'a'),
            leaf(10, 'b'),
            FORBID_BREAK,
            leaf(10, 'c'),
            leaf(10, 'd'),
          ],
          'C',
        ),
      ];
      const pages = paginateFlow(items, 25);

      expect(pages).toHaveLength(3);
      snapshotPages(pages, region(25), 'penalty-forbid-break-in-container');
    });
  });

  describe('minPresenceAhead windows', () => {
    const window = (ahead: number): PenaltyItem => ({
      kind: 'penalty',
      type: 'forbid',
      ahead,
    });

    test('moves the preceding item when too little follows on the page', () => {
      const items: Item[] = [
        leaf(60, 'a'),
        leaf(30, 'x'),
        window(50),
        leaf(40, 'y'),
      ];
      const pages = paginateFlow(items, 100);

      expect(pages.map((p) => p.map((c) => c.item.id))).toEqual([
        ['a'],
        ['x', 'y'],
      ]);

      snapshotPages(
        paginate(column(items), 100),
        region(100),
        'min-presence-moves',
      );
    });

    test('stays put when enough of what follows fits', () => {
      const items: Item[] = [
        leaf(20, 'a'),
        leaf(30, 'x'),
        window(50),
        leaf(40, 'y'),
      ];
      const pages = paginateFlow(items, 100);

      expect(pages.map((p) => p.map((c) => c.item.id))).toEqual([
        ['a', 'x', 'y'],
      ]);
    });

    test('inert at the top of a page, where moving would not help', () => {
      const items: Item[] = [leaf(30, 'x'), window(200), leaf(90, 'y')];
      const pages = paginateFlow(items, 100);

      expect(pages.map((p) => p.map((c) => c.item.id))).toEqual([['x'], ['y']]);
    });

    test('forbids splitting inside the window', () => {
      const items: Item[] = [
        leaf(60, 'a'),
        leaf(20, 'x'),
        window(60),
        splittable(100, 'b'),
      ];
      const pages = paginateFlow(items, 100);

      expect(pages.map((p) => p.map((c) => c.item.id))).toEqual([
        ['a'],
        ['x', 'b/1'],
        ['b/2'],
      ]);

      snapshotPages(
        paginate(column(items), 100),
        region(100),
        'min-presence-no-split',
      );
    });

    test('relaxes when nothing follows', () => {
      const items: Item[] = [leaf(60, 'a'), leaf(30, 'x'), window(50)];
      const pages = paginateFlow(items, 100);

      expect(pages.map((p) => p.map((c) => c.item.id))).toEqual([['a', 'x']]);
    });
  });

  describe('item data payload', () => {
    test('data rides through placement untouched, including splits', () => {
      const first = { tag: 'first' };
      const rest = { tag: 'rest' };

      const splitting: LeafItem = {
        kind: 'leaf',
        height: 40,
        data: first,
        split: (avail) => ({
          current: { kind: 'leaf', height: avail, data: first },
          next: { kind: 'leaf', height: 40 - avail, data: rest },
        }),
      };

      const root: Item = {
        kind: 'column',
        data: rest,
        children: [leaf(10, 'a'), splitting],
      };

      const pages = paginate(root, 30);

      expect(pages).toHaveLength(2);
      expect(pages[0][0].item.data).toBe(rest);
      expect(pages[0][0].children?.[1].item.data).toBe(first);
      expect(pages[1][0].children?.[0].item.data).toBe(rest);

      snapshotPages(pages, region(30), 'data-passthrough');
    });
  });

  describe('lazy items', () => {
    test('ctx type surfaces through public API (compile-time smoke)', () => {
      // Just a type-level check: LazyItem and Ctx are exported.
      const readCtx = (ctx: Ctx) => ctx.pageNumber;
      const lazy: LazyItem = {
        kind: 'lazy',
        materialize: (ctx: Ctx) => {
          readCtx(ctx);
          return [];
        },
      };
      expect(lazy.kind).toBe('lazy');
    });

    test('lazy item with empty materialization is a no-op', () => {
      const items: Item[] = [
        leaf(10, 'a'),
        { kind: 'lazy', materialize: () => [] },
        leaf(10, 'b'),
      ];
      const pages = paginateFlow(items, 100);

      expect(pages).toHaveLength(1);
      expect(pages[0].map((p) => p.item.id)).toEqual(['a', 'b']);
    });

    test('lazy materialization inserts items into the flow at its position', () => {
      let callCount = 0;
      const items: Item[] = [
        leaf(10, 'a'),
        {
          kind: 'lazy',
          materialize: () => {
            callCount += 1;
            return [leaf(10, 'x'), leaf(10, 'y')];
          },
        },
        leaf(10, 'b'),
      ];
      const pages = paginateFlow(items, 100);

      expect(callCount).toBe(1);
      expect(pages).toHaveLength(1);
      expect(pages[0].map((p) => p.item.id)).toEqual(['a', 'x', 'y', 'b']);
    });

    test('partial fit of materialization commits at original pageNumber', () => {
      const seenPages: number[] = [];
      const items: Item[] = [
        {
          kind: 'lazy',
          materialize: (ctx) => {
            seenPages.push(ctx.pageNumber);
            return [leaf(10, 'x'), leaf(10, 'y'), leaf(10, 'z')];
          },
        },
      ];
      const pages = paginateFlow(items, 25);

      // Height 25 fits x (10) and y (10). z overflows, rewinds to after y.
      expect(pages).toHaveLength(2);
      expect(pages[0].map((p) => p.item.id)).toEqual(['x', 'y']);
      expect(pages[1].map((p) => p.item.id)).toEqual(['z']);

      // Materialize called exactly once at pageNumber 1. z on page 2 is the
      // *remainder* of the already-materialized slice, not a re-materialization.
      expect(seenPages).toEqual([1]);
    });

    test('materialize(ctx) sees the pageNumber of the page it lands on', () => {
      const seenPages: number[] = [];
      const items: Item[] = [
        leaf(90, 'big'),
        {
          kind: 'lazy',
          materialize: (ctx) => {
            seenPages.push(ctx.pageNumber);
            return [leaf(50, 'm')];
          },
        },
      ];
      const pages = paginateFlow(items, 100);

      // Page 1: big (90). Lazy materializes with pageNumber=1, produces [m (50)];
      // m doesn't fit in remaining 10 units, no commit → un-splice and defer.
      // Page 2: re-materialize with pageNumber=2, produces [m]; m fits.
      expect(pages).toHaveLength(2);
      expect(pages[0].map((p) => p.item.id)).toEqual(['big']);
      expect(pages[1].map((p) => p.item.id)).toEqual(['m']);

      // Called twice: once on page 1 (uncommitted, dropped), once on page 2.
      expect(seenPages).toEqual([1, 2]);
    });

    test('lazy re-materializes on the next page when nothing commits', () => {
      const seenPages: number[] = [];
      const items: Item[] = [
        leaf(90, 'big'),
        {
          kind: 'lazy',
          id: 'lz',
          materialize: (ctx) => {
            seenPages.push(ctx.pageNumber);
            return [leaf(50, 'm')];
          },
        },
      ];
      const pages = paginateFlow(items, 100);

      // Page 1: big (90). Lazy materializes -> [m (50)]. m doesn't fit in
      // remaining 10 units. Nothing commits from the materialization, so
      // un-splice and roll the lazy to page 2. On page 2, re-materialize
      // with ctx.pageNumber=2, m fits.
      expect(pages).toHaveLength(2);
      expect(pages[0].map((p) => p.item.id)).toEqual(['big']);
      expect(pages[1].map((p) => p.item.id)).toEqual(['m']);

      // Materialize was called twice: once on page 1 (uncommitted, dropped),
      // once on page 2 (committed).
      expect(seenPages).toEqual([1, 2]);
    });

    test('lazy that materializes to empty array on uncommitted page does not loop', () => {
      let callCount = 0;
      const items: Item[] = [
        leaf(90, 'big'),
        {
          kind: 'lazy',
          materialize: () => {
            callCount += 1;
            return [];
          },
        },
        leaf(50, 'b'),
      ];
      const pages = paginateFlow(items, 100);

      // Page 1: big (90) + empty materialization (0) fits; b (50) overflows.
      // bestBreak rewinds to after big. Lazy counts as committed (empty range
      // is trivially "committed" on materialization since nothing could fail).
      // Page 2: b fits.
      expect(pages).toHaveLength(2);
      expect(pages[0].map((p) => p.item.id)).toEqual(['big']);
      expect(pages[1].map((p) => p.item.id)).toEqual(['b']);
      expect(callCount).toBe(1);
    });

    test('lazy inside a container materializes during inner recursion', () => {
      let callCount = 0;
      const items: Item[] = [
        column(
          [
            leaf(10, 'a'),
            {
              kind: 'lazy',
              materialize: () => {
                callCount += 1;
                return [leaf(10, 'x')];
              },
            },
            leaf(10, 'b'),
          ],
          'C',
        ),
      ];
      const pages = paginateFlow(items, 100);

      expect(callCount).toBe(1);
      expect(pages).toHaveLength(1);
      const c = pages[0][0];
      expect(c.item.id).toBe('C');
      expect(c.children?.map((k) => k.item.id)).toEqual(['a', 'x', 'b']);
    });

    test('lazy happy-path snapshot — materialized items render inline', () => {
      const items: Item[] = [
        leaf(15, 'a'),
        {
          kind: 'lazy',
          materialize: () => [leaf(15, 'x'), leaf(15, 'y')],
        },
        leaf(15, 'b'),
      ];
      const pages = paginateFlow(items, 100);

      expect(pages).toHaveLength(1);
      snapshotPages(pages, region(100), 'lazy-happy-path');
    });

    test('lazy re-materialization snapshot — lazy rolls to page 2', () => {
      const items: Item[] = [
        leaf(90, 'big'),
        {
          kind: 'lazy',
          materialize: (ctx) => [leaf(50, `m${ctx.pageNumber}`)],
        },
      ];
      const pages = paginateFlow(items, 100);

      expect(pages).toHaveLength(2);
      // Proof of re-materialization: the id embeds the pageNumber the render
      // function saw, so page 2 shows `m2` (not `m1`).
      const pg2Placed = pages[1].map((p) => p.item.id);
      expect(pg2Placed).toEqual(['m2']);

      snapshotPages(pages, region(100), 'lazy-rematerialize-on-advance');
    });

    test('lazy inside container snapshot — padded container with injected child', () => {
      const items: Item[] = [
        column(
          [
            spacer(5, 'padT'),
            leaf(10, 'a'),
            {
              kind: 'lazy',
              materialize: () => [leaf(15, 'x')],
            },
            leaf(10, 'b'),
            spacer(5, 'padB'),
          ],
          'C',
        ),
      ];
      const pages = paginateFlow(items, 100);

      expect(pages).toHaveLength(1);
      snapshotPages(pages, region(100), 'lazy-in-container');
    });

    test('lazy materializing a container with leaves snapshot', () => {
      const items: Item[] = [
        leaf(10, 'a'),
        {
          kind: 'lazy',
          materialize: () => [
            column(
              [
                spacer(5, 'padT'),
                leaf(10, 'x'),
                leaf(10, 'y'),
                spacer(5, 'padB'),
              ],
              'M',
            ),
          ],
        },
        leaf(10, 'b'),
      ];
      const pages = paginateFlow(items, 100);

      expect(pages).toHaveLength(1);
      snapshotPages(pages, region(100), 'lazy-materializes-container');
    });

    test('lazy materializing a container that splits across pages snapshot', () => {
      const items: Item[] = [
        leaf(10, 'a'),
        {
          kind: 'lazy',
          materialize: () => [
            column(
              [
                spacer(5, 'padT'),
                leaf(15, 'x'),
                leaf(15, 'y'),
                leaf(15, 'z'),
                spacer(5, 'padB'),
              ],
              'M',
            ),
          ],
        },
        leaf(10, 'b'),
      ];
      const pages = paginateFlow(items, 50);

      expect(pages).toHaveLength(2);
      snapshotPages(pages, region(50), 'lazy-materializes-container-split');
    });

    test('lazy re-materializes on next page when nothing commits snapshot', () => {
      const items: Item[] = [
        leaf(10, 'a'),
        leaf(30, 'b'),
        {
          kind: 'lazy',
          materialize: (ctx) => [leaf(20, `m${ctx.pageNumber}`)],
        },
      ];
      const pages = paginateFlow(items, 50);

      // Page 1: a(10) + b(30) = 40 used; 10 remaining. Lazy materializes a
      // 20-height leaf that doesn't fit in 10. Nothing commits → un-splice
      // the lazy, rewind to after b. Page 2: materialize runs again with
      // ctx.pageNumber=2, so the leaf id is `m2` (not `m1`) — proof of
      // re-materialization.
      expect(pages).toHaveLength(2);
      expect(pages[0].map((p) => p.item.id)).toEqual(['a', 'b']);
      expect(pages[1].map((p) => p.item.id)).toEqual(['m2']);

      snapshotPages(pages, region(50), 'lazy-rematerializes-nothing-commits');
    });

    test('lazy output tracks the page it lands on across a long flow snapshot', () => {
      const makePageLabel = (ctx: Ctx): Item[] => [
        leaf(15, `page-${ctx.pageNumber}`),
      ];
      const items: Item[] = [
        leaf(30, 'body-1'),
        { kind: 'lazy', materialize: makePageLabel },
        leaf(30, 'body-2'),
        { kind: 'lazy', materialize: makePageLabel },
        leaf(30, 'body-3'),
        { kind: 'lazy', materialize: makePageLabel },
      ];
      const pages = paginateFlow(items, 60);

      // Each page fits one body (30) + its label (15) = 45. The next body
      // overflows, rewinds. Each lazy commits on its own page and sees the
      // pageNumber of that page, so labels read page-1, page-2, page-3.
      expect(pages).toHaveLength(3);
      expect(pages.map((p) => p.map((x) => x.item.id))).toEqual([
        ['body-1', 'page-1'],
        ['body-2', 'page-2'],
        ['body-3', 'page-3'],
      ]);

      snapshotPages(pages, region(60), 'lazy-page-number-per-page');
    });

    test('lazy materializing a FORCE_BREAK snapshot', () => {
      const items: Item[] = [
        leaf(20, 'a'),
        {
          kind: 'lazy',
          materialize: () => [leaf(20, 'x'), FORCE_BREAK, leaf(20, 'y')],
        },
        leaf(20, 'b'),
      ];
      const pages = paginateFlow(items, 100);

      expect(pages.map((p) => p.map((k) => k.item.id))).toEqual([
        ['a', 'x'],
        ['y', 'b'],
      ]);

      snapshotPages(pages, region(100), 'lazy-force-break');
    });

    test('lazy materializing a FORBID_BREAK group that overflows re-materializes whole', () => {
      const items: Item[] = [
        leaf(60, 'a'),
        {
          kind: 'lazy',
          materialize: (ctx) => [
            leaf(20, `x${ctx.pageNumber}`),
            FORBID_BREAK,
            leaf(30, `y${ctx.pageNumber}`),
          ],
        },
      ];
      const pages = paginateFlow(items, 100);

      // x fits after a, but the forbid binds it to y (30) which doesn't —
      // so the pair travels together, nothing commits, and the lazy runs
      // again on page 2 (ids read x2/y2).
      expect(pages.map((p) => p.map((k) => k.item.id))).toEqual([
        ['a'],
        ['x2', 'y2'],
      ]);
      snapshotPages(pages, region(100), 'lazy-forbid-group-overflows');
    });

    test('nested lazy materializing a penalty-bound container that splits', () => {
      const items: Item[] = [
        column(
          [
            spacer(5, 'padT'),
            leaf(20, 'a'),
            {
              kind: 'lazy',
              materialize: (ctx) => [
                column(
                  [
                    leaf(20, `x${ctx.pageNumber}`),
                    FORBID_BREAK,
                    leaf(20, `y${ctx.pageNumber}`),
                  ],
                  'M',
                ),
              ],
            },
            leaf(20, 'b'),
            spacer(5, 'padB'),
          ],
          'C',
        ),
      ];
      const pages = paginateFlow(items, 60);

      // Page 1 keeps padT + a; M's forbid-bound pair (40) doesn't fit in the
      // 35 left, so the lazy rolls whole and re-runs on page 2 (x2/y2). That
      // fills page 2 exactly, stranding C's bottom edge spacer on page 3.
      expect(pages).toHaveLength(3);
      expect(pages.map((p) => p[0].children?.map((k) => k.item.id))).toEqual([
        ['padT', 'a'],
        ['M', 'b'],
        ['padB'],
      ]);
      snapshotPages(pages, region(60), 'lazy-nested-penalty-split');
    });
  });

  describe('row containers', () => {
    test('row content height is max(children), not sum', () => {
      const items: Item[] = [
        row([leaf(30, 'a'), leaf(50, 'b'), leaf(20, 'c')], 'R'),
        leaf(10, 'after'),
      ];
      const pages = paginateFlow(items, 100);

      expect(pages).toHaveLength(1);
      expect(pages[0]).toHaveLength(2);
      expect(pages[0][0].item.id).toBe('R');
      expect(pages[0][1].item.id).toBe('after');
      // Row occupies max(30, 50, 20) = 50 of vertical space,
      // so the next sibling lands at y=50.
      expect(pages[0][1].y).toBe(50);

      snapshotPages(pages, region(100), 'row-content-height');
    });

    test('fits whole — children share y=0 within the row', () => {
      const items: Item[] = [
        row([leaf(30, 'a'), leaf(50, 'b'), leaf(20, 'c')], 'R'),
      ];
      const pages = paginateFlow(items, 100);

      expect(pages).toHaveLength(1);
      expect(pages[0]).toHaveLength(1);
      expect(pages[0][0].item.id).toBe('R');
      expect(pages[0][0].y).toBe(0);
      expect(pages[0][0].part).toEqual({ isFirst: true, isLast: true });
      expect(pages[0][0].children?.map((c) => c.item.id)).toEqual([
        'a',
        'b',
        'c',
      ]);
      expect(pages[0][0].children?.map((c) => c.y)).toEqual([0, 0, 0]);
      expect(pages[0][0].children?.map((c) => c.part)).toEqual([
        { isFirst: true, isLast: true },
        { isFirst: true, isLast: true },
        { isFirst: true, isLast: true },
      ]);

      snapshotPages(pages, region(100), 'row-whole');
    });

    test('fits whole with column child — column still stacks internally', () => {
      const items: Item[] = [
        row(
          [
            leaf(30, 'a'),
            column([leaf(10, 'c1'), leaf(10, 'c2'), leaf(10, 'c3')], 'COL'),
          ],
          'R',
        ),
      ];
      const pages = paginateFlow(items, 100);

      expect(pages).toHaveLength(1);
      const placedRow = pages[0][0];
      expect(placedRow.children).toHaveLength(2);
      expect(placedRow.children?.[0].item.id).toBe('a');
      expect(placedRow.children?.[0].y).toBe(0);
      expect(placedRow.children?.[1].item.id).toBe('COL');
      expect(placedRow.children?.[1].y).toBe(0);
      expect(placedRow.children?.[1].children?.map((c) => c.y)).toEqual([
        0, 10, 20,
      ]);

      snapshotPages(pages, region(100), 'row-whole-with-column-child');
    });

    test('row pushes to next page when it does not fit after a prior sibling', () => {
      const items: Item[] = [
        leaf(80, 'before'),
        row([leaf(30, 'a'), leaf(50, 'b')], 'R'),
      ];
      const pages = paginateFlow(items, 100);

      expect(pages).toHaveLength(2);
      expect(pages[0].map((p) => p.item.id)).toEqual(['before']);
      expect(pages[1].map((p) => p.item.id)).toEqual(['R']);
      expect(pages[1][0].y).toBe(0);
      expect(pages[1][0].part).toEqual({ isFirst: true, isLast: true });
      expect(pages[1][0].children?.map((c) => c.y)).toEqual([0, 0]);

      snapshotPages(pages, region(100), 'row-pushes-to-next-page');
    });

    test('row larger than region warns once and lands alone on its own page', () => {
      const warn = silenceWarnings();

      const items: Item[] = [
        leaf(10, 'before'),
        row([leaf(200, 'a'), leaf(300, 'b')], 'R'),
        leaf(10, 'after'),
      ];
      const pages = paginateFlow(items, 50);

      expect(warn).toHaveBeenCalledOnce();
      expect(pages.map((p) => p.map((x) => x.item.id))).toEqual([
        ['before'],
        ['R'],
        ['after'],
      ]);

      snapshotPages(pages, region(50), 'row-oversized-own-page');
    });

    test('row splits when every child can slice at the available height', () => {
      const items: Item[] = [
        leaf(80, 'before'),
        row([splittable(80, 'L'), splittable(60, 'R')], 'R'),
      ];
      const pages = paginateFlow(items, 100);

      expect(pages).toHaveLength(2);

      const page1Row = pages[0][1];
      expect(page1Row.item.id).toBe('R');
      expect(page1Row.y).toBe(80);
      expect(page1Row.part).toEqual({ isFirst: true, isLast: false });
      expect(page1Row.children?.map((c) => c.item.id)).toEqual(['L/1', 'R/1']);
      expect(page1Row.children?.map((c) => c.y)).toEqual([0, 0]);
      expect(page1Row.children?.map((c) => c.part)).toEqual([
        { isFirst: true, isLast: false },
        { isFirst: true, isLast: false },
      ]);

      const page2Row = pages[1][0];
      expect(page2Row.item.id).toBe('R');
      expect(page2Row.part).toEqual({ isFirst: false, isLast: true });
      expect(page2Row.children?.map((c) => c.item.id)).toEqual(['L/2', 'R/2']);
      expect(page2Row.children?.map((c) => c.part)).toEqual([
        { isFirst: false, isLast: true },
        { isFirst: false, isLast: true },
      ]);

      snapshotPages(pages, region(100), 'row-split');
    });

    test('row slices: splittable + short atomic — atomic drops from continuation', () => {
      const items: Item[] = [
        leaf(80, 'before'),
        row([leaf(15, 'shortAtomic'), splittable(80, 'L')], 'R'),
      ];
      const pages = paginateFlow(items, 100);

      expect(pages).toHaveLength(2);

      const page1Row = pages[0][1];
      expect(page1Row.item.id).toBe('R');
      expect(page1Row.part).toEqual({ isFirst: true, isLast: false });
      expect(page1Row.children?.map((c) => c.item.id)).toEqual([
        'shortAtomic',
        'L/1',
      ]);

      const page2Row = pages[1][0];
      expect(page2Row.item.id).toBe('R');
      expect(page2Row.part).toEqual({ isFirst: false, isLast: true });
      expect(page2Row.children?.map((c) => c.item.id)).toEqual(['L/2']);

      snapshotPages(pages, region(100), 'row-split-mixed-atomic-short');
    });

    test('row with tall atomic child cannot slice — pushes whole to next page', () => {
      const items: Item[] = [
        leaf(80, 'before'),
        row([leaf(40, 'tallAtomic'), splittable(80, 'L')], 'R'),
      ];
      const pages = paginateFlow(items, 100);

      expect(pages).toHaveLength(2);
      expect(pages[0].map((p) => p.item.id)).toEqual(['before']);
      expect(pages[1].map((p) => p.item.id)).toEqual(['R']);
      expect(pages[1][0].children?.map((c) => c.item.id)).toEqual([
        'tallAtomic',
        'L',
      ]);

      snapshotPages(pages, region(100), 'row-tall-atomic-pushes');
    });

    test('column child of row slices via recursive fill', () => {
      const items: Item[] = [
        leaf(80, 'before'),
        row(
          [
            column([leaf(10, 'c1'), leaf(10, 'c2'), leaf(10, 'c3')], 'COL'),
            splittable(40, 'L'),
          ],
          'R',
        ),
      ];
      const pages = paginateFlow(items, 100);

      expect(pages).toHaveLength(2);

      const page1Row = pages[0][1];
      expect(page1Row.item.id).toBe('R');
      expect(page1Row.part).toEqual({ isFirst: true, isLast: false });
      expect(page1Row.children?.map((c) => c.item.id)).toEqual(['COL', 'L/1']);

      const colOnPage1 = page1Row.children?.[0];
      expect(colOnPage1?.part).toEqual({ isFirst: true, isLast: false });
      expect(colOnPage1?.children?.map((c) => c.item.id)).toEqual(['c1', 'c2']);

      const page2Row = pages[1][0];
      expect(page2Row.item.id).toBe('R');
      expect(page2Row.children?.map((c) => c.item.id)).toEqual(['COL', 'L/2']);

      const colOnPage2 = page2Row.children?.[0];
      expect(colOnPage2?.part).toEqual({ isFirst: false, isLast: true });
      expect(colOnPage2?.children?.map((c) => c.item.id)).toEqual(['c3']);

      snapshotPages(pages, region(100), 'row-with-column-child-split');
    });
  });

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

    test('a repeat child of a column inside a row re-emits on the row continuation', () => {
      const items: Item[] = [
        row([
          column(
            [repeatLeaf(10, 'h'), leaf(30, 'a'), leaf(30, 'b'), leaf(30, 'c')],
            'cell',
          ),
        ]),
      ];
      const pages = paginateFlow(items, 50);

      const cell = (i: number) =>
        pages[i][0].children?.[0].children?.map((c) => c.item.id);

      expect(pages).toHaveLength(3);
      expect(cell(0)).toEqual(['h', 'a']);
      expect(cell(1)).toEqual(['h', 'b']);
      expect(cell(2)).toEqual(['h', 'c']);

      snapshotPages(
        paginate(column(items), 50),
        region(50),
        'repeat-row-nested',
      );
    });

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

      snapshotPages(
        paginate(column(items), 50),
        region(50),
        'repeat-placed-once',
      );
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

      snapshotPages(
        paginate(column(items), 100),
        region(100),
        'repeat-force-break',
      );
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

      snapshotPages(
        paginate(column(items), 50),
        region(50),
        'repeat-nested-lifetime',
      );
    });

    test('repeats stop when a page places nothing but repeats', () => {
      const items: Item[] = [repeatLeaf(45, 'h'), leaf(30, 'a'), leaf(30, 'b')];
      const pages = paginateFlow(items, 50);

      expect(pages.map((p) => p.map((c) => c.item.id))).toEqual([
        ['h'],
        ['a'],
        ['b'],
      ]);

      snapshotPages(
        paginate(column(items), 50),
        region(50),
        'repeat-progress-guard',
      );
    });

    test('a repeat alone in a page-bottom sliver still repeats', () => {
      const table = column(
        [repeatLeaf(10, 'h'), leaf(30, 'a'), leaf(30, 'b')],
        'table',
      );
      const items: Item[] = [leaf(85, 'body'), table];
      const pages = paginateFlow(items, 100);

      expect(pages.map((p) => p.map((c) => c.item.id))).toEqual([
        ['body', 'table'],
        ['table'],
      ]);
      expect(pages[0][1].children?.map((c) => c.item.id)).toEqual(['h']);
      expect(pages[1][0].children?.map((c) => c.item.id)).toEqual([
        'h',
        'a',
        'b',
      ]);

      snapshotPages(paginate(column(items), 100), region(100), 'repeat-sliver');
    });

    // The sliver above comes from finite content, so repeating converges. When
    // the sliver comes from repeats, the same layout would recur every page —
    // the progress guard must still fire.
    test('a repeat squeezed only by other repeats stops instead of looping', () => {
      const table = column([repeatLeaf(20, 'h'), leaf(70, 'row')], 'table');
      const items: Item[] = [repeatLeaf(20, 'banner'), table];
      const pages = paginateFlow(items, 100);

      expect(pages.map((p) => p.map((c) => c.item.id))).toEqual([
        ['banner', 'table'],
        ['banner', 'table'],
      ]);
      expect(pages[0][1].children?.map((c) => c.item.id)).toEqual(['h']);
      expect(pages[1][1].children?.map((c) => c.item.id)).toEqual(['row']);

      snapshotPages(
        paginate(column(items), 100),
        region(100),
        'repeat-wedge-guard',
      );
    });

    // Same wedge, but the repeat above is a lazy: its materialized placements
    // lose the repeat flag and must be matched through their origin fragments.
    test('a repeat squeezed only by a repeating lazy stops instead of looping', () => {
      const banner: Item = {
        kind: 'lazy',
        id: 'banner',
        repeat: true,
        materialize: () => [leaf(20, 'banner-content')],
      };
      const table = column([repeatLeaf(20, 'h'), leaf(70, 'row')], 'table');
      const pages = paginateFlow([banner, table], 100);

      expect(pages.map((p) => p.map((c) => c.item.id))).toEqual([
        ['banner-content', 'table'],
        ['banner-content', 'table'],
      ]);
      expect(pages[1][1].children?.map((c) => c.item.id)).toEqual(['row']);

      snapshotPages(
        paginate(column([banner, table]), 100),
        region(100),
        'repeat-lazy-wedge-guard',
      );
    });

    test('an oversized repeat force-places once and does not wedge', () => {
      silenceWarnings();

      const items: Item[] = [repeatLeaf(60, 'h'), leaf(30, 'a')];
      const pages = paginateFlow(items, 50);

      expect(pages.map((p) => p.map((c) => c.item.id))).toEqual([['h'], ['a']]);

      snapshotPages(
        paginate(column(items), 50),
        region(50),
        'repeat-oversized',
      );
    });

    test('a splitting repeat item continues its remainder without a fresh copy', () => {
      const items: Item[] = [
        { ...splittable(80, 'h'), repeat: true },
        leaf(15, 'a'),
      ];
      const pages = paginateFlow(items, 50);

      expect(pages.map((p) => p.map((c) => c.item.id))).toEqual([
        ['h/1'],
        ['h/2', 'a'],
      ]);

      snapshotPages(
        paginate(column(items), 50),
        region(50),
        'repeat-mid-split',
      );
    });

    test('a repeat lazy re-materializes with the page it lands on', () => {
      const header: LazyItem = {
        kind: 'lazy',
        repeat: true,
        materialize: (ctx) => [leaf(10, `h${ctx.pageNumber}`)],
      };
      const items: Item[] = [
        header,
        leaf(30, 'a'),
        leaf(30, 'b'),
        leaf(30, 'c'),
      ];
      const pages = paginateFlow(items, 50);

      expect(pages.map((p) => p.map((c) => c.item.id))).toEqual([
        ['h1', 'a'],
        ['h2', 'b'],
        ['h3', 'c'],
      ]);

      snapshotPages(paginate(column(items), 50), region(50), 'repeat-lazy');
    });
  });

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

    test('each page can have its own height', () => {
      const root = column([leaf(40, 'a'), leaf(25, 'b'), leaf(45, 'c')]);
      const paginator = createPaginator(root);

      const pages = [
        paginator.next(50),
        paginator.next(30),
        paginator.next(50),
      ];

      expect(paginator.done).toBe(true);
      expect(pages.map((p) => p[0]?.children?.map((c) => c.item.id))).toEqual([
        ['a'],
        ['b'],
        ['c'],
      ]);
      snapshotPages(
        pages,
        [region(50), region(30), region(50)],
        'paginator-heights',
      );
    });

    test('done flips after the last page and next() then throws', () => {
      const paginator = createPaginator(column([leaf(10, 'a')]));

      expect(paginator.done).toBe(false);
      paginator.next(50);
      expect(paginator.done).toBe(true);
      expect(() => paginator.next(50)).toThrow('after done');
    });

    test('repeat items re-emit across next() calls', () => {
      const root = column([
        repeatLeaf(10, 'h'),
        leaf(30, 'a'),
        leaf(30, 'b'),
        leaf(30, 'c'),
      ]);
      const paginator = createPaginator(root);
      const pages: ReturnType<typeof paginate> = [];

      while (!paginator.done) pages.push(paginator.next(50));

      expect(pages.map((p) => p[0]?.children?.map((c) => c.item.id))).toEqual([
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
  });

  describe('kitchen sink', () => {
    test('mixed flow covering every supported scenario snapshot', () => {
      const items: Item[] = [
        // Page 1: title + lazy header, then a padded intro container.
        leaf(15, 'title'),
        {
          kind: 'lazy',
          materialize: (ctx) => [leaf(8, `header-${ctx.pageNumber}`)],
        },
        column(
          [
            spacer(6, 'i-padT'),
            leaf(10, 'intro-1'),
            leaf(10, 'intro-2'),
            spacer(6, 'i-padB'),
          ],
          'intro',
        ),

        // Forced page break — page 2 begins.
        FORCE_BREAK,

        // Heading + first paragraph kept together by FORBID_BREAK.
        leaf(15, 'section-h'),
        FORBID_BREAK,
        leaf(20, 'section-body'),

        // Splittable leaf that spans multiple pages.
        splittable(120, 'long-text'),

        // Nested containers with edge spacers, thin inner ones.
        column(
          [
            spacer(6, 'o-padT'),
            leaf(10, 'outer-lead'),
            column(
              [
                spacer(1, 'in-padT'),
                leaf(10, 'inner-1'),
                leaf(10, 'inner-2'),
                spacer(1, 'in-padB'),
              ],
              'inner',
            ),
            spacer(6, 'o-padB'),
          ],
          'outer',
        ),

        // Trailing leaves to exercise bestBreak rewind if they don't fit.
        leaf(20, 'tail-a'),
        leaf(20, 'tail-b'),

        // Final lazy — its pageNumber should match the last page.
        {
          kind: 'lazy',
          materialize: (ctx) => [leaf(8, `footer-${ctx.pageNumber}`)],
        },
      ];

      const pages = paginateFlow(items, 100);

      expect(pages.length).toBeGreaterThanOrEqual(4);

      snapshotPages(pages, region(100), 'kitchen-sink');
    });
  });
});
