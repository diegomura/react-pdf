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
});
