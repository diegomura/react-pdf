import removeMargins from '../../src/node/removeMargins';

describe('node removeMargins', () => {
  test('Should keep other styles untouched', () => {
    const result = removeMargins({ style: { color: 'red' } });
    expect(result.style).toHaveProperty('color', 'red');
  });

  test('Should remove marginTop', () => {
    const result = removeMargins({ style: { marginTop: 10 } });
    expect(result.style).not.toHaveProperty('marginTop');
  });

  test('Should remove marginRight', () => {
    const result = removeMargins({ style: { marginRight: 10 } });
    expect(result.style).not.toHaveProperty('marginRight');
  });

  test('Should remove marginBottom', () => {
    const result = removeMargins({ style: { marginBottom: 10 } });
    expect(result.style).not.toHaveProperty('marginBottom');
  });

  test('Should remove marginLeft', () => {
    const result = removeMargins({ style: { marginLeft: 10 } });
    expect(result.style).not.toHaveProperty('marginLeft');
  });

  test('Should remove margin shorthand', () => {
    const result = removeMargins({ style: { margin: 10 } });
    expect(result.style).not.toHaveProperty('margin');
  });

  test('Should remove marginHorizontal shorthand', () => {
    const result = removeMargins({ style: { marginHorizontal: 10 } });
    expect(result.style).not.toHaveProperty('marginHorizontal');
  });

  test('Should remove marginVertical shorthand', () => {
    const result = removeMargins({ style: { marginVertical: 10 } });
    expect(result.style).not.toHaveProperty('marginVertical');
  });
});
