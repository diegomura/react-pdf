import { describe, expect, test } from '@jest/globals';

import equals from '../../src/rect/equals';

describe('rect equals operator', () => {
  test('should return false for different rects', () => {
    const rectA = { x: 3, y: 6, width: 10, height: 20 };
    const rectB = { x: 2, y: 5, width: 12, height: 218 };

    expect(equals(rectA, rectB)).toBeFalsy();
  });

  test('should return true for equal rects', () => {
    const rectA = { x: 3, y: 6, width: 10, height: 20 };
    const rectB = { x: 3, y: 6, width: 10, height: 20 };

    expect(equals(rectA, rectB)).toBeTruthy();
  });
});
