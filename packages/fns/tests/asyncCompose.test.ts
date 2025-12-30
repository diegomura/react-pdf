import { describe, expect, test } from 'vitest';

import asyncCompose from '../src/asyncCompose';

describe('asyncCompose', () => {
  test('should compose two async functions', async () => {
    const double = async (x: number) => x * 2;
    const increment = async (x: number) => x + 1;

    // asyncCompose(double, increment)(5) = double(increment(5)) = double(6) = 12
    const result = await asyncCompose(double, increment)(5);
    expect(result).toBe(12);
  });

  test('should compose three async functions', async () => {
    const double = async (x: number) => x * 2;
    const increment = async (x: number) => x + 1;
    const square = async (x: number) => x * x;

    // asyncCompose(double, increment, square)(3) = double(increment(square(3))) = double(increment(9)) = double(10) = 20
    const result = await asyncCompose(double, increment, square)(3);
    expect(result).toBe(20);
  });

  test('should work with single async function', async () => {
    const double = async (x: number) => x * 2;

    const result = await asyncCompose(double)(5);
    expect(result).toBe(10);
  });

  test('should work with sync functions', async () => {
    const double = (x: number) => x * 2;
    const increment = (x: number) => x + 1;

    const result = await asyncCompose(double, increment)(5);
    expect(result).toBe(12);
  });

  test('should work with mixed async and sync functions', async () => {
    const double = async (x: number) => x * 2;
    const increment = (x: number) => x + 1;
    const square = async (x: number) => x * x;

    const result = await asyncCompose(double, increment, square)(3);
    expect(result).toBe(20);
  });

  test('should work with functions that change types', async () => {
    const toString = async (x: number) => `Value: ${x}`;
    const double = async (x: number) => x * 2;

    const result = await asyncCompose(toString, double)(5);
    expect(result).toBe('Value: 10');
  });

  test('should return a promise', () => {
    const double = (x: number) => x * 2;

    const result = asyncCompose(double)(5);
    expect(result).toBeInstanceOf(Promise);
  });

  test('should execute functions in right-to-left order', async () => {
    const order: string[] = [];

    const first = async (x: number) => {
      order.push('first');
      return x;
    };
    const second = async (x: number) => {
      order.push('second');
      return x;
    };
    const third = async (x: number) => {
      order.push('third');
      return x;
    };

    await asyncCompose(first, second, third)(1);
    expect(order).toEqual(['third', 'second', 'first']);
  });
});
