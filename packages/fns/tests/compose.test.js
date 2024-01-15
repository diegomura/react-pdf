import { describe, expect, test } from '@jest/globals';

import compose from '../src/compose';

describe('compose', () => {
  test('performs right-to-left function composition', () => {
    const multiply = a => b => a * b;
    const map = fn => collection => collection.map(fn);
    const f = compose(map, multiply, parseInt);

    expect(f('10')([1, 2, 3])).toEqual([10, 20, 30]);
    expect(f('10', 2)([1, 2, 3])).toEqual([2, 4, 6]);
  });
});
