import { describe, expect, test } from 'vitest';

import append from '../../src/indices/append';

describe('indices append operator', () => {
  test('should append indices to empty string', () => {
    const result = append(2, []);
    expect(result).toEqual([0, 0]);
  });

  test('should return same empty array if zero passed', () => {
    const result = append(0, []);
    expect(result).toEqual([]);
  });

  test('should return same array if zero passed', () => {
    const result = append(0, [0, 1, 2]);
    expect(result).toEqual([0, 1, 2]);
  });

  test('should append correct amont of values', () => {
    const result = append(3, [0, 1, 2, 2]);
    expect(result).toEqual([0, 1, 2, 2, 3, 3, 3]);
  });
});
