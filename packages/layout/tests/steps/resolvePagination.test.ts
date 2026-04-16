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

  test('should split auto-height container with multiple children across pages', async () => {
    const yoga = await loadYoga();

    const layout = calcLayout({
      type: 'DOCUMENT',
      yoga,
      props: {},
      children: [
        {
          type: 'PAGE',
          props: {},
          style: { width: 100, height: 100 },
          children: [
            {
              type: 'VIEW',
              style: {},
              props: {},
              children: [
                {
                  type: 'VIEW',
                  style: { height: 40 },
                  props: {},
                  children: [],
                },
                {
                  type: 'VIEW',
                  style: { height: 40 },
                  props: {},
                  children: [],
                },
                {
                  type: 'VIEW',
                  style: { height: 40 },
                  props: {},
                  children: [],
                },
              ],
            },
          ],
        },
      ],
    });

    // Total content 120 > page height 100, should produce 2 pages
    expect(layout.children.length).toBe(2);

    const page1 = layout.children[0];
    const page2 = layout.children[1];

    expect(page1.box!.height).toBe(100);
    // Page 1: 2 full children + partial 3rd (split at page boundary)
    expect(page1.children![0].children!.length).toBe(3);
    expect(page1.children![0].children![0].box!.height).toBe(40);
    expect(page1.children![0].children![1].box!.height).toBe(40);
    expect(page1.children![0].children![2].box!.height).toBe(20);

    // Page 2: remainder of 3rd child
    expect(page2.children![0].children!.length).toBe(1);
    expect(page2.children![0].children![0].box!.height).toBe(20);
  });

  test('should split deeply nested views (3+ levels) across pages', async () => {
    const yoga = await loadYoga();

    const layout = calcLayout({
      type: 'DOCUMENT',
      yoga,
      props: {},
      children: [
        {
          type: 'PAGE',
          props: {},
          style: { width: 100, height: 100 },
          children: [
            {
              type: 'VIEW',
              style: {},
              props: {},
              children: [
                {
                  type: 'VIEW',
                  style: {},
                  props: {},
                  children: [
                    {
                      type: 'VIEW',
                      style: { height: 60 },
                      props: {},
                      children: [],
                    },
                    {
                      type: 'VIEW',
                      style: { height: 60 },
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

    // Total content 120 > page height 100, should produce 2 pages
    expect(layout.children.length).toBe(2);

    // Page 1 outermost container
    const page1Outer = layout.children[0].children![0];
    expect(page1Outer.box!.height).toBe(100);

    // Page 2 should have remaining content
    const page2Outer = layout.children[1].children![0];
    expect(page2Outer.children!.length).toBeGreaterThan(0);
  });

  test('should correctly split page with padding and verify dimensions', async () => {
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
            paddingTop: 10,
            paddingBottom: 10,
          },
          children: [
            {
              type: 'VIEW',
              style: { height: 50 },
              props: {},
              children: [],
            },
            {
              type: 'VIEW',
              style: { height: 50 },
              props: {},
              children: [],
            },
          ],
        },
      ],
    });

    // Content area = 100 - 10 - 10 = 80, content = 100 > 80
    expect(layout.children.length).toBe(2);

    const page1 = layout.children[0];
    const page2 = layout.children[1];

    expect(page1.box!.height).toBe(100);
    // First child should be on page 1
    expect(
      page1.children!.filter((c) => c.type !== 'TEXT_INSTANCE').length,
    ).toBeGreaterThanOrEqual(1);
    // Second page should have remaining content
    expect(page2.children!.length).toBeGreaterThan(0);
  });

  test('should produce correct pages for many children (50+)', async () => {
    const yoga = await loadYoga();

    const children = Array.from({ length: 50 }, () => ({
      type: 'VIEW' as const,
      style: { height: 20 },
      props: {},
      children: [],
    }));

    const layout = calcLayout({
      type: 'DOCUMENT',
      yoga,
      props: {},
      children: [
        {
          type: 'PAGE',
          props: {},
          style: { width: 100, height: 100 },
          children,
        },
      ],
    });

    // 50 children × 20 height = 1000 total, page height 100
    // Should produce 10 pages
    expect(layout.children.length).toBe(10);

    // Each page should have 5 children (100 / 20 = 5)
    for (const page of layout.children) {
      expect(page.children!.length).toBe(5);
    }

    // Last page's last child should have correct position
    const lastPage = layout.children[9];
    const lastChild = lastPage.children![4];
    expect(lastChild.box!.height).toBe(20);
  });

  test('should split flex-grow children across pages', async () => {
    const yoga = await loadYoga();

    const layout = calcLayout({
      type: 'DOCUMENT',
      yoga,
      props: {},
      children: [
        {
          type: 'PAGE',
          props: {},
          style: { width: 100, height: 100 },
          children: [
            {
              type: 'VIEW',
              style: { height: 60, flexGrow: 1 },
              props: {},
              children: [],
            },
            {
              type: 'VIEW',
              style: { height: 60, flexGrow: 1 },
              props: {},
              children: [],
            },
          ],
        },
      ],
    });

    // Total 120 > page 100, should split
    expect(layout.children.length).toBe(2);

    const page1 = layout.children[0];
    const page2 = layout.children[1];

    expect(page1.box!.height).toBe(100);
    expect(page2.children!.length).toBeGreaterThan(0);
  });

  test('should handle large non-wrappable element (like Image)', async () => {
    const yoga = await loadYoga();

    const layout = calcLayout({
      type: 'DOCUMENT',
      yoga,
      props: {},
      children: [
        {
          type: 'PAGE',
          props: {},
          style: { width: 100, height: 100 },
          children: [
            {
              type: 'VIEW',
              style: { height: 30 },
              props: {},
              children: [],
            },
            {
              type: 'VIEW',
              style: { height: 80 },
              props: { wrap: false },
              children: [],
            },
          ],
        },
      ],
    });

    // 30 + 80 = 110 > 100, and second view can't wrap
    expect(layout.children.length).toBe(2);

    // Page 1: only first view
    expect(layout.children[0].children!.length).toBe(1);
    expect(layout.children[0].children![0].box!.height).toBe(30);

    // Page 2: large non-wrappable view
    expect(layout.children[1].children!.length).toBe(1);
    expect(layout.children[1].children![0].box!.height).toBe(80);
  });

  test('should handle oversized non-wrappable element larger than page', async () => {
    const yoga = await loadYoga();

    const layout = calcLayout({
      type: 'DOCUMENT',
      yoga,
      props: {},
      children: [
        {
          type: 'PAGE',
          props: {},
          style: { width: 100, height: 100 },
          children: [
            {
              type: 'VIEW',
              style: { height: 150 },
              props: { wrap: false },
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
    });

    // Oversized non-wrappable element overflows page 1, remaining child on next page
    expect(layout.children.length).toBeGreaterThanOrEqual(2);

    // Last page should have the small view
    const lastPage = layout.children[layout.children.length - 1];
    expect(lastPage.children!.length).toBeGreaterThan(0);
  });
});
