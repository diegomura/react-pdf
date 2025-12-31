import { describe, expect, test } from 'vitest';

import empty from '../../src/rect/empty';
import bottomLeft from '../../src/rect/bottomLeft';

describe('rect bottomLeft operator', () => {
  test('should return zero point if no rect provided', () => {
    const coord = bottomLeft(null);
    expect(coord).toHaveProperty('x', 0);
    expect(coord).toHaveProperty('y', 0);
  });

  test('should return zero point if empty rect provided', () => {
    const coord = bottomLeft(empty());
    expect(coord).toHaveProperty('x', 0);
    expect(coord).toHaveProperty('y', 0);
  });

  test('should return rect bottomLeft correctly', () => {
    const rect = { x: 2, y: 10, width: 4, height: 8 };
    const coord = bottomLeft(rect);

    expect(coord).toHaveProperty('x', 2);
    expect(coord).toHaveProperty('y', 18);
  });

  test('should return bottomLeft for rect at origin', () => {
    const rect = { x: 0, y: 0, width: 100, height: 50 };
    const coord = bottomLeft(rect);

    expect(coord).toHaveProperty('x', 0);
    expect(coord).toHaveProperty('y', 50);
  });

  test('should return bottomLeft for rect with zero height', () => {
    const rect = { x: 5, y: 10, width: 20, height: 0 };
    const coord = bottomLeft(rect);

    expect(coord).toHaveProperty('x', 5);
    expect(coord).toHaveProperty('y', 10);
  });
});
