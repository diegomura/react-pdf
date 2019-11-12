import resolveStyles from '../../src/layout/resolveStyles';

describe('layout resolveStyles', () => {
  test('Should resolve page styles', () => {
    const root = {
      type: 'DOCUMENT',
      children: [
        {
          type: 'PAGE',
          style: {
            paddingHorizontal: '10in',
            paddingVertical: '10mm',
            backgroundColor: 'red',
            border: '1cm dotted green',
          },
        },
      ],
    };
    const result = resolveStyles(root);

    expect(result).toMatchSnapshot();
  });

  test('Should resolve several pages styles', () => {
    const root = {
      type: 'DOCUMENT',
      children: [
        {
          type: 'PAGE',
          style: {
            paddingHorizontal: '10in',
            paddingVertical: '10mm',
            borderTop: '4 solid #FF00000',
          },
        },
        {
          type: 'PAGE',
          style: {
            backgroundColor: 'red',
            border: '1cm dotted green',
            fontWeight: 'bold',
          },
        },
      ],
    };
    const result = resolveStyles(root);

    expect(result).toMatchSnapshot();
  });

  test('Should resolve page styles array', () => {
    const root = {
      type: 'DOCUMENT',
      children: [
        {
          type: 'PAGE',
          style: [
            {
              paddingHorizontal: '10in',
              paddingVertical: '10mm',
            },
            {
              backgroundColor: 'red',
              border: '1cm dotted green',
            },
          ],
        },
      ],
    };
    const result = resolveStyles(root);

    expect(result).toMatchSnapshot();
  });

  test('Should resolve nested node styles', () => {
    const root = {
      type: 'DOCUMENT',
      children: [
        {
          type: 'PAGE',
          box: { width: 100, height: 200 },
          children: [
            {
              type: 'VIEW',
              style: {
                paddingHorizontal: '10in',
                paddingVertical: '10mm',
                backgroundColor: 'red',
                border: '1cm dotted green',
              },
            },
          ],
        },
      ],
    };
    const result = resolveStyles(root);

    expect(result).toMatchSnapshot();
  });

  test('Should resolve nested node styles media queries', () => {
    const root = {
      type: 'DOCUMENT',
      children: [
        {
          type: 'PAGE',
          box: { width: 100, height: 200 },
          children: [
            {
              type: 'VIEW',
              style: {
                backgroundColor: 'red',
                '@media max-width: 500': {
                  backgroundColor: 'green',
                },
              },
            },
            {
              type: 'VIEW',
              style: {
                backgroundColor: 'red',
                '@media min-width: 500': {
                  backgroundColor: 'green',
                },
              },
            },
          ],
        },
      ],
    };
    const result = resolveStyles(root);

    expect(result).toMatchSnapshot();
  });

  test('Should resolve nested node styles array', () => {
    const root = {
      type: 'DOCUMENT',
      children: [
        {
          type: 'PAGE',
          box: { width: 100, height: 200 },
          children: [
            {
              type: 'VIEW',
              style: [
                {
                  paddingHorizontal: '10in',
                  paddingVertical: '10mm',
                },
                {
                  backgroundColor: 'red',
                  border: '1cm dotted green',
                },
              ],
            },
          ],
        },
      ],
    };
    const result = resolveStyles(root);

    expect(result).toMatchSnapshot();
  });

  test('Should resolve default link styles', () => {
    const root = {
      type: 'DOCUMENT',
      children: [
        {
          type: 'PAGE',
          box: { width: 100, height: 200 },
          children: [
            {
              type: 'LINK',
              style: {},
            },
          ],
        },
      ],
    };
    const result = resolveStyles(root);

    expect(result).toMatchSnapshot();
  });
});
