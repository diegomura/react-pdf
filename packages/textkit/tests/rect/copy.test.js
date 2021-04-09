import copy from '../../src/rect/copy';

describe('rect copy operator', () => {
  test('should create copy of rect', () => {
    const rect = { x: 2, y: 4, width: 20, height: 10 };
    const copied = copy(rect);

    expect(copied).not.toBe(rect);
    expect(copied).toHaveProperty('x', 2);
    expect(copied).toHaveProperty('y', 4);
    expect(copied).toHaveProperty('width', 20);
    expect(copied).toHaveProperty('height', 10);
  });
});
