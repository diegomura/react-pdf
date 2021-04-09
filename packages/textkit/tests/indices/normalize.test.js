import normalizeArray from '../../src/indices/normalize';

describe('indices normalizeArray operator', () => {
  test('should return empty array for empty array', () => {
    expect(normalizeArray([])).toEqual([]);
  });

  test('should normalize consecutive numbers', () => {
    const list = [2, 3, 4];

    expect(normalizeArray(list)).toEqual([0, 1, 2]);
  });

  test('should normalize consecutive numbers starting on zero', () => {
    const list = [0, 1, 2];

    expect(normalizeArray(list)).toEqual([0, 1, 2]);
  });

  test('should normalize non-consecutive numbers', () => {
    const list = [2, 5, 8];

    expect(normalizeArray(list)).toEqual([0, 3, 6]);
  });

  test('should normalize consecutive numbers starting on zero', () => {
    const list = [0, 3, 8];

    expect(normalizeArray(list)).toEqual([0, 3, 8]);
  });
});
