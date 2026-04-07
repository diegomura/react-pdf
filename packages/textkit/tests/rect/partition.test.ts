import { describe, expect, test } from 'vitest';

import partition from '../../src/rect/partition';

describe('rect partition operator', () => {
  test('should return empty rect if height 0', () => {
    const target = { x: 10, y: 10, width: 90, height: 110 };
    const result = partition(target, 0);

    expect(result).toEqual([
      { x: 10, y: 10, width: 90, height: 0 },
      { x: 10, y: 10, width: 90, height: 110 },
    ]);
  });

  test('should return correct partition', () => {
    const target = { x: 10, y: 10, width: 90, height: 110 };
    const result = partition(target, 20);

    expect(result).toEqual([
      { x: 10, y: 10, width: 90, height: 20 },
      { x: 10, y: 30, width: 90, height: 90 },
    ]);
  });

  test('should return full rect in second partition when height equals rect height', () => {
    const target = { x: 10, y: 10, width: 90, height: 110 };
    const result = partition(target, 110);

    expect(result).toEqual([
      { x: 10, y: 10, width: 90, height: 110 },
      { x: 10, y: 120, width: 90, height: 0 },
    ]);
  });

  test('should handle rect at origin', () => {
    const target = { x: 0, y: 0, width: 100, height: 50 };
    const result = partition(target, 25);

    expect(result).toEqual([
      { x: 0, y: 0, width: 100, height: 25 },
      { x: 0, y: 25, width: 100, height: 25 },
    ]);
  });

  test('should partition at half height', () => {
    const target = { x: 5, y: 5, width: 40, height: 100 };
    const result = partition(target, 50);

    expect(result).toEqual([
      { x: 5, y: 5, width: 40, height: 50 },
      { x: 5, y: 55, width: 40, height: 50 },
    ]);
  });
});
