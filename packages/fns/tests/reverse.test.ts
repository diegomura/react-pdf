import { describe, expect, test } from 'vitest';

import reverse from '../src/reverse';

describe('reverse', () => {
  test('reverses arrays', () => {
    expect(reverse([])).toEqual([]);
    expect(reverse([1])).toEqual([1]);
    expect(reverse([1, 2])).toEqual([2, 1]);
    expect(reverse([1, 2, 3])).toEqual([3, 2, 1]);
  });

  test('does not mutate the original array', () => {
    const original = [1, 2, 3];
    const result = reverse(original);

    expect(result).toEqual([3, 2, 1]);
    expect(original).toEqual([1, 2, 3]);
  });

  test('reverses array of strings', () => {
    expect(reverse(['a', 'b', 'c'])).toEqual(['c', 'b', 'a']);
  });

  test('reverses array of objects', () => {
    const obj1 = { id: 1 };
    const obj2 = { id: 2 };
    const obj3 = { id: 3 };

    expect(reverse([obj1, obj2, obj3])).toEqual([obj3, obj2, obj1]);
  });

  test('reverses array with falsy values', () => {
    expect(reverse([0, false, null, ''])).toEqual(['', null, false, 0]);
  });
});
