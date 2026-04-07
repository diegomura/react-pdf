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
            width: 15,
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
