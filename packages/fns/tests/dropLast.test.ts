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
});
