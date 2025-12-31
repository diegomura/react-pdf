import { describe, expect, test } from 'vitest';

import normalizeArray from '../../src/indices/normalize';

describe('indices normalizeArray operator', () => {
  test('should return empty array for empty array', () => {
    expect(normalizeArray([])).toEqual([]);
  });

  test('should normalize consecutive numbers', () => {
    const list = [2, 3, 4];

    expect(normalizeArray(list)).toEqual([0, 1, 2]);
  });

  test('should normalize consecutive numbers starting on zero', () => {
    const list = [0, 1, 2];

    expect(normalizeArray(list)).toEqual([0, 1, 2]);
  });

  test('should normalize non-consecutive numbers', () => {
    const list = [2, 5, 8];

    expect(normalizeArray(list)).toEqual([0, 3, 6]);
  });

  test('should normalize ascending non-consecutive numbers starting on zero', () => {
    const list = [0, 3, 8];

    expect(normalizeArray(list)).toEqual([0, 3, 8]);
  });

  test('should normalize single element array', () => {
    const list = [5];

    expect(normalizeArray(list)).toEqual([0]);
  });

  test('should normalize single element zero', () => {
    const list = [0];

    expect(normalizeArray(list)).toEqual([0]);
  });

  test('should normalize negative numbers', () => {
    const list = [-3, -2, -1];

    expect(normalizeArray(list)).toEqual([0, 1, 2]);
  });

  test('should normalize mixed negative and positive numbers', () => {
    const list = [-2, 0, 2];

    expect(normalizeArray(list)).toEqual([0, 2, 4]);
  });

  test('should normalize large starting number', () => {
    const list = [100, 101, 102];

    expect(normalizeArray(list)).toEqual([0, 1, 2]);
  });

  test('should normalize array with repeated values', () => {
    const list = [5, 5, 6, 6];

    expect(normalizeArray(list)).toEqual([0, 0, 1, 1]);
  });

  test('should normalize descending numbers', () => {
    const list = [10, 8, 6];

    expect(normalizeArray(list)).toEqual([0, -2, -4]);
  });
});
