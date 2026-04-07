import { describe, expect, test } from 'vitest';

import empty from '../../src/rect/empty';
import bottomRight from '../../src/rect/bottomRight';

describe('rect bottomRight operator', () => {
  test('should return zero point if no rect provided', () => {
    const coord = bottomRight(null);
    expect(coord).toHaveProperty('x', 0);
    expect(coord).toHaveProperty('y', 0);
  });

  test('should return zero point if empty rect provided', () => {
    const coord = bottomRight(empty());
    expect(coord).toHaveProperty('x', 0);
    expect(coord).toHaveProperty('y', 0);
  });

  test('should return rect bottomRight correctly', () => {
    const rect = { x: 2, y: 10, width: 4, height: 8 };
    const coord = bottomRight(rect);

    expect(coord).toHaveProperty('x', 6);
    expect(coord).toHaveProperty('y', 18);
  });

  test('should return bottomRight for rect at origin', () => {
    const rect = { x: 0, y: 0, width: 100, height: 50 };
    const coord = bottomRight(rect);

    expect(coord).toHaveProperty('x', 100);
    expect(coord).toHaveProperty('y', 50);
  });

  test('should return bottomRight for rect with zero dimensions', () => {
    const rect = { x: 5, y: 10, width: 0, height: 0 };
    const coord = bottomRight(rect);

    expect(coord).toHaveProperty('x', 5);
    expect(coord).toHaveProperty('y', 10);
  });
});
