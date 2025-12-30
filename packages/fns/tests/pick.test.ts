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

  test('returns empty object when keys array is empty', () => {
    expect(pick([], obj)).toEqual({});
  });

  test('returns empty object when object is empty', () => {
    expect(pick(['a', 'b'], {})).toEqual({});
  });

  test('picks single key', () => {
    expect(pick(['a'], obj)).toEqual({ a: 1 });
  });

  test('does not mutate the original object', () => {
    const original = { a: 1, b: 2 };
    const result = pick(['a'], original);

    expect(result).toEqual({ a: 1 });
    expect(original).toEqual({ a: 1, b: 2 });
  });

  test('picks keys with falsy values', () => {
    const objWithFalsy = { a: 0, b: false, c: '', d: null, e: undefined };

    expect(pick(['a', 'b', 'c', 'd', 'e'], objWithFalsy)).toEqual({
      a: 0,
      b: false,
      c: '',
      d: null,
      e: undefined,
    });
  });
});
