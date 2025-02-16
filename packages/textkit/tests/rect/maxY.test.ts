import { describe, expect, test } from 'vitest';

import empty from '../../src/rect/empty';
import maxY from '../../src/rect/maxY';

describe('rect maxY operator', () => {
  test('should return zero if no rect provided', () => {
    expect(maxY(null)).toBe(0);
  });

  test('should return zero if empty rect provided', () => {
    expect(maxY(empty())).toBe(0);
  });

  test('should return rect maxY correctly', () => {
    const rect = { x: 2, y: 10, width: 4, height: 8 };
    expect(maxY(rect)).toBe(18);
  });
});
