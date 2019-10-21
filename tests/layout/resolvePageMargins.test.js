import resolvePageMargins from '../../src/layout/resolvePageMargins';

describe('layout resolvePageMargins', () => {
  test('Should keep other styles untouched', () => {
    const root = {
      type: 'DOCUMENT',
      children: [{ type: 'PAGE', style: { color: 'red' } }],
    };
    const result = resolvePageMargins(root);

    expect(result.children[0].style).toHaveProperty('color', 'red');
  });

  test('Should remove marginTop', () => {
    const root = {
      type: 'DOCUMENT',
      children: [{ type: 'PAGE', style: { marginTop: 0 } }],
    };
    const result = resolvePageMargins(root);

    expect(result.children[0].style).not.toHaveProperty('marginTop');
  });

  test('Should remove marginRight', () => {
    const root = {
      type: 'DOCUMENT',
      children: [{ type: 'PAGE', style: { marginRight: 0 } }],
    };
    const result = resolvePageMargins(root);

    expect(result.children[0].style).not.toHaveProperty('marginRight');
  });

  test('Should remove marginBottom', () => {
    const root = {
      type: 'DOCUMENT',
      children: [{ type: 'PAGE', style: { marginBottom: 0 } }],
    };
    const result = resolvePageMargins(root);

    expect(result.children[0].style).not.toHaveProperty('marginBottom');
  });

  test('Should remove marginLeft', () => {
    const root = {
      type: 'DOCUMENT',
      children: [{ type: 'PAGE', style: { marginLeft: 0 } }],
    };
    const result = resolvePageMargins(root);

    expect(result.children[0].style).not.toHaveProperty('marginLeft');
  });

  test('Should remove margin shorthand', () => {
    const root = {
      type: 'DOCUMENT',
      children: [{ type: 'PAGE', style: { margin: 0 } }],
    };
    const result = resolvePageMargins(root);

    expect(result.children[0].style).not.toHaveProperty('margin');
  });

  test('Should remove marginHorizontal shorthand', () => {
    const root = {
      type: 'DOCUMENT',
      children: [{ type: 'PAGE', style: { marginHorizontal: 0 } }],
    };
    const result = resolvePageMargins(root);

    expect(result.children[0].style).not.toHaveProperty('marginHorizontal');
  });

  test('Should remove marginVertical shorthand', () => {
    const root = {
      type: 'DOCUMENT',
      children: [{ type: 'PAGE', style: { marginVertical: 0 } }],
    };
    const result = resolvePageMargins(root);

    expect(result.children[0].style).not.toHaveProperty('marginVertical');
  });

  test('Should resolve several pages', () => {
    const root = {
      type: 'DOCUMENT',
      children: [
        { type: 'PAGE', style: { marginTop: 10 } },
        { type: 'PAGE', style: { margin: 10 } },
        { type: 'PAGE', style: { marginHorizontal: 10, color: 'red' } },
      ],
    };
    const result = resolvePageMargins(root);

    expect(result.children[0].style).not.toHaveProperty('marginTop');
    expect(result.children[1].style).not.toHaveProperty('margin');
    expect(result.children[2].style).not.toHaveProperty(
      'wmarginHorizontalidth',
    );
    expect(result.children[2].style).toHaveProperty('color', 'red');
  });
});
