import { describe, expect, test } from 'vitest';
import FontStore from '@react-pdf/font';

import { loadYoga } from '../../src/yoga';
import resolveDimensions from '../../src/steps/resolveDimensions';
import resolvePageTemplates from '../../src/steps/resolvePageTemplates';
import resolvePagination from '../../src/paginate';
import { instantiateTemplate, isContent } from '../../src/page/template';
import { SafeNode, SafePageNode } from '../../src/types';

const fontStore = new FontStore();

// Instance-shaped nodes throughout: the reconciler host config wraps user
// layouts and render props, so layout only ever sees instances.
const view = (style = {}, children: any[] = []): any => ({
  type: 'VIEW',
  style,
  props: {},
  children,
});

const dynamicView = (render: any, style = {}): any => ({
  type: 'VIEW',
  style,
  props: { render },
  children: [],
});

const instance = view;

// The region container templates wrap `children` in whenever geometry
// matters — asides, or chrome that must stay below the content.
const region = (children: any[]): any =>
  view({ flexGrow: 1, flexShrink: 1 }, children);

const doc = async (pageStyle: any, children: any[], pageProps = {}) => ({
  type: 'DOCUMENT',
  yoga: await loadYoga(),
  props: {},
  children: [{ type: 'PAGE', props: pageProps, style: pageStyle, children }],
});

const run = async (pageStyle: any, children: any[], pageProps = {}) => {
  const spliced = resolvePageTemplates(
    await doc(pageStyle, children, pageProps),
  );
  const laid = resolveDimensions(spliced as any, fontStore);

  return resolvePagination(laid, fontStore).children as SafePageNode[];
};

const walk = (node: SafeNode, offset = 0, offsetLeft = 0, out: any[] = []) => {
  const top = offset + (node.box?.top || 0);
  const left = offsetLeft + (node.box?.left || 0);

  out.push({
    type: node.type,
    top,
    left,
    height: node.box?.height || 0,
    width: node.box?.width || 0,
  });

  ((node.children || []) as SafeNode[]).forEach((child) =>
    walk(child, top, left, out),
  );

  return out;
};

const boxes = (page: SafePageNode) =>
  ((page.children || []) as SafeNode[]).flatMap((child) => walk(child));

const findTagged = (node: SafeNode): SafeNode | null => {
  if (isContent(node)) return node;

  for (const child of (node.children || []) as SafeNode[]) {
    const found = findTagged(child);
    if (found) return found;
  }

  return null;
};

describe('template', () => {
  test('the payload lands where the layout renders children, untouched', () => {
    const layout = (_: any, children: any[]) =>
      view({ flexDirection: 'row' }, children);

    const payload = [instance({ height: 10 })];
    const nodes = instantiateTemplate(layout, { pageNumber: 1 }, payload);

    expect((nodes[0] as any).children[0]).toBe(payload[0]);
  });

  test('the layout receives its page props', () => {
    const seen: any[] = [];
    const layout = (props: any, children: any[]) => {
      seen.push(props);
      return view({}, children);
    };

    instantiateTemplate(layout, { pageNumber: 3, totalPages: 7 }, []);

    expect(seen).toEqual([{ pageNumber: 3, totalPages: 7 }]);
  });

  test('throws when the layout renders children twice or never', async () => {
    const twice = (_: any, children: any[]) =>
      view({}, [...children, ...children]);
    const never = () => view({}, []);

    const style = { width: 100, height: 100 };
    const badTwice = await doc(style, [], { layout: twice });
    const badNever = await doc(style, [], { layout: never });

    expect(() => resolvePageTemplates(badTwice)).toThrow(/exactly once/);
    expect(() => resolvePageTemplates(badNever)).toThrow(/exactly once/);
  });
});

describe('resolvePageTemplates', () => {
  test('a plain page splices to itself, styles intact', async () => {
    const content = [instance({ height: 10 })];
    const root = resolvePageTemplates(
      await doc({ width: 100, height: 100 }, content),
    );

    const children = root.children[0].children;

    expect(children).toHaveLength(1);
    expect(children[0].style).toEqual({ height: 10 });
    expect(isContent(children[0])).toBe(true);
  });

  test('first pass measures content at the region width', async () => {
    const aside = (_: any, children: any[]) =>
      view({ flexDirection: 'row', flexGrow: 1 }, [
        view({ width: 40 }),
        region(children),
      ]);

    const content = [instance({ height: 10 })];
    const laid = resolveDimensions(
      resolvePageTemplates(
        await doc({ width: 100, height: 100 }, content, { layout: aside }),
      ) as any,
      fontStore,
    );

    const tagged = findTagged(laid.children[0] as unknown as SafeNode)!;

    expect(tagged.box?.width).toBe(60);
  });
});

