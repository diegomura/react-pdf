import { describe, expect, test } from 'vitest';
import { Text } from '@react-pdf/primitives';

import resolvePagination from '../../src/steps/resolvePagination';
import resolveDimensions from '../../src/steps/resolveDimensions';
import { loadYoga } from '../../src/yoga';

// dimensions is required by pagination step and them are calculated here
const calcLayout = (node) => resolvePagination(resolveDimensions(node));

describe('pagination step', () => {
  test('should stretch absolute block to full page size', async () => {
    const yoga = await loadYoga();

    const root = {
      type: 'DOCUMENT',
      yoga,
      children: [
        {
          type: 'PAGE',
          box: {},
          style: {
            width: 100,
            height: 100,
          },
          children: [
            {
              type: 'VIEW',
              box: {},
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
              box: {},
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
    };

    const layout = await calcLayout(root);

    const page = layout.children[0];
    const view = layout.children[0].children[0];

    expect(page.box.height).toBe(100);
    expect(view.box.height).toBe(100);
  });

  test('should force new height for split nodes', async () => {
    const yoga = await loadYoga();

    const root = {
      type: 'DOCUMENT',
      yoga,
      children: [
        {
          type: 'PAGE',
          box: {},
          style: {
            width: 15,
            height: 60,
          },

          children: [
            {
              type: 'VIEW',
              box: {},
              style: {},
              props: {},
              children: [
                {
                  type: 'TEXT',
                  box: {},
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
    };

    const layout = await calcLayout(root);

    const view1 = layout.children[0].children[0];
    const view2 = layout.children[1].children[0];

    expect(view1.box.height).toBe(60);
    expect(view2.box.height).not.toBe(60);
  });

  test('should force new height for split nodes with fixed height', async () => {
    const yoga = await loadYoga();

    const root = {
      type: 'DOCUMENT',
      yoga,
      children: [
        {
          type: 'PAGE',
          box: {},
          style: {
            width: 5,
            height: 60,
          },

          children: [
            {
              type: 'VIEW',
              box: {},
              style: { height: 130 },
              props: {},
              children: [],
            },
          ],
        },
      ],
    };

    const layout = await calcLayout(root);

    const view1 = layout.children[0].children[0];
    const view2 = layout.children[1].children[0];
    const view3 = layout.children[2].children[0];

    expect(view1.box.height).toBe(60);
    expect(view2.box.height).toBe(60);
    expect(view3.box.height).toBe(10);
  });

  test('should calculate height and keep the page order', async () => {
    const yoga = await loadYoga();

    const root = {
      type: 'DOCUMENT',
      yoga,
      children: [
        {
          type: 'PAGE',
          box: {},
          style: {
            width: 5,
            height: 60,
          },
          children: [
            {
              type: 'VIEW',
              box: {},
              style: { height: 18 },
              props: { fixed: true },
              children: [],
            },
            {
              type: 'VIEW',
              box: {},
              style: { height: 30 },
              props: {},
              children: [],
            },
            {
              type: 'VIEW',
              box: {},
              style: { height: 57 },
              props: {},
              children: [],
            },
            {
              type: 'VIEW',
              box: {},
              style: { height: 15 },
              props: {},
              children: [],
            },
          ],
        },
        {
          type: 'PAGE',
          box: {},
          style: {
            height: 50,
          },
          children: [
            {
              type: 'VIEW',
              box: {},
              style: {},
              props: {
                fixed: true,
                render: () => <Text style={{ height: 10 }}>rear window</Text>,
              },
              children: [],
            },
            {
              type: 'VIEW',
              box: {},
              style: { height: 22 },
              props: {},
              children: [],
            },
          ],
        },
        {
          type: 'PAGE',
          box: {},
          style: {
            height: 40,
          },
          children: [
            {
              type: 'VIEW',
              box: {},
              style: { height: 12 },
              props: {},
              children: [],
            },
          ],
        },
        {
          type: 'PAGE',
          box: {},
          style: {
            height: 30,
          },
          children: [
            {
              type: 'VIEW',
              box: {},
              style: {},
              props: {},
              children: [],
            },
          ],
        },
      ],
    };

    const layout = await calcLayout(root);

    const page1 = layout.children[0];
    const [view1, view2, view3] = page1.children;

    const page2 = layout.children[1];
    const [view4, view5] = page2.children;

    const page3 = layout.children[2];
    const [view6, view7, view8] = page3.children;

    const page4 = layout.children[3];
    const [view9, view10] = page4.children;

    const page5 = layout.children[4];
    const [view11] = page5.children;

    const page6 = layout.children[5];

    // page 1
    expect(view1.box.height).toBe(18); // fixed header
    expect(view2.box.height).toBe(30);
    expect(view3.box.height).toBe(12);
    expect(page1.box.height).toBe(60);

    // page 2
    expect(view4.box.height).toBe(18); // fixed header
    expect(view5.box.height).toBe(42);
    expect(page2.box.height).toBe(60);

    // page 3
    expect(view6.box.height).toBe(18); // fixed header
    expect(view7.box.height).toBe(3);
    expect(view8.box.height).toBe(15);
    expect(page3.box.height).toBe(60);

    // page 4
    expect(view9.box.height).toBe(10);
    expect(view10.box.height).toBe(22);
    expect(page4.box.height).toBe(50);

    // page 5
    expect(page5.box.height).toBe(40);
    expect(view11.box.height).toBe(12);

    // page 6
    expect(page6.box.height).toBe(30);
  });

  test('should not wrap page with false wrap prop', async () => {
    const yoga = await loadYoga();

    const root = {
      type: 'DOCUMENT',
      yoga,
      children: [
        {
          type: 'PAGE',
          box: {},
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
              box: {},
              style: { height: 130 },
              props: {},
              children: [],
            },
          ],
        },
      ],
    };

    const layout = await calcLayout(root);

    expect(layout.children.length).toBe(1);
  });

  test('should break on a container whose children can not fit on a page', async () => {
    const yoga = await loadYoga();

    const root = {
      type: 'DOCUMENT',
      yoga,
      children: [
        {
          type: 'PAGE',
          box: {},
          style: {
            width: 5,
            height: 60,
          },

          children: [
            {
              type: 'VIEW',
              box: {},
              style: {
                width: 5,
                height: 40,
              },
              props: {},
              children: [],
            },
            {
              type: 'VIEW',
              box: {},
              style: {
                width: 5,
              },
              props: {},
              children: [
                {
                  type: 'VIEW',
                  box: {},
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
    };

    const layout = await calcLayout(root);

    const page1 = layout.children[0];
    const page2 = layout.children[1];

    // Only the first view is displayed on the first page
    expect(page1.children.length).toBe(1);
    // The second page displays the second wrapper, with its full height
    expect(page2.children.length).toBe(1);
    expect(page2.children[0].box.height).toBe(40);
  });
});
