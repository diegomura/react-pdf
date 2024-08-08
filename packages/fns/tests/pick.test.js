import { describe, expect, test } from 'vitest';

import pick from '../src/pick';

describe('pick', () => {
  const obj = { a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, 1: 7 };

  test('copies the named properties of an object to the new object', () => {
    expect(pick(['a', 'c', 'f'], obj)).toEqual({ a: 1, c: 3, f: 6 });
  });

  test('handles numbers as properties', () => {
    expect(pick([1], obj)).toEqual({ 1: 7 });
  });

  test('ignores properties not included', () => {
    expect(pick(['a', 'c', 'g'], obj)).toEqual({ a: 1, c: 3 });
  });
});
