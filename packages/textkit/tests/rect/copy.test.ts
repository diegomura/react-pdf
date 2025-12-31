import { describe, expect, test } from 'vitest';

import copy from '../../src/rect/copy';

describe('rect copy operator', () => {
  test('should create copy of rect', () => {
    const rect = { x: 2, y: 4, width: 20, height: 10 };
    const copied = copy(rect);

    expect(copied).not.toBe(rect);
    expect(copied).toHaveProperty('x', 2);
    expect(copied).toHaveProperty('y', 4);
    expect(copied).toHaveProperty('width', 20);
    expect(copied).toHaveProperty('height', 10);
  });

  test('should not mutate original rect when copy is modified', () => {
    const rect = { x: 2, y: 4, width: 20, height: 10 };
    const copied = copy(rect);

    copied.x = 100;
    copied.y = 200;
    copied.width = 300;
    copied.height = 400;

    expect(rect).toHaveProperty('x', 2);
    expect(rect).toHaveProperty('y', 4);
    expect(rect).toHaveProperty('width', 20);
    expect(rect).toHaveProperty('height', 10);
  });

  test('should copy empty rect', () => {
    const rect = { x: 0, y: 0, width: 0, height: 0 };
    const copied = copy(rect);

    expect(copied).not.toBe(rect);
    expect(copied).toEqual({ x: 0, y: 0, width: 0, height: 0 });
  });

  test('should copy rect at origin with dimensions', () => {
    const rect = { x: 0, y: 0, width: 100, height: 50 };
    const copied = copy(rect);

    expect(copied).not.toBe(rect);
    expect(copied).toEqual({ x: 0, y: 0, width: 100, height: 50 });
  });
});
