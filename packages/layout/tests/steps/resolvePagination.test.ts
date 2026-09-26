import { describe, expect, test } from 'vitest';
import FontStore from '@react-pdf/font';

import { loadYoga } from '../../src/yoga';
import resolvePagination from '../../src/steps/resolvePagination';
import resolveDimensions from '../../src/steps/resolveDimensions';
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

  test('should move breakWhenNeeded containers to the next page before splitting them', async () => {
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
                height: 20,
              },
              props: {},
              children: [],
            },
            {
              type: 'VIEW',
              style: {
                width: 5,
              },
              props: {
                breakWhenNeeded: true,
              },
              children: [
                {
                  type: 'VIEW',
                  style: {
                    height: 30,
                  },
                  props: {},
                  children: [],
                },
                {
                  type: 'VIEW',
                  style: {
                    height: 30,
                  },
                  props: {},
                  children: [],
                },
                {
                  type: 'VIEW',
                  style: {
                    height: 30,
                  },
                  props: {},
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
    const page3 = layout.children[2];

    expect(layout.children).toHaveLength(3);
    expect(page1.children).toHaveLength(1);
    expect(page2.children).toHaveLength(1);
    expect(page3.children).toHaveLength(1);
    expect(page2.children![0].children).toHaveLength(2);
    expect(page3.children![0].children).toHaveLength(1);
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

  test('should move a nested breakWhenNeeded container that is the first child of its wrapper', async () => {
    const yoga = await loadYoga();

    // The wrapper starts 20pt down the page, so its first child has nothing
    // above it inside the wrapper but still gains a page by moving.
    const layout = calcLayout({
      type: 'DOCUMENT',
      yoga,
      props: {},
      children: [
        {
          type: 'PAGE',
          props: {},
          style: { width: 5, height: 60 },
          children: [
            {
              type: 'VIEW',
              style: { width: 5, height: 20 },
              props: {},
              children: [],
            },
            {
              type: 'VIEW',
              style: { width: 5 },
              props: {},
              children: [
                {
                  type: 'VIEW',
                  style: { width: 5 },
                  props: { breakWhenNeeded: true },
                  children: [
                    {
                      type: 'VIEW',
                      style: { height: 30 },
                      props: {},
                      children: [],
                    },
                    {
                      type: 'VIEW',
                      style: { height: 30 },
                      props: {},
                      children: [],
                    },
                    {
                      type: 'VIEW',
                      style: { height: 30 },
                      props: {},
                      children: [],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    });

    expect(layout.children).toHaveLength(3);

    // Page 1 keeps only the 20pt sibling: the wrapper moved whole
    expect(layout.children[0].children).toHaveLength(1);

    // The container splits from page 2 onwards, never on page 1
    const onPage2 = layout.children[1].children![0].children![0];
    const onPage3 = layout.children[2].children![0].children![0];

    expect(onPage2.children).toHaveLength(2);
    expect(onPage3.children).toHaveLength(1);
  });

  // A table long enough to run over five pages. The cover block above it is
  // 60 tall on a 100 tall page, so only two rows fit in what is left of
  // page 1; every later page holds five.
  const LONG_TABLE_ROWS = 20;

  const longTableDocument = (yoga: any, tableProps: any): any => ({
    type: 'DOCUMENT',
    yoga,
    props: {},
    children: [
      {
        type: 'PAGE',
        props: {},
        style: { width: 10, height: 100 },
        children: [
          {
            type: 'VIEW',
            style: { width: 10, height: 60 },
            props: {},
            children: [],
          },
          {
            type: 'VIEW',
            style: { width: 10 },
            props: tableProps,
            children: Array.from({ length: LONG_TABLE_ROWS }, () => ({
              type: 'VIEW',
              style: { height: 20 },
              props: {},
              children: [],
            })),
          },
        ],
      },
    ],
  });

  // How many table rows landed on each page. The cover block has no
  // children, so the table is the only node with any.
  const rowsPerPage = (layout: any): number[] =>
    layout.children.map((page: any) => {
      const table = (page.children || []).find(
        (child: any) => (child.children || []).length > 0,
      );

      return table ? table.children.length : 0;
    });

  test('should split a long wrapping table starting at the bottom of page 1', async () => {
    const yoga = await loadYoga();

    const layout = calcLayout(longTableDocument(yoga, { wrap: true }));

    expect(layout.children).toHaveLength(5);

    // Two rows are stranded under the cover block before the first split
    expect(rowsPerPage(layout)).toEqual([2, 5, 5, 5, 3]);
  });

  test('should move a long breakWhenNeeded table to page 2 and split it from there', async () => {
    const yoga = await loadYoga();

    const layout = calcLayout(
      longTableDocument(yoga, { wrap: true, breakWhenNeeded: true }),
    );

    // Same row count and same page count, but page 1 keeps none of them
    expect(layout.children).toHaveLength(5);
    expect(rowsPerPage(layout)).toEqual([0, 5, 5, 5, 5]);

    // Every row still gets rendered, just starting one page later
    const total = rowsPerPage(layout).reduce((a, b) => a + b, 0);
    expect(total).toBe(LONG_TABLE_ROWS);
  });
});
