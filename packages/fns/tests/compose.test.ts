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

  test('should compose two functions', () => {
    const double = (x: number) => x * 2;
    const increment = (x: number) => x + 1;

    // compose(double, increment)(5) = double(increment(5)) = double(6) = 12
    expect(compose(double, increment)(5)).toBe(12);
  });

  test('should compose three functions', () => {
    const double = (x: number) => x * 2;
    const increment = (x: number) => x + 1;
    const square = (x: number) => x * x;

    // compose(double, increment, square)(3) = double(increment(square(3))) = double(increment(9)) = double(10) = 20
    expect(compose(double, increment, square)(3)).toBe(20);
  });

  test('should work with single function', () => {
    const double = (x: number) => x * 2;

    expect(compose(double)(5)).toBe(10);
  });

  test('should work with functions that change types', () => {
    const toString = (x: number) => `Value: ${x}`;
    const double = (x: number) => x * 2;

    expect(compose(toString, double)(5)).toBe('Value: 10');
  });
});
