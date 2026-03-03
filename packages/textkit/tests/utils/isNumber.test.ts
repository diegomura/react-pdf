import { describe, expect, test } from 'vitest';

import isNumber from '../../src/utils/isNumber';

describe('utils isNumber operator', () => {
  test('should return true for number argument', () => {
    expect(isNumber(3)).toBeTruthy();
  });

  test('should return true for float argument', () => {
    expect(isNumber(3.6)).toBeTruthy();
  });

  test('should return true for zero', () => {
    expect(isNumber(0)).toBeTruthy();
  });

  test('should return true for negative number', () => {
    expect(isNumber(-5)).toBeTruthy();
  });

  test('should return true for NaN', () => {
    expect(isNumber(NaN)).toBeTruthy();
  });

  test('should return true for Infinity', () => {
    expect(isNumber(Infinity)).toBeTruthy();
  });

  test('should return true for negative Infinity', () => {
    expect(isNumber(-Infinity)).toBeTruthy();
  });

  test('should return false for string argument', () => {
    expect(isNumber('not a number')).toBeFalsy();
  });

  test('should return false for numeric string', () => {
    expect(isNumber('123')).toBeFalsy();
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

  test('should return false for null', () => {
    expect(isNumber(null)).toBeFalsy();
  });

  test('should return false for undefined', () => {
    expect(isNumber(undefined)).toBeFalsy();
  });

  test('should return false for array', () => {
    expect(isNumber([1, 2, 3])).toBeFalsy();
  });

  test('should return false for empty array', () => {
    expect(isNumber([])).toBeFalsy();
  });

  test('should return false for function', () => {
    expect(isNumber(() => 5)).toBeFalsy();
  });
});
