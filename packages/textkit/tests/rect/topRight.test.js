import empty from '../../src/rect/empty';
import topRight from '../../src/rect/topRight';

describe('rect topRight operator', () => {
  test('should return zero point if no rect provided', () => {
    const coord = topRight(null);
    expect(coord).toHaveProperty('x', 0);
    expect(coord).toHaveProperty('y', 0);
  });

  test('should return zero point if no rect provided', () => {
    const coord = topRight(empty());
    expect(coord).toHaveProperty('x', 0);
    expect(coord).toHaveProperty('y', 0);
  });

  test('should return rect topRight correctly', () => {
    const rect = { x: 2, y: 10, width: 4, height: 8 };
    const coord = topRight(rect);

    expect(coord).toHaveProperty('x', 6);
    expect(coord).toHaveProperty('y', 10);
  });
});
