import getOrigin from '../../src/node/getOrigin';

describe('node getOrigin', () => {
  test('Should return empty object for node without box', () => {
    const result = getOrigin({});

    expect(result).toEqual({});
  });

  test('Should return centered origin by default', () => {
    const result = getOrigin({
      box: { top: 50, left: 100, width: 300, height: 400 },
    });

    expect(result).toHaveProperty('left', 250);
    expect(result).toHaveProperty('left', 250);
  });

  test('Should return origin adjusted by fixed values', () => {
    const result = getOrigin({
      box: { top: 50, left: 100, width: 300, height: 400 },
      style: { transformOriginX: 100, transformOriginY: 50 },
    });

    expect(result).toHaveProperty('left', 200);
    expect(result).toHaveProperty('top', 100);
  });

  test('Should return origin adjusted by percent values', () => {
    const result = getOrigin({
      box: { top: 50, left: 100, width: 300, height: 400 },
      style: { transformOriginX: '20%', transformOriginY: '70%' },
    });

    expect(result).toHaveProperty('left', 160);
    expect(result).toHaveProperty('top', 330);
  });
});
