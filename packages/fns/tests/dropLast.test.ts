import { describe, expect, test } from 'vitest';

import dropLast from '../src/dropLast';

describe('dropLast', () => {
  test('skips the last element from a list, returning the remainder', () => {
    expect(dropLast(['a', 'b', 'c', 'd'])).toEqual(['a', 'b', 'c']);
  });

  test('returns an empty array if passed 1 element array', () => {
    expect(dropLast(['a'])).toEqual([]);
  });

  test('returns an empty array if passed empty array', () => {
    expect(dropLast([])).toEqual([]);
  });

  test('can operate on strings', () => {
    expect(dropLast('react-pdf')).toEqual('react-pd');
  });

  test('returns empty string if passed single character string', () => {
    expect(dropLast('a')).toEqual('');
  });

  test('returns empty string if passed empty string', () => {
    expect(dropLast('')).toEqual('');
  });

  test('should not mutate the original array', () => {
    const original = [1, 2, 3];
    const result = dropLast(original);

    expect(result).toEqual([1, 2]);
    expect(original).toEqual([1, 2, 3]);
  });
});
