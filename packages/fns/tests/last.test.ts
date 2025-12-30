import { describe, expect, test } from 'vitest';

import last from '../src/last';

describe('last', () => {
  test('returns the last element of an array', () => {
    expect(last([1, 2, 3])).toBe(3);
    expect(last([1, 2])).toBe(2);
    expect(last([1])).toBe(1);
  });

  test('returns undefined for empty array', () => {
    expect(last([])).toBe(undefined);
  });

  test('returns the last character of a string', () => {
    expect(last('abc')).toBe('c');
    expect(last('ab')).toBe('b');
    expect(last('a')).toBe('a');
  });

  test('returns empty string for empty string', () => {
    expect(last('')).toBe('');
  });

  test('works with arrays of objects', () => {
    const obj1 = { id: 1 };
    const obj2 = { id: 2 };

    expect(last([obj1, obj2])).toBe(obj2);
  });

  test('works with arrays containing falsy values', () => {
    expect(last([1, 2, 0])).toBe(0);
    expect(last([1, 2, false])).toBe(false);
    expect(last([1, 2, null])).toBe(null);
    expect(last([1, 2, ''])).toBe('');
  });
});
