import { describe, expect, test } from 'vitest';

import isNil from '../src/isNil';

describe('isNil', () => {
  test('should return true for null', () => {
    expect(isNil(null)).toBe(true);
  });

  test('should return true for undefined', () => {
    expect(isNil(undefined)).toBe(true);
  });

  test('should return false for falsy non-nil values', () => {
    expect(isNil(0)).toBe(false);
    expect(isNil('')).toBe(false);
    expect(isNil(false)).toBe(false);
    expect(isNil(NaN)).toBe(false);
  });

  test('should return false for objects and arrays', () => {
    expect(isNil([])).toBe(false);
    expect(isNil({})).toBe(false);
  });
});
