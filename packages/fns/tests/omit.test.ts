import { describe, expect, test } from 'vitest';

import omit from '../src/omit';

describe('omit', () => {
  const obj = { a: 1, b: 2, c: 3 };

  test('copies an object omitting the listed property', () => {
    expect(omit('a', obj)).toEqual({ b: 2, c: 3 });
  });

  test('copies an object omitting the listed properties', () => {
    expect(omit(['a', 'c'], obj)).toEqual({ b: 2 });
  });

  test('returns copy of object when keys array is empty', () => {
    expect(omit([], obj)).toEqual({ a: 1, b: 2, c: 3 });
  });

  test('returns copy of object when key does not exist', () => {
    expect(omit('nonexistent', obj)).toEqual({ a: 1, b: 2, c: 3 });
    expect(omit(['x', 'y'], obj)).toEqual({ a: 1, b: 2, c: 3 });
  });

  test('returns empty object when all keys are omitted', () => {
    expect(omit(['a', 'b', 'c'], obj)).toEqual({});
  });

  test('does not mutate the original object', () => {
    const original = { a: 1, b: 2 };
    const result = omit('a', original);

    expect(result).toEqual({ b: 2 });
    expect(original).toEqual({ a: 1, b: 2 });
  });

  test('returns empty object when given empty object', () => {
    expect(omit('a', {})).toEqual({});
    expect(omit(['a', 'b'], {})).toEqual({});
  });
});
