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

  test('should return maxY for rect at origin', () => {
    const rect = { x: 0, y: 0, width: 100, height: 50 };
    expect(maxY(rect)).toBe(50);
  });

  test('should return y for rect with zero height', () => {
    const rect = { x: 10, y: 25, width: 20, height: 0 };
    expect(maxY(rect)).toBe(25);
  });
});
