import { describe, expect, test } from 'vitest';

import mapValues from '../src/mapValues';

describe('mapValues', () => {
  test('should apply function to each value', () => {
    const double = (x: number) => x * 2;
    const obj = { a: 1, b: 2, c: 3 };

    expect(mapValues(obj, double)).toEqual({ a: 2, b: 4, c: 6 });
  });

  test('should pass value, key, and index to the function', () => {
    const results: Array<{ value: number; key: string; index: number }> = [];
    const obj = { a: 1, b: 2 };

    mapValues(obj, (value, key, index) => {
      results.push({ value, key, index });
      return value;
    });

    expect(results).toEqual([
      { value: 1, key: 'a', index: 0 },
      { value: 2, key: 'b', index: 1 },
    ]);
  });

  test('should return empty object for empty input', () => {
    expect(mapValues({}, (x) => x)).toEqual({});
  });

  test('should not mutate the original object', () => {
    const original = { a: 1, b: 2 };
    const result = mapValues(original, (x) => x * 2);

    expect(result).toEqual({ a: 2, b: 4 });
    expect(original).toEqual({ a: 1, b: 2 });
  });

  test('should work with different value types', () => {
    const obj = { name: 'test', count: 5 };
    const toUpper = (x: any) => (typeof x === 'string' ? x.toUpperCase() : x);

    expect(mapValues(obj, toUpper)).toEqual({ name: 'TEST', count: 5 });
  });
});
