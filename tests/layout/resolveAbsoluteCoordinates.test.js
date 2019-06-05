import resolveAbsoluteCoordinates from '../../src/layout/resolveAbsoluteCoordinates';

describe('layout resolveAbsoluteCoordinates', () => {
  test('should leave page coordinates as they are', () => {
    const root = {
      type: 'ROOT',
      children: [
        {
          type: 'DOCUMENT',
          children: [
            {
              type: 'PAGE',
              box: {
                top: 0,
                left: 0,
                width: 100,
                height: 100,
              },
            },
            {
              type: 'PAGE',
              box: {
                top: 0,
                left: 0,
                width: 200,
                height: 200,
              },
            },
          ],
        },
      ],
    };
    const result = resolveAbsoluteCoordinates(root);

    expect(result).toMatchSnapshot();
  });

  test('should leave page children coordinates as they are', () => {
    const root = {
      type: 'ROOT',
      children: [
        {
          type: 'DOCUMENT',
          children: [
            {
              type: 'PAGE',
              box: {
                top: 0,
                left: 0,
                width: 100,
                height: 100,
              },
              children: [
                {
                  type: 'VIEW',
                  box: {
                    top: 20,
                    left: 20,
                    width: 50,
                    height: 50,
                  },
                },
                {
                  type: 'VIEW',
                  box: {
                    top: 70,
                    left: 20,
                    width: 50,
                    height: 20,
                  },
                },
              ],
            },
          ],
        },
      ],
    };
    const result = resolveAbsoluteCoordinates(root);

    expect(result).toMatchSnapshot();
  });

  test('should resolve nested children coordinates', () => {
    const root = {
      type: 'ROOT',
      children: [
        {
          type: 'DOCUMENT',
          children: [
            {
              type: 'PAGE',
              box: {
                top: 0,
                left: 0,
                width: 100,
                height: 100,
              },
              children: [
                {
                  type: 'VIEW',
                  box: {
                    top: 20,
                    left: 20,
                    width: 50,
                    height: 50,
                  },
                  children: [
                    {
                      type: 'VIEW',
                      box: {
                        top: 0,
                        left: 0,
                        width: 40,
                        height: 30,
                      },
                    },
                    {
                      type: 'VIEW',
                      box: {
                        top: 20,
                        left: 20,
                        width: 10,
                        height: 10,
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    };
    const result = resolveAbsoluteCoordinates(root);

    expect(result).toMatchSnapshot();
  });
});
