import { describe, expect, test } from 'vitest';

import bandInterval from '../../src/shape/bandInterval';
import { ExclusionShape } from '../../src/types';

describe('shape bandInterval operator', () => {
  test('should return rect extent when band overlaps', () => {
    const shape: ExclusionShape = { x: 10, y: 20, width: 30, height: 40 };

    expect(bandInterval(shape, 30, 40)).toEqual({ x0: 10, x1: 40 });
  });

  test('should treat untyped shape as rect', () => {
    const shape: ExclusionShape = {
      type: 'rect',
      x: 10,
      y: 20,
      width: 30,
      height: 40,
    };

    expect(bandInterval(shape, 30, 40)).toEqual({ x0: 10, x1: 40 });
  });

  test('should return null when band is above rect', () => {
    const shape: ExclusionShape = { x: 10, y: 20, width: 30, height: 40 };

    expect(bandInterval(shape, 0, 20)).toBeNull();
  });

  test('should return null when band is below rect', () => {
    const shape: ExclusionShape = { x: 10, y: 20, width: 30, height: 40 };

    expect(bandInterval(shape, 60, 80)).toBeNull();
  });

  test('should return full ellipse width when band contains center', () => {
    const shape: ExclusionShape = {
      type: 'ellipse',
      cx: 50,
      cy: 50,
      rx: 20,
      ry: 10,
    };

    expect(bandInterval(shape, 45, 55)).toEqual({ x0: 30, x1: 70 });
  });

  test('should narrow ellipse interval away from center', () => {
    const shape: ExclusionShape = {
      type: 'ellipse',
      cx: 50,
      cy: 50,
      rx: 20,
      ry: 10,
    };

    // widest band y is 55, half height below center
    const interval = bandInterval(shape, 55, 65);
    const halfWidth = 20 * Math.sqrt(1 - 0.5 ** 2);

    expect(interval.x0).toBeCloseTo(50 - halfWidth);
    expect(interval.x1).toBeCloseTo(50 + halfWidth);
  });

  test('should return null when band misses ellipse', () => {
    const shape: ExclusionShape = {
      type: 'ellipse',
      cx: 50,
      cy: 50,
      rx: 20,
      ry: 10,
    };

    expect(bandInterval(shape, 0, 40)).toBeNull();
    expect(bandInterval(shape, 60, 100)).toBeNull();
  });

  test('should return null for tangent ellipse band', () => {
    const shape: ExclusionShape = {
      type: 'ellipse',
      cx: 50,
      cy: 50,
      rx: 20,
      ry: 10,
    };

    expect(bandInterval(shape, 30, 40)).toBeNull();
  });

  test('should return triangle extent within band', () => {
    const shape: ExclusionShape = {
      type: 'polygon',
      points: [
        { x: 50, y: 0 },
        { x: 100, y: 100 },
        { x: 0, y: 100 },
      ],
    };

    // triangle is widest at the band bottom y=50, where edges sit at x=25 and x=75
    expect(bandInterval(shape, 40, 50)).toEqual({ x0: 25, x1: 75 });
  });

  test('should include polygon vertices inside band', () => {
    const shape: ExclusionShape = {
      type: 'polygon',
      points: [
        { x: 50, y: 0 },
        { x: 100, y: 100 },
        { x: 0, y: 100 },
      ],
    };

    expect(bandInterval(shape, 90, 110)).toEqual({ x0: 0, x1: 100 });
  });

  test('should return null when band misses polygon', () => {
    const shape: ExclusionShape = {
      type: 'polygon',
      points: [
        { x: 50, y: 0 },
        { x: 100, y: 100 },
        { x: 0, y: 100 },
      ],
    };

    expect(bandInterval(shape, 110, 120)).toBeNull();
  });

  test('should span band crossing polygon entirely', () => {
    const shape: ExclusionShape = {
      type: 'polygon',
      points: [
        { x: 40, y: 20 },
        { x: 60, y: 20 },
        { x: 60, y: 80 },
        { x: 40, y: 80 },
      ],
    };

    expect(bandInterval(shape, 40, 50)).toEqual({ x0: 40, x1: 60 });
  });
});
