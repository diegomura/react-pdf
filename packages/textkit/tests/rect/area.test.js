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
});
