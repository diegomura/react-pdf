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
});
