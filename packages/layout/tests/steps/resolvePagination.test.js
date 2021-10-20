import resolvePagination from '../../src/steps/resolvePagination';
import resolveDimensions from '../../src/steps/resolveDimensions';

// dimensions is required by pagination step and them are calculated here
const calcLayout = node => resolvePagination(resolveDimensions(node));

describe('pagination step', () => {
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

  test('should stretch absolute block to full page size', () => {
    const layout = calcLayout(root);

    const page = layout.children[0];
    const view = layout.children[0].children[0];

    expect(page.box.height).toBe(100);
    expect(view.box.height).toBe(100);
  });
});
