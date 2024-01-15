import { describe, expect, test } from '@jest/globals';

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
});
