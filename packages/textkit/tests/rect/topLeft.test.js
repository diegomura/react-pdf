import empty from '../../src/rect/empty';
import topLeft from '../../src/rect/topLeft';

describe('rect topLeft operator', () => {
  test('should return zero point if no rect provided', () => {
    const coord = topLeft(null);
    expect(coord).toHaveProperty('x', 0);
    expect(coord).toHaveProperty('y', 0);
  });

  test('should return zero point if no rect provided', () => {
    const coord = topLeft(empty());
    expect(coord).toHaveProperty('x', 0);
    expect(coord).toHaveProperty('y', 0);
  });

  test('should return rect topLeft correctly', () => {
    const rect = { x: 2, y: 10, width: 4, height: 8 };
    const coord = topLeft(rect);

    expect(coord).toHaveProperty('x', 2);
    expect(coord).toHaveProperty('y', 10);
  });
});
