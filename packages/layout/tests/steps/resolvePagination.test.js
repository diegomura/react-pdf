import resolvePagination from '../../src/steps/resolvePagination';
import resolveDimensions from '../../src/steps/resolveDimensions';

// dimensions is required by pagination step and them are calculated here
const calcLayout = node => resolvePagination(resolveDimensions(node));

console.log('RUN');

describe('pagination step', () => {
  test('should stretch absolute block to full page size', () => {
    const root = {
      type: 'DOCUMENT',
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

    const layout = calcLayout(root);

    const page = layout.children[0];
    const view = layout.children[0].children[0];

    expect(page.box.height).toBe(100);
    expect(view.box.height).toBe(100);
  });

  test('', () => {
    const root = {
      type: 'DOCUMENT',
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

    const layout = calcLayout(root);

    const view1 = layout.children[0].children[0];
    const view2 = layout.children[1].children[0];

    expect(view1.box.height).toBe(60);
    expect(view2.box.height).not.toBe(60);
  });

  test('', () => {
    const root = {
      type: 'DOCUMENT',
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

    const layout = calcLayout(root);

    const view1 = layout.children[0].children[0];
    const view2 = layout.children[1].children[0];
    const view3 = layout.children[2].children[0];

    expect(view1.box.height).toBe(60);
    expect(view2.box.height).toBe(60);
    expect(view3.box.height).toBe(10);
  });
});
