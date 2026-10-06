import { describe, expect, test, vi } from 'vitest';
import FontStore from '@react-pdf/font';

import { loadYoga } from '../../src/yoga';
import resolveDimensions from '../../src/steps/resolveDimensions';
import resolvePageTemplates from '../../src/steps/resolvePageTemplates';
import resolvePagination from '../../src/paginate';
import { SafeDocumentNode, SafeNode, SafePageNode } from '../../src/types';

const fontStore = new FontStore();

// Instances, as the pre-wrapped render props return them
const el = (type: string, style = {}, children: any[] = []) => ({
  type,
  style,
  props: {},
  children,
});

const view = (style, children = []): any => ({
  type: 'VIEW',
  props: {},
  style,
  children,
});

const fixedView = (style, children = []): any => ({
  type: 'VIEW',
  props: { fixed: true },
  style,
  children,
});

const text = (value: string, style = {}): any => ({
  type: 'TEXT',
  props: {},
  style,
  children: [{ type: 'TEXT_INSTANCE', value }],
});

const dynamicView = (render, style = {}): any => ({
  type: 'VIEW',
  props: { render },
  style,
  children: [],
});

const doc = async (
  pageStyle,
  children,
  pageProps = {},
): Promise<SafeDocumentNode> => ({
  type: 'DOCUMENT',
  yoga: await loadYoga(),
  props: {},
  children: [{ type: 'PAGE', props: pageProps, style: pageStyle, children }],
});

const run = async (pageStyle, children, pageProps = {}) => {
  const layout = resolvePagination(
    resolveDimensions(
      resolvePageTemplates(await doc(pageStyle, children, pageProps)) as any,
      fontStore,
    ),
    fontStore,
  );

  return layout.children as SafePageNode[];
};

// Absolute top of every node, so overflow is checked against the real page
const walk = (node: SafeNode, offset = 0, out: any[] = []) => {
  const top = offset + (node.box?.top || 0);

  out.push({ type: node.type, top, height: node.box?.height || 0 });

  ((node.children || []) as SafeNode[]).forEach((child) =>
    walk(child, top, out),
  );

  return out;
};

const boxes = (page: SafePageNode) =>
  ((page.children || []) as SafeNode[]).flatMap((child) => walk(child));

const tops = (page: SafePageNode) =>
  ((page.children || []) as SafeNode[]).map((child) => [
    child.box?.top,
    child.box?.height,
  ]);

