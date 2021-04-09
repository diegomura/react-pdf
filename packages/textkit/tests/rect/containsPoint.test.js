import containsPoint from '../../src/rect/containsPoint';

describe('rect containsPoint operator', () => {
  test('should containsPoint be true for inner point', () => {
    const rect = { x: 5, y: 5, width: 5, height: 10 };
    const point = { x: 10, y: 10 };

    expect(containsPoint(rect, point)).toBeTruthy();
  });

  test('should containsPoint be true for edge point', () => {
    const rect = { x: 5, y: 5, width: 5, height: 10 };
    const point = { x: 5, y: 7 };

    expect(containsPoint(rect, point)).toBeTruthy();
  });

  test('should containsPoint be false for outside point', () => {
    const rect = { x: 5, y: 5, width: 5, height: 10 };
    const point = { x: 20, y: 20 };

    expect(containsPoint(rect, point)).toBeFalsy();
  });
});
