import count from '../../src/utils/count';

describe('utils count operator', () => {
  test('should return 0 if value not present in list', () => {
    expect(count(1, [2, 3, 4])).toBe(0);
  });

  test('should return 1 if value only present once in list', () => {
    expect(count(3, [2, 3, 4])).toBe(1);
  });

  test('should return total appearences of value in list', () => {
    expect(count(3, [2, 3, 4, 3, 5, 3])).toBe(3);
  });
});
