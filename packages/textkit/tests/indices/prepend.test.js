import prepend from '../../src/indices/prepend';

describe('indices prepend operator', () => {
  test('should prepend indices to empty string', () => {
    const result = prepend(2, []);
    expect(result).toEqual([0, 0]);
  });

  test('should return same empty array if zero passed', () => {
    const result = prepend(0, []);
    expect(result).toEqual([]);
  });

  test('should return same array if zero passed', () => {
    const result = prepend(0, [0, 1, 2]);
    expect(result).toEqual([0, 1, 2]);
  });

  test('should prepend correct amont of values', () => {
    const result = prepend(3, [0, 1, 2, 2]);
    expect(result).toEqual([0, 0, 0, 1, 2, 3, 3]);
  });
});
