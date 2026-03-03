import { describe, expect, test } from 'vitest';

import crop from '../../src/rect/crop';

describe('rect crop operator', () => {
  test('should return full rect when cropping with height 0', () => {
    const rect = { x: 10, y: 10, width: 90, height: 110 };
    const result = crop(0, rect);

    expect(result).toEqual({ x: 10, y: 10, width: 90, height: 110 });
  });

  test('should crop upper section correctly', () => {
    const rect = { x: 10, y: 10, width: 90, height: 110 };
    const result = crop(20, rect);

    expect(result).toEqual({ x: 10, y: 30, width: 90, height: 90 });
  });

  test('should return empty height rect when cropping full height', () => {
    const rect = { x: 10, y: 10, width: 90, height: 110 };
    const result = crop(110, rect);

    expect(result).toEqual({ x: 10, y: 120, width: 90, height: 0 });
  });

  test('should handle rect at origin', () => {
    const rect = { x: 0, y: 0, width: 100, height: 50 };
    const result = crop(25, rect);

    expect(result).toEqual({ x: 0, y: 25, width: 100, height: 25 });
  });

  test('should handle cropping half the height', () => {
    const rect = { x: 5, y: 5, width: 40, height: 100 };
    const result = crop(50, rect);

    expect(result).toEqual({ x: 5, y: 55, width: 40, height: 50 });
  });
});