describe('template pages', () => {
  test('band template reserves header and footer space on every page', async () => {
    const band = (_: any, children: any[]) => [
      view({ height: 20 }),
      region(children),
      view({ height: 10 }),
    ];

    const pages = await run(
      { width: 100, height: 100 },
      [instance({ height: 60 }), instance({ height: 60 })],
      { layout: band },
    );

    expect(pages).toHaveLength(2);

    expect(boxes(pages[0]).map((b) => [b.top, b.height])).toEqual([
      [0, 20], // header
      [20, 70], // the template's own region container
      [20, 60], // first block
      [80, 10], // split head of the second block
      [90, 10], // footer
    ]);

    expect(boxes(pages[1]).map((b) => [b.top, b.height])).toEqual([
      [0, 20], // header again
      [20, 70],
      [20, 50], // remainder of the split block
      [90, 10], // footer again, pinned by the growing region
    ]);
  });

  test('chrome render props resolve with each page number', async () => {
    const numbered = (_: any, children: any[]) => [
      ...children,
      view({ height: 10 }, [
        dynamicView(({ pageNumber }: any) => [
          view({ height: 5, width: pageNumber * 10 }),
        ]),
      ]),
    ];

    const pages = await run(
      { width: 100, height: 100 },
      [
        instance({ height: 60 }),
        instance({ height: 60 }),
        instance({ height: 60 }),
      ],
      { layout: numbered },
    );

    expect(pages).toHaveLength(2);

    const footerWidths = (page: SafePageNode) =>
      boxes(page)
        .filter((b) => b.height === 5)
        .map((b) => b.width);

    expect(footerWidths(pages[0])).toContain(10);
    expect(footerWidths(pages[1])).toContain(20);
  });

  test('first-page variant chrome shrinks only page 1 flow', async () => {
    const cover = ({ pageNumber }: any, children: any[]) => [
      view({ height: pageNumber === 1 ? 40 : 10 }),
      ...children,
    ];

    const pages = await run(
      { width: 100, height: 100 },
      [instance({ height: 60 }), instance({ height: 60 })],
      { layout: cover },
    );

    expect(pages).toHaveLength(2);
    expect(boxes(pages[0]).map((b) => [b.top, b.height])).toEqual([
      [0, 40], // tall cover header
      [40, 60], // first block fits exactly
    ]);
    expect(boxes(pages[1]).map((b) => [b.top, b.height])).toEqual([
      [0, 10], // regular header
      [10, 60],
    ]);
  });

  test('odd/even mirrored aside keeps region width and flips position', async () => {
    const mirrored = ({ pageNumber }: any, children: any[]) =>
      view(
        { flexDirection: 'row', flexGrow: 1 },
        pageNumber % 2
          ? [view({ width: 40 }), region(children)]
          : [region(children), view({ width: 40 })],
      );

    const pages = await run(
      { width: 100, height: 100 },
      [instance({ height: 60 }), instance({ height: 60 })],
      { layout: mirrored },
    );

    expect(pages).toHaveLength(2);

    const regionOf = (page: SafePageNode) =>
      boxes(page).find((b) => b.width === 60 && b.height === 100);

    expect(regionOf(pages[0])?.left).toBe(40); // aside on the left
    expect(regionOf(pages[1])?.left).toBe(0); // aside flipped right
  });

  test('width-changing chrome fails loudly with the page number', async () => {
    const drifting = ({ pageNumber }: any, children: any[]) =>
      view({ flexDirection: 'row', flexGrow: 1 }, [
        view({ width: pageNumber * 10 }),
        region(children),
      ]);

    await expect(
      run(
        { width: 100, height: 100 },
        [instance({ height: 60 }), instance({ height: 60 })],
        { layout: drifting },
      ),
    ).rejects.toThrow(/content width on page 2/);
  });

  test('wrap={false} template page has no ceiling', async () => {
    const band = (_: any, children: any[]) => [
      view({ height: 20 }),
      ...children,
    ];

    const pages = await run(
      { width: 100, height: 100 },
      [instance({ height: 300 })],
      { layout: band, wrap: false },
    );

    expect(pages).toHaveLength(1);
  });

  test('layout receives totalPages in the totals round', async () => {
    const counted = ({ totalPages }: any, children: any[]) => [
      ...children,
      view({ height: 5, width: (totalPages ?? 1) * 10 }),
    ];

    const pages = await run(
      { width: 100, height: 100 },
      [instance({ height: 90 }), instance({ height: 90 })],
      { layout: counted },
    );

    expect(pages).toHaveLength(2);

    const heights5 = (page: SafePageNode) =>
      boxes(page)
        .filter((b) => b.height === 5)
        .map((b) => b.width);

    expect(heights5(pages[0])).toContain(20); // totalPages = 2
    expect(heights5(pages[0])).not.toContain(10); // round-1 chrome replaced
    expect(heights5(pages[1])).toContain(20);
  });
});

describe('in-flow fixed', () => {
  test('a fixed header repeats at the top of every page through the stream', async () => {
    const pages = await run({ width: 100, height: 100 }, [
      { ...instance({ height: 20 }), props: { fixed: true } },
      instance({ height: 60 }),
      instance({ height: 60 }),
    ]);

    expect(pages).toHaveLength(2);
    expect(boxes(pages[0]).map((b) => [b.top, b.height])).toEqual([
      [0, 20], // fixed header
      [20, 60],
      [80, 20], // split head of the second block
    ]);
    expect(boxes(pages[1]).map((b) => [b.top, b.height])).toEqual([
      [0, 20], // fresh copy of the header
      [20, 40], // remainder of the split block
    ]);
  });
});
