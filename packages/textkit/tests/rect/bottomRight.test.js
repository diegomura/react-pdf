import { describe, expect, test } from '@jest/globals';

import empty from '../../src/rect/empty';
import bottomRight from '../../src/rect/bottomRight';

describe('rect bottomRight operator', () => {
  test('should return zero point if no rect provided', () => {
    const coord = bottomRight(null);
    expect(coord).toHaveProperty('x', 0);
    expect(coord).toHaveProperty('y', 0);
  });

  test('should return zero point if no rect provided', () => {
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
});
