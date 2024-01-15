import { describe, expect, test } from 'vitest';

import isNumber from '../../src/utils/isNumber';

describe('utils isNumber operator', () => {
  test('should return true for number argument', () => {
    expect(isNumber(3)).toBeTruthy();
  });

  test('should return true for float argument', () => {
    expect(isNumber(3.6)).toBeTruthy();
  });

  test('should return false for string argument', () => {
    expect(isNumber('not a number')).toBeFalsy();
  });

  test('should return false for true argument', () => {
    expect(isNumber(true)).toBeFalsy();
  });

  test('should return false for false argument', () => {
    expect(isNumber(false)).toBeFalsy();
  });

  test('should return false for object argument', () => {
    expect(isNumber({ foo: 'baz' })).toBeFalsy();
  });
});