describe('paginate', () => {
  test('stacks blocks and wraps onto a second page', async () => {
    const pages = await run({ width: 100, height: 100 }, [
      view({ height: 40 }),
      view({ height: 40 }),
      view({ height: 40 }),
    ]);

    expect(pages).toHaveLength(2);
    expect(boxes(pages[0]).map((b) => [b.top, b.height])).toEqual([
      [0, 40],
      [40, 40],
      [80, 20],
    ]);
    expect(boxes(pages[1]).map((b) => [b.top, b.height])).toEqual([[0, 20]]);
  });

  test('keeps page padding out of the flow', async () => {
    const pages = await run(
      { width: 100, height: 100, paddingTop: 10, paddingBottom: 10 },
      [view({ height: 40 }), view({ height: 40 }), view({ height: 40 })],
    );

    expect(pages).toHaveLength(2);
    expect(boxes(pages[0]).map((b) => b.top)).toEqual([10, 50]);
    expect(boxes(pages[1]).map((b) => b.top)).toEqual([10]);
  });

  test('margins and gaps survive the round trip', async () => {
    const pages = await run({ width: 100, height: 200, rowGap: 5 }, [
      view({ height: 20, marginTop: 10 }),
      view({ height: 20, marginBottom: 15 }),
      view({ height: 20 }),
    ]);

    expect(pages).toHaveLength(1);
    expect(boxes(pages[0]).map((b) => b.top)).toEqual([10, 35, 75]);
  });

  test('splits a container and zeroes the inner edges', async () => {
    const pages = await run({ width: 100, height: 100 }, [
      view(
        {
          paddingTop: 10,
          paddingBottom: 10,
          borderTopWidth: 2,
          borderBottomWidth: 2,
        },
        [view({ height: 40 }), view({ height: 55 })],
      ),
    ]);

    // 12 + 95 + 12 = 119; the second child itself crosses the page edge
    expect(pages).toHaveLength(2);

    const [outer, inner] = boxes(pages[0]);
    expect(outer.top).toBe(0);
    expect(inner.top).toBe(12);
    expect(outer.top + outer.height).toBeLessThanOrEqual(100);
    expect(pages[0].children![0].style.borderBottomWidth).toBe(0);

    const [nextOuter, nextInner] = boxes(pages[1]);
    expect(nextOuter.top).toBe(0);
    expect(nextInner.top).toBe(0);
    expect(pages[1].children![0].style.borderTopWidth).toBe(0);
  });

  test('overflowing bottom edge distributes across the break', async () => {
    const pages = await run({ width: 100, height: 100 }, [
      view(
        {
          paddingTop: 10,
          paddingBottom: 10,
          borderTopWidth: 2,
          borderBottomWidth: 2,
        },
        [view({ height: 40 }), view({ height: 40 })],
      ),
    ]);

    // 12 + 80 + 12 = 104: children fit, only the bottom edge crosses, so the
    // container stretches to the page edge and its bottom edge moves whole to
    // page 2 — like legacy, whose relayout re-derives edges from the styles.
    expect(pages).toHaveLength(2);

    const first = boxes(pages[0]);
    expect(first.map((b) => [b.top, b.height])).toEqual([
      [0, 100],
      [12, 40],
      [52, 40],
    ]);

    const stub = boxes(pages[1]);
    expect(stub).toHaveLength(1);
    expect(stub[0].top).toBe(0);
    expect(stub[0].height).toBe(12);
  });

  test('splits text across pages', async () => {
    const pages = await run({ width: 200, height: 60 }, [
      text(
        'lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud',
      ),
    ]);

    expect(pages.length).toBeGreaterThan(1);
    pages.forEach((page) => {
      boxes(page).forEach((box) => {
        expect(box.top + box.height).toBeLessThanOrEqual(60.001);
      });
    });
  });

  test('nothing overflows the content area', async () => {
    const pages = await run(
      { width: 100, height: 100, paddingTop: 8, paddingBottom: 8 },
      [
        view({ paddingTop: 4, paddingBottom: 4, marginBottom: 6 }, [
          view({ height: 30 }),
          view({ height: 30 }),
        ]),
        view({ height: 25 }),
        view({ height: 25 }),
      ],
    );

    pages.forEach((page) => {
      boxes(page).forEach((box) => {
        expect(box.top).toBeGreaterThanOrEqual(8 - 0.001);
        expect(box.top + box.height).toBeLessThanOrEqual(92.001);
      });
    });
  });

  test('break forces a new page', async () => {
    const pages = await run({ width: 100, height: 200 }, [
      view({ height: 20 }),
      { ...view({ height: 20 }), props: { break: true } },
    ]);

    expect(pages).toHaveLength(2);
    expect(boxes(pages[1]).map((b) => b.top)).toEqual([0]);
  });

  test('row children keep their cross-axis offsets', async () => {
    const pages = await run({ width: 100, height: 200 }, [
      view({ flexDirection: 'row', alignItems: 'center', height: 50 }, [
        view({ height: 20, width: 20 }),
        view({ height: 40, width: 20 }),
      ]),
    ]);

    expect(pages).toHaveLength(1);
    expect(boxes(pages[0]).map((b) => b.top)).toEqual([0, 15, 5]);
  });

  describe('dynamic nodes', () => {
    test('render output flows with real sizes and displaces siblings', async () => {
      const pages = await run({ width: 100, height: 200 }, [
        view({ height: 30 }),
        dynamicView(() => [
          el('VIEW', { height: 25 }),
          el('VIEW', { height: 25 }),
        ]),
        view({ height: 30 }),
      ]);

      expect(pages).toHaveLength(1);
      const children = pages[0].children as SafeNode[];
      expect(children).toHaveLength(3);
      expect(children[1].children).toHaveLength(2);
      // dynamic content is 50 tall, so the trailing view sits below it
      expect(tops(pages[0])).toEqual([
        [0, 30],
        [30, 50],
        [80, 30],
      ]);
    });

    test('render is called twice per node: pageNumber round and totals round', async () => {
      const render = vi.fn().mockReturnValue([el('VIEW', { height: 10 })]);

      await run({ width: 100, height: 200 }, [dynamicView(render)]);

      expect(render).toHaveBeenCalledTimes(2);
      expect(render.mock.calls[0][0]).toEqual({
        pageNumber: 1,
        subPageNumber: 1,
      });
      expect(render.mock.calls[1][0]).toEqual({
        pageNumber: 1,
        totalPages: 1,
        subPageNumber: 1,
        subPageTotalPages: 1,
      });
    });

    test('dynamic content splits at the boundary like static content', async () => {
      const seen: number[] = [];
      const pages = await run({ width: 100, height: 100 }, [
        view({ height: 90 }),
        dynamicView((props) => {
          seen.push(props.pageNumber);
          return [el('VIEW', { height: 50 })];
        }),
      ]);

      expect(pages).toHaveLength(2);
      // the 50-tall view slices 10/40 across the break, so the dynamic node
      // commits on page 1 — one materialization per round
      expect(seen).toEqual([1, 1]);
      expect(tops(pages[1])).toEqual([[0, 40]]);
    });

    test('unsplittable dynamic content re-materializes where it lands', async () => {
      const seen: number[] = [];
      const pages = await run({ width: 100, height: 100 }, [
        view({ height: 90 }),
        dynamicView((props) => {
          seen.push(props.pageNumber);
          // wrap={false} content can't split, so it must move whole
          return [
            {
              type: 'VIEW',
              style: { height: 50 },
              props: { wrap: false },
              children: [],
            },
          ];
        }),
      ]);

      expect(pages).toHaveLength(2);
      // doesn't fit page 1 → restored and re-rendered on page 2, per round
      expect(seen).toEqual([1, 2, 1, 2]);
      expect(tops(pages[1])).toEqual([[0, 50]]);
    });

    test('nested render props resolve recursively', async () => {
      const inner = vi.fn().mockReturnValue([el('VIEW', { height: 10 })]);
      const pages = await run({ width: 100, height: 200 }, [
        dynamicView(() => [dynamicView(inner)]),
      ]);

      expect(inner).toHaveBeenCalledTimes(2);
      expect(pages[0].children?.[0].children?.[0].children).toHaveLength(1);
    });

    test('fixed dynamic node re-renders on every output page', async () => {
      const labels: string[] = [];
      const fixedFooter: any = {
        type: 'VIEW',
        props: {
          fixed: true,
          render: (props) => {
            labels.push(`${props.pageNumber}/${props.totalPages}`);
            return [el('VIEW', { height: 10 })];
          },
        },
        style: { position: 'absolute', bottom: 20 },
        children: [],
      };

      const pages = await run({ width: 100, height: 100 }, [
        fixedFooter,
        view({ height: 90 }),
        view({ height: 90 }),
      ]);

      expect(pages).toHaveLength(2);
      // Chrome resolves in both rounds now, like content render props:
      // round 1 with pending totals, round 2 with the real count.
      expect(labels).toEqual(['1/undefined', '2/undefined', '1/2', '2/2']);

      // bottom: 20 anchors against the real page height: top = 100 - 20 - 10
      pages.forEach((page) => {
        const footer = (page.children as SafeNode[])[0];
        expect(footer.box?.top).toBe(70);
      });
    });

    // A page that refuses to wrap is paginated like any other, with no ceiling,
    // so its render props run once per round like everyone else's.
    test('dynamic node on a wrap={false} page resolves with totals', async () => {
      const render = vi.fn().mockReturnValue([el('VIEW', { height: 10 })]);

      const pages = await run(
        { width: 100, height: 200 },
        [dynamicView(render)],
        { wrap: false },
      );

      expect(pages).toHaveLength(1);
      expect(render.mock.lastCall?.[0]).toMatchObject({
        pageNumber: 1,
        totalPages: 1,
      });
      expect(pages[0].children?.[0].children).toHaveLength(1);
    });

    test('in-flow fixed header reserves its band on every page', async () => {
      const header: any = {
        type: 'VIEW',
        props: { fixed: true },
        style: { height: 20, marginBottom: 10 },
        children: [],
      };

      const pages = await run({ width: 100, height: 100 }, [
        header,
        view({ height: 60 }),
        view({ height: 60 }),
      ]);

      expect(pages).toHaveLength(2);

      pages.forEach((page) => {
        const [fixed, content] = page.children as SafeNode[];
        expect(fixed.box?.top).toBe(0);
        // flow starts below header + its margin on both pages
        expect(content.box?.top).toBe(30);
      });
    });

    test('static documents still paginate in a single round', async () => {
      const pages = await run({ width: 100, height: 100 }, [
        view({ height: 60 }),
        view({ height: 60 }),
      ]);

      expect(pages).toHaveLength(2);
    });
  });
});

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
      [90, 10], // second view splits to fill the remaining page, like any leaf
    ]);
    expect(boxes(pages[1]).map((b) => [b.top, b.height])).toEqual([
      [0, 80], // 20 + 60
      [0, 20], // fresh copy of the header
      [20, 60], // remainder of the split second view
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
