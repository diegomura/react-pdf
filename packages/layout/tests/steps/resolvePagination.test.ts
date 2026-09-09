import { describe, expect, test } from 'vitest';
import FontStore from '@react-pdf/font';

import { loadYoga } from '../../src/yoga';
import resolvePagination from '../../src/steps/resolvePagination';
import resolveDimensions from '../../src/steps/resolveDimensions';
import resolveStyles from '../../src/steps/resolveStyles';
import resolvePagePaddings from '../../src/steps/resolvePagePaddings';
import { SafeDocumentNode } from '../../src/types';

const fontStore = new FontStore();

// dimensions is required by pagination step and them are calculated here
const calcLayout = (node: SafeDocumentNode) =>
  resolvePagination(resolveDimensions(node, fontStore), fontStore);

describe('pagination step', () => {
  test('should stretch absolute block to full page size', async () => {
    const yoga = await loadYoga();

    const layout = calcLayout({
      type: 'DOCUMENT',
      yoga,
      props: {},
      children: [
        {
          type: 'PAGE',
          props: {},
          style: {
            width: 100,
            height: 100,
          },
          children: [
            {
              type: 'VIEW',
              style: {
                position: 'absolute',
                width: '50%',
                top: 0,
                bottom: 0,
              },
              props: {},
              children: [],
            },
            {
              type: 'TEXT',
              style: {},
              props: {},
              children: [
                {
                  type: 'TEXT_INSTANCE',
                  value: 'hello world',
                },
              ],
            },
          ],
        },
      ],
    });

    const page = layout.children[0];
    const view = layout.children[0]!.children![0];

    expect(page.box!.height).toBe(100);
    expect(view.box!.height).toBe(100);
  });

  test('should force new height for split nodes', async () => {
    const yoga = await loadYoga();

    const layout = calcLayout({
      type: 'DOCUMENT',
      yoga,
      props: {},
      children: [
        {
          type: 'PAGE',
          props: {},
          style: {
            width: 13,
            height: 60,
          },
          children: [
            {
              type: 'VIEW',
              style: {},
              props: {},
              children: [
                {
                  type: 'TEXT',
                  style: {},
                  props: {},
                  children: [
                    {
                      type: 'TEXT_INSTANCE',
                      value: 'a a a a',
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    });

    const view1 = layout.children[0].children![0];
    const view2 = layout.children[1].children![0];

    expect(view1.box!.height).toBe(60);
    expect(view2.box!.height).not.toBe(60);
  });

  test('should force new height for split nodes with fixed height', async () => {
    const yoga = await loadYoga();

    const layout = calcLayout({
      type: 'DOCUMENT',
      yoga,
      props: {},
      children: [
        {
          type: 'PAGE',
          props: {},
          style: {
            width: 5,
            height: 60,
          },

          children: [
            {
              type: 'VIEW',
              style: { height: 130 },
              props: {},
              children: [],
            },
          ],
        },
      ],
    });

    const view1 = layout.children[0].children![0];
    const view2 = layout.children[1].children![0];
    const view3 = layout.children[2].children![0];

    expect(view1.box!.height).toBe(60);
    expect(view2.box!.height).toBe(60);
    expect(view3.box!.height).toBe(10);
  });

  test('should not wrap page with false wrap prop', async () => {
    const yoga = await loadYoga();

    const layout = calcLayout({
      type: 'DOCUMENT',
      yoga,
      props: {},
      children: [
        {
          type: 'PAGE',
          style: {
            width: 5,
            height: 60,
          },
          props: {
            wrap: false,
          },
          children: [
            {
              type: 'VIEW',
              style: { height: 130 },
              props: {},
              children: [],
            },
          ],
        },
      ],
    });

    expect(layout.children.length).toBe(1);
  });

  test('should break on a container whose children can not fit on a page', async () => {
    const yoga = await loadYoga();

    const layout = calcLayout({
      type: 'DOCUMENT',
      yoga,
      props: {},
      children: [
        {
          type: 'PAGE',
          props: {},
          style: {
            width: 5,
            height: 60,
          },

          children: [
            {
              type: 'VIEW',
              style: {
                width: 5,
                height: 40,
              },
              props: {},
              children: [],
            },
            {
              type: 'VIEW',
              style: {
                width: 5,
              },
              props: {},
              children: [
                {
                  type: 'VIEW',
                  style: {
                    height: 40,
                  },
                  props: {
                    wrap: false,
                  },
                  children: [],
                },
              ],
            },
          ],
        },
      ],
    });

    const page1 = layout.children[0];
    const page2 = layout.children[1];

    // Only the first view is displayed on the first page
    expect(page1.children!.length).toBe(1);
    // The second page displays the second wrapper, with its full height
    expect(page2.children!.length).toBe(1);
    expect(page2.children![0].box!.height).toBe(40);
  });

  test('should not infinitely loop when splitting pages', async () => {
    const yoga = await loadYoga();

    calcLayout({
      type: 'DOCUMENT',
      yoga,
      props: {},
      children: [
        {
          type: 'PAGE',
          props: {},
          style: {
            height: 400,
          },
          children: [
            {
              type: 'VIEW',
              style: { height: 401 },
              props: {},
              children: [
                {
                  type: 'VIEW',
                  style: {
                    height: 400,
                  },
                  props: { wrap: false, break: true },
                },
              ],
            },
          ],
        },
      ],
    });

    // If calcLayout returns then we did not hit an infinite loop
    expect(true).toBe(true);
  });

  test('should take padding into account when splitting pages', async () => {
    const yoga = await loadYoga();

    const root = {
      type: 'DOCUMENT' as const,
      yoga,
      props: {},
      style: {},
      children: [
        {
          type: 'PAGE' as const,
          box: {
            width: 612,
            height: 792,
            top: 0,
            left: 0,
            right: 612,
            bottom: 792,
          },
          style: {
            paddingTop: 30,
            width: 612,
            height: 792,
          },
          props: { wrap: true },
          children: [
            {
              type: 'VIEW' as const,
              box: {
                width: 612,
                height: 761,
                top: 0,
                left: 0,
                right: 612,
                bottom: 761,
              },
              style: { height: 761, marginBottom: 24 },
              props: { wrap: true, break: false },
            },
            {
              type: 'VIEW' as const,
              box: {
                width: 612,
                height: 80,
                top: 761,
                left: 0,
                right: 612,
                bottom: 841,
              },
              style: { height: 80 },
              props: { wrap: true, break: false },
            },
          ],
        },
      ],
    };

    calcLayout(root);

    // If calcLayout returns then we did not hit an infinite loop
    expect(true).toBe(true);
  });

  test('should not duplicate bookmarks', async () => {
    const yoga = await loadYoga();

    const bookmarkChapter1 = {
      ref: 0,
      title: 'chapter 1',
      fit: false,
      expanded: false,
    };
    const bookmarkChapter2 = {
      ref: 1,
      title: 'chapter 2',
      fit: false,
      expanded: false,
    };
    const bookmarkSubChapter1 = {
      ref: 2,
      parent: 1,
      title: 'sub chapter 2',
      fit: false,
      expanded: false,
    };
    const bookmarkSubChapter2 = {
      ref: 3,
      parent: 1,
      title: 'sub chapter 2',
      fit: false,
      expanded: false,
    };
    const bookmarkSubChapter3 = {
      ref: 4,
      parent: 1,
      title: 'sub chapter 2',
      fit: false,
      expanded: false,
    };

    const result = calcLayout({
      type: 'DOCUMENT',
      yoga,
      props: {},
      style: {},
      children: [
        {
          type: 'PAGE',
          props: {},
          style: { width: 5, height: 60 },
          children: [
            {
              type: 'VIEW',
              props: { bookmark: bookmarkChapter1 },
              style: {
                height: 30,
              },
            },
            {
              type: 'VIEW',
              props: { bookmark: bookmarkChapter2 },
              style: {},
              children: [
                {
                  type: 'VIEW',
                  props: {
                    bookmark: bookmarkSubChapter1,
                  },
                  style: {
                    height: 20,
                  },
                  children: [],
                },
                {
                  type: 'VIEW',
                  props: {
                    bookmark: bookmarkSubChapter2,
                  },
                  style: {
                    height: 20,
                  },
                  children: [],
                },
                {
                  type: 'VIEW',
                  props: {
                    bookmark: bookmarkSubChapter3,
                  },
                  style: {
                    height: 20,
                  },
                  children: [],
                },
              ],
            },
          ],
        },
      ],
    });

    const page1 = result.children[0];
    const page2 = result.children[1];
    const chapter1 = page1.children![0];
    const chapter2page1 = page1.children![1];
    const chapter2page2 = page2.children![0];
    const subChapter1 = chapter2page1.children![0];
    const subChapter2page1 = chapter2page1.children![1];
    const subChapter2page2 = chapter2page2.children![0];
    const subChapter3 = chapter2page2.children![1];

    expect(chapter1.props.bookmark).toEqual(bookmarkChapter1);

    expect(chapter2page1.props.bookmark).toEqual(bookmarkChapter2);
    expect(chapter2page2.props.bookmark).toEqual(null);

    expect(subChapter1.props!.bookmark).toEqual(bookmarkSubChapter1);

    expect(subChapter2page1.props!.bookmark).toEqual(bookmarkSubChapter2);
    expect(subChapter2page2.props!.bookmark).toEqual(null);

    expect(subChapter3.props!.bookmark).toEqual(bookmarkSubChapter3);
  });
});

/**
 * Regression: content overlapping itself at a page break (issue #3449).
 *
 * A `wrap={false}` subtree that is the ONLY child of its container and lands
 * near the bottom of a page used to be force-fit into the little space left
 * (because `splitNodes` treated "this container has no current children" as
 * "the page is empty") instead of moving to the next page. Yoga then compressed
 * every line on top of the next — the reported "overlapping at the page break".
 *
 * The fix only keeps such a node on the current page when it genuinely cannot
 * fit on a page by itself; otherwise it moves to the next page.
 */
describe('pagination overflow regression (#3449)', () => {
  const resolveFull = (node: SafeDocumentNode) =>
    resolvePagination(
      resolveDimensions(resolvePagePaddings(resolveStyles(node)), fontStore),
      fontStore,
    );

  const text = (value: string, style: any = {}) => ({
    type: 'TEXT',
    style,
    props: {},
    children: [{ type: 'TEXT_INSTANCE', value }],
  });
  const view = (style: any, children: any[], props: any = {}) => ({
    type: 'VIEW',
    style,
    props,
    children,
  });

  // A two-column "itinerary entry": short left column + taller right column,
  // kept together with wrap={false}.
  const entry = (time: string, title: string, blocks: string[][]) =>
    view({}, [
      view(
        {
          flexDirection: 'row',
          borderBottomWidth: 1,
          paddingTop: 8,
          paddingBottom: 8,
        },
        [
          view({ width: 130, marginLeft: 20 }, [
            text(time, { fontSize: 11, marginBottom: 5 }),
            text('PENDING', { fontSize: 7 }),
          ]),
          view({ flex: 1, marginRight: 20 }, [
            text(title, { fontSize: 10 }),
            text('2 Adults', { fontSize: 8, marginTop: 5 }),
            ...blocks.map(([label, value]) =>
              view({ fontSize: 8, marginTop: 5 }, [
                text(label, { fontWeight: 700 }),
                text(value),
              ]),
            ),
          ]),
        ],
        { wrap: false },
      ),
    ]);

  // A "day": a date header + first entry kept together, then the remaining
  // entries in a sibling container (so a later entry is the sole child of it).
  const day = (name: string, first: any, rest: any[]) =>
    view({}, [
      view({ minPresenceAhead: 100 }, [
        view({ marginTop: 10, marginBottom: 8 }, [
          text(name, { fontSize: 9, fontWeight: 700 }),
        ]),
        first,
      ]),
      view({}, rest),
    ]);

  // Count text spans that vertically overlap another span in the same column.
  const countOverlaps = (layout: any) => {
    let overlaps = 0;
    layout.children.forEach((page: any) => {
      const spans: { top: number; bottom: number; left: number }[] = [];
      const walk = (node: any, top: number, left: number) => {
        const t = top + (node.box?.top || 0);
        const l = left + (node.box?.left || 0);
        if (node.type === 'TEXT' && (node.lines || []).length) {
          const h = node.lines.reduce(
            (acc: number, line: any) => acc + line.box.height,
            0,
          );
          spans.push({ top: t, bottom: t + h, left: l });
        }
        (node.children || []).forEach((c: any) => walk(c, t, l));
      };
      walk(page, 0, 0);

      const columns: Record<number, typeof spans> = {};
      spans.forEach((s) => {
        const key = Math.round(s.left / 10);
        (columns[key] ||= []).push(s);
      });
      Object.values(columns).forEach((col) => {
        col.sort((a, b) => a.top - b.top);
        for (let i = 1; i < col.length; i += 1) {
          if (col[i].top < col[i - 1].bottom - 1) overlaps += 1;
        }
      });
    });
    return overlaps;
  };

  const buildDoc = (yoga: any, pageHeight: number): SafeDocumentNode =>
    ({
      type: 'DOCUMENT',
      yoga,
      props: {},
      children: [
        {
          type: 'PAGE',
          props: {},
          style: {
            width: 595.28,
            height: pageHeight,
            paddingTop: 40,
            paddingBottom: 90,
            paddingHorizontal: 40,
            flexDirection: 'column',
          },
          children: [
            view({}, [text('Daily Itinerary', { fontSize: 22 })], {
              fixed: true,
            }),
            view({ flex: 1 }, [
              day(
                'TUESDAY, APR 7',
                entry('12:25 AM', 'Juvia', [
                  ['Address', '1111 Lincoln Road, Miami Beach, Florida, 33139'],
                  ['Website', 'http://www.juviamiami.com/'],
                  ['Phone', '+1 305-763-8272'],
                  [
                    'Cancellation Policy',
                    'A $50.00 cancellation fee will be charged for each person on the reservation, to the credit card on file if not cancelled by 3:00 PM.',
                  ],
                ]),
                [
                  entry('01:05 AM', 'Miami Beach Golf Club', [
                    ['Address', '2301 Alton Road, Miami Beach, Florida, 33140'],
                    ['Website', 'http://www.miamibeachgolfclub.com/'],
                    ['Phone', '+1 305-532-3350'],
                  ]),
                ],
              ),
            ]),
            view(
              {
                position: 'absolute',
                bottom: 0,
                left: 40,
                right: 40,
                height: 50,
              },
              [text('FOOTER', { fontSize: 8 })],
              { fixed: true },
            ),
          ],
        },
      ],
    }) as any;

  // Sweep a range of page heights so the second entry lands at different
  // offsets from the page bottom; none of them may overlap.
  for (const pageHeight of [520, 560, 600, 640]) {
    test(`no text overlaps at the page break (page height ${pageHeight})`, async () => {
      const yoga = await loadYoga();
      const layout = resolveFull(buildDoc(yoga, pageHeight));
      expect(countOverlaps(layout)).toBe(0);
    });
  }

  // Guard the fix against an infinite page loop: a node that fits the content
  // area but never fits the space left under a tall fixed header must NOT be
  // moved forever — when the page is empty above it, it stays (and overflows),
  // which is what keeps pagination terminating.
  test('does not loop when a sole child never fits under a tall fixed header', async () => {
    const yoga = await loadYoga();
    const layout = resolveFull({
      type: 'DOCUMENT',
      yoga,
      props: {},
      children: [
        {
          type: 'PAGE',
          props: {},
          style: {
            width: 200,
            height: 200,
            padding: 20,
            flexDirection: 'column',
          },
          children: [
            view({ height: 150 }, [], { fixed: true }),
            view({ flex: 1 }, [
              view({}, [view({ height: 100 }, [], { wrap: false })]),
            ]),
          ],
        },
      ],
    } as any);

    // Terminates with a small number of pages instead of looping forever.
    expect(layout.children.length).toBeLessThan(20);
  });
});
