import removePaddings from '../../src/node/removePaddings';

describe('node removePaddings', () => {
  test('Should keep other styles untouched', () => {
    const result = removePaddings({ style: { color: 'red' } });
    expect(result.style).toHaveProperty('color', 'red');
  });

  test('Should remove paddingTop', () => {
    const result = removePaddings({ style: { paddingTop: 10 } });
    expect(result.style).not.toHaveProperty('paddingTop');
  });

  test('Should remove paddingRight', () => {
    const result = removePaddings({ style: { paddingRight: 10 } });
    expect(result.style).not.toHaveProperty('paddingRight');
  });

  test('Should remove paddingBottom', () => {
    const result = removePaddings({ style: { paddingBottom: 10 } });
    expect(result.style).not.toHaveProperty('paddingBottom');
  });

  test('Should remove paddingLeft', () => {
    const result = removePaddings({ style: { paddingLeft: 10 } });
    expect(result.style).not.toHaveProperty('paddingLeft');
  });

  test('Should remove padding shorthand', () => {
    const result = removePaddings({ style: { padding: 10 } });
    expect(result.style).not.toHaveProperty('padding');
  });

  test('Should remove paddingHorizontal shorthand', () => {
    const result = removePaddings({ style: { paddingHorizontal: 10 } });
    expect(result.style).not.toHaveProperty('paddingHorizontal');
  });

  test('Should remove paddingVertical shorthand', () => {
    const result = removePaddings({ style: { paddingVertical: 10 } });
    expect(result.style).not.toHaveProperty('paddingVertical');
  });
});
