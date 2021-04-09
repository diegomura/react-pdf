import containsRect from '../../src/rect/containsRect';

describe('rect containsRect operator', () => {
  test('should contains be true for containing rect', () => {
    const rect1 = { x: 5, y: 5, width: 10, height: 10 };
    const rect2 = { x: 10, y: 10, width: 3, height: 3 };

    expect(containsRect(rect1, rect2)).toBeTruthy();
  });

  test('should contains be false for non-containing intersecting rect', () => {
    const rect1 = { x: 5, y: 5, width: 5, height: 10 };
    const rect2 = { x: 7, y: 10, width: 10, height: 10 };

    expect(containsRect(rect1, rect2)).toBeFalsy();
  });

  test('should contains be false for non-containing non-intersec. rect', () => {
    const rect1 = { x: 5, y: 5, width: 5, height: 10 };
    const rect2 = { x: 20, y: 20, width: 10, height: 10 };

    expect(containsRect(rect1, rect2)).toBeFalsy();
  });
});
