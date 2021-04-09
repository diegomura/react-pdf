import intersects from '../../src/rect/intersects';

describe('rect intersects operator', () => {
  test('should return true for intersecting rect', () => {
    const rect1 = { x: 5, y: 5, width: 5, height: 10 };
    const rect2 = { x: 7, y: 10, width: 10, height: 10 };

    expect(intersects(rect1, rect2)).toBeTruthy();
  });

  test('should return false for non-intersecting rect', () => {
    const rect1 = { x: 5, y: 5, width: 5, height: 10 };
    const rect2 = { x: 20, y: 20, width: 5, height: 5 };

    expect(intersects(rect1, rect2)).toBeFalsy();
  });
});
