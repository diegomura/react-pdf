import { describe, expect, test } from '@jest/globals';

import adjust from '../src/adjust';

const add = v => v + 1;

describe('adjust', () => {
  test('applies the given function to the value at the given index of the supplied array', () => {
    const expected = [0, 1, 3, 3];
    const result = adjust(2, add, [0, 1, 2, 3]);

    expect(result).toEqual(expected);
  });

  test('offsets negative indexes from the end of the array', () => {
    const expected = [0, 2, 2, 3];
    const result = adjust(-3, add, [0, 1, 2, 3]);

    expect(result).toEqual(expected);
  });

  test('returns the original array if the supplied index is out of bounds', () => {
    const expected = [0, 1, 2, 3];

    expect(adjust(4, add, expected)).toBe(expected);
    expect(adjust(-5, add, expected)).toBe(expected);
  });

  test('does not mutate the original array', () => {
    const expected = [0, 1, 2, 3];
    adjust(2, add, expected);
    expect([0, 1, 2, 3]).toEqual(expected);
  });
});
