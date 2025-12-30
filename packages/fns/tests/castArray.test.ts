import { describe, expect, test } from 'vitest';

import castArray from '../src/castArray';

describe('castArray', () => {
  test('should return [undefined] for undefined', () => {
    expect(castArray(undefined)).toEqual([undefined]);
  });

  test('should return [null] for null', () => {
    expect(castArray(null)).toEqual([null]);
  });

  test('should cast passed value in an array', () => {
    expect(castArray('test')).toEqual(['test']);
  });

  test('should return array if passed array', () => {
    expect(castArray(['reactpdf'])).toEqual(['reactpdf']);
  });

  test('should return empty array if passed empty array', () => {
    expect(castArray([])).toEqual([]);
  });

  test('should cast number in an array', () => {
    expect(castArray(42)).toEqual([42]);
  });

  test('should cast object in an array', () => {
    const obj = { key: 'value' };
    expect(castArray(obj)).toEqual([obj]);
  });

  test('should return same array reference if passed array', () => {
    const arr = [1, 2, 3];
    expect(castArray(arr)).toBe(arr);
  });
});
