import resolveRulers from '../../src/layout/resolveRulers';

describe('layout resolveRulers', () => {
  test('Should keep page size untouched if no rulers available', () => {
    const root = {
      type: 'DOCUMENT',
      children: [
        {
          type: 'PAGE',
          props: {},
          box: { height: 1000, width: 500 },
        },
      ],
    };
    const result = resolveRulers(root);

    expect(result).toMatchSnapshot();
  });

  test('Should adjust only height if vertical ruler available', () => {
    const root = {
      type: 'DOCUMENT',
      children: [
        {
          type: 'PAGE',
          props: { verticalRuler: true },
          box: { height: 1000, width: 500 },
        },
      ],
    };
    const result = resolveRulers(root);

    expect(result).toMatchSnapshot();
  });

  test('Should adjust only width if horizontal ruler available', () => {
    const root = {
      type: 'DOCUMENT',
      children: [
        {
          type: 'PAGE',
          props: { horizontalRuler: true },
          box: { height: 1000, width: 500 },
        },
      ],
    };
    const result = resolveRulers(root);

    expect(result).toMatchSnapshot();
  });

  test('Should adjust height and width if both ruler available', () => {
    const root = {
      type: 'DOCUMENT',
      children: [
        {
          type: 'PAGE',
          props: { horizontalRuler: true, verticalRuler: true },
          box: { height: 1000, width: 500 },
        },
      ],
    };
    const result = resolveRulers(root);

    expect(result).toMatchSnapshot();
  });

  test('Should adjust height and width if ruler prop available', () => {
    const root = {
      type: 'DOCUMENT',
      children: [
        {
          type: 'PAGE',
          props: { ruler: true },
          box: { height: 1000, width: 500 },
        },
      ],
    };
    const result = resolveRulers(root);

    expect(result).toMatchSnapshot();
  });
});
