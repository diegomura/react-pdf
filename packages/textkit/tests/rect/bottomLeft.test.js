import { describe, expect, test } from 'vitest';

import empty from '../../src/rect/empty';
import bottomLeft from '../../src/rect/bottomLeft';

describe('rect bottomLeft operator', () => {
  test('should return zero point if no rect provided', () => {
    const coord = bottomLeft(null);
    expect(coord).toHaveProperty('x', 0);
    expect(coord).toHaveProperty('y', 0);
  });

  test('should return zero point if no rect provided', () => {
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
});
