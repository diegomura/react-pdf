import { describe, expect, test, vi } from 'vitest';
import FontStore from '@react-pdf/font';

import { loadYoga } from '../../src/yoga';
import resolveDimensions from '../../src/steps/resolveDimensions';
import resolvePageTemplates from '../../src/steps/resolvePageTemplates';
import resolvePagination from '../../src/paginate';
import {
  SLOT_PROP,
  findSlot,
  instantiateTemplate,
} from '../../src/paginate/template';
import { SafeNode, SafePageNode } from '../../src/types';

const fontStore = new FontStore();

// Element-shaped node, as layout components return them (style inside props)
const view = (style = {}, children: any[] = []): any => ({
  type: 'VIEW',
  props: { style, children },
});

const dynamicView = (render: any, style = {}): any => ({
  type: 'VIEW',
  props: { render, style, children: [] },
});

// Instance-shaped node, as the reconciler produces them (style at top level)
const instance = (style = {}, children: any[] = []): any => ({
  type: 'VIEW',
  style,
  props: {},
  children,
});

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

describe('template', () => {
  test('instantiates the layout with an empty slot', () => {
    const layout = ({ children }: any) =>
      view({ flexDirection: 'row' }, [children]);

    const nodes = instantiateTemplate(layout, { pageNumber: 1 });
    const slot = findSlot({ type: 'PAGE', children: nodes } as any);

    expect(slot).toBeTruthy();
    expect(SLOT_PROP in (slot as any).props).toBe(true);
    expect((slot as any).children ?? []).toHaveLength(0);
  });

  test('the layout receives its page props', () => {
    const seen: any[] = [];
    const layout = ({ children, ...props }: any) => {
      seen.push(props);
      return view({}, [children]);
    };

    instantiateTemplate(layout, { pageNumber: 3, totalPages: 7 });

    expect(seen).toEqual([{ pageNumber: 3, totalPages: 7 }]);
  });

  test('throws when the layout renders children twice or never', () => {
    const twice = ({ children }: any) => view({}, [children, children]);
    const never = () => view({}, []);

    expect(() => instantiateTemplate(twice, { pageNumber: 1 })).toThrow(
      /exactly once/,
    );
    expect(() => instantiateTemplate(never, { pageNumber: 1 })).toThrow(
      /exactly once/,
    );
  });
});

describe('resolvePageTemplates', () => {
  test('grafts the page content into the slot, styles intact', async () => {
    const layout = ({ children }: any) =>
      view({ flexDirection: 'row' }, [view({ width: 40 }), children]);

    const content = [instance({ height: 10 })];
    const root = resolvePageTemplates(
      await doc({ width: 100, height: 100 }, content, { layout }),
    );

    const page = root.children[0];
    const slot = findSlot(page as SafeNode)!;

    expect(slot.children).toHaveLength(1);
    expect((slot.children![0] as any).style).toEqual({ height: 10 });
  });

  test('pages without a layout pass through untouched', async () => {
    const content = [instance({ height: 10 })];
    const root = resolvePageTemplates(
      await doc({ width: 100, height: 100 }, content),
    );

    expect(root.children[0].children).toBe(content);
  });

  test('first pass measures content at slot width', async () => {
    const layout = ({ children }: any) =>
      view({ flexDirection: 'row', flexGrow: 1 }, [
        view({ width: 40 }),
        children,
      ]);

    const content = [instance({ height: 10 })];
    const laid = resolveDimensions(
      resolvePageTemplates(
        await doc({ width: 100, height: 100 }, content, { layout }),
      ) as any,
      fontStore,
    );

    const slot = findSlot(laid.children[0] as unknown as SafeNode)!;

    expect(slot.box?.width).toBe(60);
    expect((slot.children![0] as SafeNode).box?.width).toBe(60);
  });
});

describe('template pages', () => {
  test('band template reserves header and footer space on every page', async () => {
    const band = ({ children }: any) => [
      view({ height: 20 }),
      children,
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
      [20, 70], // slot: 100 − 20 − 10
      [20, 60], // first block
      [80, 10], // split head of the second block fills the region
      [90, 10], // footer
    ]);

    expect(boxes(pages[1]).map((b) => [b.top, b.height])).toEqual([
      [0, 20], // header again
      [20, 70],
      [20, 50], // remainder of the split block
      [90, 10], // footer again
    ]);
  });

  test('chrome render props resolve with each page number', async () => {
    const numbered = ({ children }: any) => [
      children,
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
    const cover = ({ children, pageNumber }: any) => [
      view({ height: pageNumber === 1 ? 40 : 10 }),
      children,
    ];

    const pages = await run(
      { width: 100, height: 100 },
      [instance({ height: 60 }), instance({ height: 60 })],
      { layout: cover },
    );

    expect(pages).toHaveLength(2);
    expect(boxes(pages[0]).map((b) => [b.top, b.height])).toEqual([
      [0, 40], // tall cover header
      [40, 60], // slot: 100 − 40
      [40, 60], // first block fits exactly
    ]);
    expect(boxes(pages[1]).map((b) => [b.top, b.height])).toEqual([
      [0, 10], // regular header
      [10, 90],
      [10, 60],
    ]);
  });

  test('odd/even mirrored aside keeps slot width and flips position', async () => {
    const mirrored = ({ children, pageNumber }: any) =>
      view(
        { flexDirection: 'row', flexGrow: 1 },
        pageNumber % 2
          ? [view({ width: 40 }), children]
          : [children, view({ width: 40 })],
      );

    const pages = await run(
      { width: 100, height: 100 },
      [instance({ height: 60 }), instance({ height: 60 })],
      { layout: mirrored },
    );

    expect(pages).toHaveLength(2);

    const slotOf = (page: SafePageNode) =>
      boxes(page).find((b) => b.width === 60 && b.height === 100);

    expect(slotOf(pages[0])?.left).toBe(40); // aside on the left
    expect(slotOf(pages[1])?.left).toBe(0); // aside flipped right
  });

  test('width-changing chrome fails loudly with the page number', async () => {
    const drifting = ({ children, pageNumber }: any) =>
      view({ flexDirection: 'row', flexGrow: 1 }, [
        view({ width: pageNumber * 10 }),
        children,
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
    const band = ({ children }: any) => [view({ height: 20 }), children];

    const pages = await run(
      { width: 100, height: 100 },
      [instance({ height: 300 })],
      { layout: band, wrap: false },
    );

    expect(pages).toHaveLength(1);
  });

  test('layout receives totalPages in the totals round', async () => {
    const counted = ({ children, totalPages }: any) => [
      children,
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

describe('suffix fixed deprecation', () => {
  test('in-flow fixed after content warns towards the layout prop', async () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined);

    await run({ width: 100, height: 100 }, [
      instance({ height: 40 }),
      { ...instance({ height: 10 }), props: { fixed: true } },
    ]);

    expect(warn).toHaveBeenCalledWith(expect.stringMatching(/layout` prop/));
    warn.mockRestore();
  });
});
