import { describe, expect, test } from 'vitest';

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

  test('should return false when only x differs', () => {
    const rectA = { x: 3, y: 6, width: 10, height: 20 };
    const rectB = { x: 4, y: 6, width: 10, height: 20 };

    expect(equals(rectA, rectB)).toBeFalsy();
  });

  test('should return false when only y differs', () => {
    const rectA = { x: 3, y: 6, width: 10, height: 20 };
    const rectB = { x: 3, y: 7, width: 10, height: 20 };

    expect(equals(rectA, rectB)).toBeFalsy();
  });

  test('should return false when only width differs', () => {
    const rectA = { x: 3, y: 6, width: 10, height: 20 };
    const rectB = { x: 3, y: 6, width: 11, height: 20 };

    expect(equals(rectA, rectB)).toBeFalsy();
  });

  test('should return false when only height differs', () => {
    const rectA = { x: 3, y: 6, width: 10, height: 20 };
    const rectB = { x: 3, y: 6, width: 10, height: 21 };

    expect(equals(rectA, rectB)).toBeFalsy();
  });

  test('should return true for two empty rects at origin', () => {
    const rectA = { x: 0, y: 0, width: 0, height: 0 };
    const rectB = { x: 0, y: 0, width: 0, height: 0 };

    expect(equals(rectA, rectB)).toBeTruthy();
  });

  test('should return true when comparing same rect reference', () => {
    const rect = { x: 3, y: 6, width: 10, height: 20 };

    expect(equals(rect, rect)).toBeTruthy();
  });
});
