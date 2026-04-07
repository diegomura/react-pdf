import { describe, expect, test } from 'vitest';

import empty from '../../src/rect/empty';
import maxX from '../../src/rect/maxX';

describe('rect maxX operator', () => {
  test('should return zero if no rect provided', () => {
    expect(maxX(null)).toBe(0);
  });

  test('should return zero if empty rect provided', () => {
    expect(maxX(empty())).toBe(0);
  });

  test('should return rect maxX correctly', () => {
    const rect = { x: 2, y: 10, width: 4, height: 8 };
    expect(maxX(rect)).toBe(6);
  });

  test('should return maxX for rect at origin', () => {
    const rect = { x: 0, y: 0, width: 100, height: 50 };
    expect(maxX(rect)).toBe(100);
  });

  test('should return x for rect with zero width', () => {
    const rect = { x: 15, y: 10, width: 0, height: 20 };
    expect(maxX(rect)).toBe(15);
  });
});
