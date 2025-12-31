import { describe, expect, test } from 'vitest';

import empty from '../../src/rect/empty';
import area from '../../src/rect/area';

describe('rect area operator', () => {
  test('should return zero if no rect provided', () => {
    expect(area(null)).toEqual(0);
  });

  test('should return zero for empty rect', () => {
    expect(area(empty())).toEqual(0);
  });

  test('should return rect area correctly', () => {
    const rect = { x: 2, y: 10, width: 4, height: 8 };
    expect(area(rect)).toEqual(32);
  });

  test('should return area for rect at origin', () => {
    const rect = { x: 0, y: 0, width: 10, height: 5 };
    expect(area(rect)).toEqual(50);
  });

  test('should return zero for rect with zero width', () => {
    const rect = { x: 5, y: 5, width: 0, height: 10 };
    expect(area(rect)).toEqual(0);
  });

  test('should return zero for rect with zero height', () => {
    const rect = { x: 5, y: 5, width: 10, height: 0 };
    expect(area(rect)).toEqual(0);
  });

  test('should return area for square rect', () => {
    const rect = { x: 0, y: 0, width: 7, height: 7 };
    expect(area(rect)).toEqual(49);
  });
});
