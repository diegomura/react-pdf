import empty from '../../src/rect/empty';
import maxX from '../../src/rect/maxX';

describe('rect maxX operator', () => {
  test('should return zero if no rect provided', () => {
    expect(maxX(null)).toBe(0);
  });

  test('should return zero if no rect provided', () => {
    expect(maxX(empty())).toBe(0);
  });

  test('should return rect maxX correctly', () => {
    const rect = { x: 2, y: 10, width: 4, height: 8 };
    expect(maxX(rect)).toBe(6);
  });
});
