import { describe, expect, test } from 'vitest';

import without from '../src/without';

describe('without', () => {
  const array = ['a', 'b', 'c', 'd', 'e', 'f', 1];

  test('filters passed keys', () => {
    expect(without(['a', 'c', 'f'], array)).toEqual(['b', 'd', 'e', 1]);
  });

  test('handles numbers as keys', () => {
    expect(without([1], array)).toEqual(['a', 'b', 'c', 'd', 'e', 'f']);
  });

  test('ignores keys not included', () => {
    expect(without(['g'], array)).toEqual(array);
  });

  test('returns copy of array when keys is empty', () => {
    expect(without([], array)).toEqual(array);
  });

  test('returns empty array when array is empty', () => {
    expect(without(['a', 'b'], [])).toEqual([]);
  });

  test('returns empty array when all values are removed', () => {
    expect(without([1, 2, 3], [1, 2, 3])).toEqual([]);
  });

  test('does not mutate the original array', () => {
    const original = [1, 2, 3, 4];
    const result = without([2, 4], original);

    expect(result).toEqual([1, 3]);
    expect(original).toEqual([1, 2, 3, 4]);
  });

  test('removes all occurrences of duplicate values', () => {
    expect(without([2], [1, 2, 3, 2, 4, 2])).toEqual([1, 3, 4]);
  });

  test('handles falsy values', () => {
    expect(without([0, false], [0, 1, false, 2, null])).toEqual([1, 2, null]);
  });
});
