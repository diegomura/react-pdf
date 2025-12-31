import { describe, expect, test } from 'vitest';

import prepend from '../../src/indices/prepend';

describe('indices prepend operator', () => {
  test('should prepend indices to empty string', () => {
    const result = prepend(2, []);
    expect(result).toEqual([0, 0]);
  });

  test('should return same empty array if zero passed', () => {
    const result = prepend(0, []);
    expect(result).toEqual([]);
  });

  test('should return same array if zero passed', () => {
    const result = prepend(0, [0, 1, 2]);
    expect(result).toEqual([0, 1, 2]);
  });

  test('should prepend correct amont of values', () => {
    const result = prepend(3, [0, 1, 2, 2]);
    expect(result).toEqual([0, 0, 0, 1, 2, 3, 3]);
  });

  test('should prepend single value to array', () => {
    const result = prepend(1, [0, 1, 2]);
    expect(result).toEqual([0, 1, 2, 3]);
  });

  test('should prepend single value to empty array', () => {
    const result = prepend(1, []);
    expect(result).toEqual([0]);
  });

  test('should prepend to single element array', () => {
    const result = prepend(2, [0]);
    expect(result).toEqual([0, 0, 1]);
  });

  test('should prepend to array with repeated values', () => {
    const result = prepend(2, [0, 0, 1, 1]);
    expect(result).toEqual([0, 0, 1, 1, 2, 2]);
  });

  test('should prepend large number of values', () => {
    const result = prepend(5, [0, 1]);
    expect(result).toEqual([0, 0, 0, 0, 0, 1, 2]);
  });
});
