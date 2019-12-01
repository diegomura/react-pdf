import resolvePagePaddings from '../../src/layout/resolvePagePaddings';

describe('layout resolvePagePaddings', () => {
  test('Should keep other styles untouched', () => {
    const root = {
      type: 'DOCUMENT',
      children: [{ type: 'PAGE', style: { color: 'red' } }],
    };
    const result = resolvePagePaddings(root);

    expect(result).toMatchSnapshot();
  });

  test('Should leave numeric paddingTop as it is', () => {
    const root = {
      type: 'DOCUMENT',
      children: [{ type: 'PAGE', style: { paddingTop: 50 } }],
    };
    const result = resolvePagePaddings(root);

    expect(result).toMatchSnapshot();
  });

  test('Should leave numeric paddingRight as it is', () => {
    const root = {
      type: 'DOCUMENT',
      children: [{ type: 'PAGE', style: { paddingRight: 50 } }],
    };
    const result = resolvePagePaddings(root);

    expect(result).toMatchSnapshot();
  });

  test('Should leave numeric paddingBottom as it is', () => {
    const root = {
      type: 'DOCUMENT',
      children: [{ type: 'PAGE', style: { paddingBottom: 50 } }],
    };
    const result = resolvePagePaddings(root);

    expect(result).toMatchSnapshot();
  });

  test('Should leave numeric paddingLeft as it is', () => {
    const root = {
      type: 'DOCUMENT',
      children: [{ type: 'PAGE', style: { paddingLeft: 50 } }],
    };
    const result = resolvePagePaddings(root);

    expect(result).toMatchSnapshot();
  });

  test('Should resolve percent paddingTop', () => {
    const root = {
      type: 'DOCUMENT',
      children: [
        {
          type: 'PAGE',
          style: { paddingTop: '10%' },
          props: { size: { width: 100, height: 200 } },
        },
      ],
    };
    const result = resolvePagePaddings(root);

    expect(result).toMatchSnapshot();
  });

  test('Should resolve percent paddingRight', () => {
    const root = {
      type: 'DOCUMENT',
      children: [
        {
          type: 'PAGE',
          style: { paddingRight: '10%' },
          props: { size: { width: 100, height: 200 } },
        },
      ],
    };
    const result = resolvePagePaddings(root);

    expect(result).toMatchSnapshot();
  });

  test('Should resolve percent paddingBottom', () => {
    const root = {
      type: 'DOCUMENT',
      children: [
        {
          type: 'PAGE',
          style: { paddingBottom: '10%' },
          props: { size: { width: 100, height: 200 } },
        },
      ],
    };
    const result = resolvePagePaddings(root);

    expect(result).toMatchSnapshot();
  });

  test('Should resolve percent paddingLeft', () => {
    const root = {
      type: 'DOCUMENT',
      children: [
        {
          type: 'PAGE',
          style: { paddingLeft: '10%' },
          props: { size: { width: 100, height: 200 } },
        },
      ],
    };
    const result = resolvePagePaddings(root);

    expect(result).toMatchSnapshot();
  });

  test('Should resolve several pages', () => {
    const root = {
      type: 'DOCUMENT',
      children: [
        {
          type: 'PAGE',
          style: { paddingTop: 10 },
          props: { size: { width: 100, height: 200 } },
        },
        {
          type: 'PAGE',
          style: { paddingBottom: '10%' },
          props: { size: { width: 100, height: 200 } },
        },
        {
          type: 'PAGE',
          style: { paddingRight: 10, paddingLeft: '10%' },
          props: { size: { width: 100, height: 200 } },
        },
      ],
    };
    const result = resolvePagePaddings(root);

    expect(result).toMatchSnapshot();
  });
});
