import { describe, expect, test } from 'vitest';

import compose from '../src/compose';

describe('compose', () => {
  test('performs right-to-left function composition', () => {
    const map = (fn: any) => (collection: number[]) => collection.map(fn);
    const multiply = (a: number) => (b: number) => a * b;
    const f = compose(map, multiply, parseInt);

    expect(f('10')([1, 2, 3])).toEqual([10, 20, 30]);
    expect(f('10', 2)([1, 2, 3])).toEqual([2, 4, 6]);
  });
});
