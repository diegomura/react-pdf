import { describe, expect, test } from 'vitest';

import adjust from '../src/adjust';

const add = (v: number) => v + 1;

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

  test('returns the original empty array when given empty array', () => {
    const empty: number[] = [];
    expect(adjust(0, add, empty)).toBe(empty);
  });

  test('adjusts single element array', () => {
    expect(adjust(0, add, [5])).toEqual([6]);
  });

  test('adjusts first element with index 0', () => {
    expect(adjust(0, add, [1, 2, 3])).toEqual([2, 2, 3]);
  });

  test('adjusts last element with positive index', () => {
    expect(adjust(3, add, [1, 2, 3, 4])).toEqual([1, 2, 3, 5]);
  });

  test('adjusts last element with index -1', () => {
    expect(adjust(-1, add, [1, 2, 3, 4])).toEqual([1, 2, 3, 5]);
  });

  test('adjusts first element with negative index equal to length', () => {
    expect(adjust(-4, add, [1, 2, 3, 4])).toEqual([2, 2, 3, 4]);
  });

  test('works with string arrays', () => {
    const toUpper = (s: string) => s.toUpperCase();
    expect(adjust(1, toUpper, ['a', 'b', 'c'])).toEqual(['a', 'B', 'c']);
  });

  test('works with object arrays', () => {
    const increment = (obj: { value: number }) => ({ value: obj.value + 1 });
    const arr = [{ value: 1 }, { value: 2 }, { value: 3 }];
    expect(adjust(1, increment, arr)).toEqual([
      { value: 1 },
      { value: 3 },
      { value: 3 },
    ]);
  });
});
