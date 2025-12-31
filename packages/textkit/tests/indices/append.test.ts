import { describe, expect, test } from 'vitest';

import append from '../../src/indices/append';

describe('indices append operator', () => {
  test('should append indices to empty string', () => {
    const result = append(2, []);
    expect(result).toEqual([0, 0]);
  });

  test('should return same empty array if zero passed', () => {
    const result = append(0, []);
    expect(result).toEqual([]);
  });

  test('should return same array if zero passed', () => {
    const result = append(0, [0, 1, 2]);
    expect(result).toEqual([0, 1, 2]);
  });

  test('should append correct amont of values', () => {
    const result = append(3, [0, 1, 2, 2]);
    expect(result).toEqual([0, 1, 2, 2, 3, 3, 3]);
  });

  test('should append single value to array', () => {
    const result = append(1, [0, 1, 2]);
    expect(result).toEqual([0, 1, 2, 3]);
  });

  test('should append to array with repeated values at end', () => {
    const result = append(2, [0, 0, 1, 1]);
    expect(result).toEqual([0, 0, 1, 1, 2, 2]);
  });

  test('should append single value to empty array', () => {
    const result = append(1, []);
    expect(result).toEqual([0]);
  });

  test('should append to single element array', () => {
    const result = append(2, [0]);
    expect(result).toEqual([0, 1, 1]);
  });

  test('should append large number of values', () => {
    const result = append(5, [0, 1]);
    expect(result).toEqual([0, 1, 2, 2, 2, 2, 2]);
  });
});
