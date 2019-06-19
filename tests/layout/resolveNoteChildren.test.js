import resolveNoteChildren from '../../src/layout/resolveNoteChildren';

describe('layout resolveStyles', () => {
  test('should leave non note children as they are', () => {
    const root = {
      type: 'ROOT',
      children: [
        {
          type: 'DOCUMENT',
          children: [
            {
              type: 'PAGE',
              children: [
                {
                  type: 'VIEW',
                  children: [
                    {
                      type: 'TEXT',
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    };
    const result = resolveNoteChildren(root);

    expect(result).toMatchSnapshot();
  });

  test('should add note without children an empty text instance', () => {
    const root = {
      type: 'ROOT',
      children: [
        {
          type: 'DOCUMENT',
          children: [
            {
              type: 'PAGE',
              children: [
                {
                  type: 'NOTE',
                  children: [],
                },
              ],
            },
          ],
        },
      ],
    };
    const result = resolveNoteChildren(root);

    expect(result).toMatchSnapshot();
  });

  test('should leave note single note text instance children as it is', () => {
    const root = {
      type: 'ROOT',
      children: [
        {
          type: 'DOCUMENT',
          children: [
            {
              type: 'PAGE',
              children: [
                {
                  type: 'NOTE',
                  children: [
                    {
                      type: 'TEXT_INSTANCE',
                      value: 'React',
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    };
    const result = resolveNoteChildren(root);

    expect(result).toMatchSnapshot();
  });

  test('should concatenate two note text instance children into one', () => {
    const root = {
      type: 'ROOT',
      children: [
        {
          type: 'DOCUMENT',
          children: [
            {
              type: 'PAGE',
              children: [
                {
                  type: 'NOTE',
                  children: [
                    {
                      type: 'TEXT_INSTANCE',
                      value: 'React',
                    },
                    {
                      type: 'TEXT_INSTANCE',
                      value: '-pdf',
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    };
    const result = resolveNoteChildren(root);

    expect(result).toMatchSnapshot();
  });

  test('should concatenate several note children into one', () => {
    const root = {
      type: 'ROOT',
      children: [
        {
          type: 'DOCUMENT',
          children: [
            {
              type: 'PAGE',
              children: [
                {
                  type: 'NOTE',
                  children: [
                    {
                      type: 'TEXT_INSTANCE',
                      value: 'React ',
                    },
                    {
                      type: 'VIEW',
                      children: [
                        {
                          type: 'TEXT',
                          children: [
                            {
                              type: 'TEXT_INSTANCE',
                              value: 'freakin ',
                            },
                          ],
                        },
                        {
                          type: 'TEXT_INSTANCE',
                          value: 'pdf ',
                        },
                      ],
                    },
                    {
                      type: 'TEXT_INSTANCE',
                      value: 'ftw',
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    };
    const result = resolveNoteChildren(root);

    expect(result).toMatchSnapshot();
  });
});
