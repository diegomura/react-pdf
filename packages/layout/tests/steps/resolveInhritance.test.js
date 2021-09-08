import resolveInheritance from '../../src/steps/resolveInheritance';

describe('layout resolveInheritance', () => {
  const shouldInherit = prop => () => {
    const root = {
      type: 'DOCUMENT',
      children: [
        {
          type: 'PAGE',
          style: { [prop]: 'value' },
          children: [{ type: 'VIEW', style: {} }],
        },
      ],
    };
    const result = resolveInheritance(root);
    const view = result.children[0].children[0];

    expect(view.style).toHaveProperty(prop, 'value');
  };

  test('Should not inherit invalid property', () => {
    const root = {
      type: 'DOCUMENT',
      children: [
        {
          type: 'PAGE',
          style: { backgroundColor: 'value' },
          children: [{ type: 'VIEW', style: {} }],
        },
      ],
    };
    const result = resolveInheritance(root);
    const view = result.children[0].children[0];

    expect(view.style).toHaveProperty('backgroundColor', undefined);
  });

  test('Should not override descendents styles', () => {
    const root = {
      type: 'DOCUMENT',
      children: [
        {
          type: 'PAGE',
          style: { color: 'red' },
          children: [{ type: 'VIEW', style: { color: 'green' } }],
        },
      ],
    };
    const result = resolveInheritance(root);
    const view = result.children[0].children[0];

    expect(view.style).toHaveProperty('color', 'green');
  });

  test('Should only inherit node descendents', () => {
    const root = {
      type: 'DOCUMENT',
      children: [
        {
          type: 'PAGE',
          style: {},
          children: [
            { type: 'VIEW', style: {} },
            {
              type: 'VIEW',
              style: { color: 'green' },
              children: [{ type: 'VIEW', style: {} }],
            },
          ],
        },
      ],
    };
    const result = resolveInheritance(root);
    const view1 = result.children[0].children[0];
    const view2 = result.children[0].children[1];
    const subview = view2.children[0];

    expect(view1.style).toHaveProperty('color', undefined);
    expect(view2.style).toHaveProperty('color', 'green');
    expect(subview.style).toHaveProperty('color', 'green');
  });

  test('Should inherit multiple textDecoration properly', () => {
    const root = {
      type: 'DOCUMENT',
      children: [
        {
          type: 'PAGE',
          style: {},
          children: [
            {
              type: 'TEXT',
              style: { textDecoration: 'line-through' },
              children: [
                { type: 'TEXT', style: { textDecoration: 'underline' } },
              ],
            },
          ],
        },
      ],
    };

    const result = resolveInheritance(root);
    const text1 = result.children[0].children[0];
    const text2 = text1.children[0];

    expect(text1.style).toHaveProperty('textDecoration', 'line-through');
    expect(text2.style).toHaveProperty(
      'textDecoration',
      'line-through underline',
    );
  });

  test('Should inherit color value', shouldInherit('color'));
  test('Should inherit fontFamily value', shouldInherit('fontFamily'));
  test('Should inherit fontSize value', shouldInherit('fontSize'));
  test('Should inherit fontStyle value', shouldInherit('fontStyle'));
  test('Should inherit fontWeight value', shouldInherit('fontWeight'));
  test('Should inherit letterSpacing value', shouldInherit('letterSpacing'));
  test('Should inherit opacity value', shouldInherit('opacity'));
  test('Should inherit textDecoration value', shouldInherit('textDecoration'));
  test('Should inherit textTransform value', shouldInherit('textTransform'));
  test('Should inherit lineHeight value', shouldInherit('lineHeight'));
  test('Should inherit textAlign value', shouldInherit('textAlign'));
  test('Should inherit visibility value', shouldInherit('visibility'));
  test('Should inherit wordSpacing value', shouldInherit('wordSpacing'));
});
