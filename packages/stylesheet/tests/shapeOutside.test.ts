import { describe, expect, test } from 'vitest';

import resolve from '../src/resolve';

const container = { width: 200, height: 400 };

const resolveStyle = resolve(container);

describe('resolve stylesheet shapeOutside', () => {
  test('should parse circle with explicit radius', () => {
    const style = resolveStyle({ shapeOutside: 'circle(30)' });

    expect(style.shapeOutside).toEqual({
      type: 'circle',
      cx: '50%',
      cy: '50%',
      r: 30,
    });
  });

  test('should resolve radius units to points', () => {
    const style = resolveStyle({ shapeOutside: 'circle(1in)' });

    expect(style.shapeOutside).toEqual({
      type: 'circle',
      cx: '50%',
      cy: '50%',
      r: 72,
    });
  });

  test('should default circle radius to closest-side', () => {
    const style = resolveStyle({ shapeOutside: 'circle()' });

    expect(style.shapeOutside).toEqual({
      type: 'circle',
      cx: '50%',
      cy: '50%',
      r: 'closest-side',
    });
  });

  test('should keep percentage radius symbolic', () => {
    const style = resolveStyle({ shapeOutside: 'circle(50%)' });

    expect(style.shapeOutside).toEqual({
      type: 'circle',
      cx: '50%',
      cy: '50%',
      r: '50%',
    });
  });

  test('should parse circle position', () => {
    const style = resolveStyle({ shapeOutside: 'circle(20 at 10 30)' });

    expect(style.shapeOutside).toEqual({
      type: 'circle',
      cx: 10,
      cy: 30,
      r: 20,
    });
  });

  test('should map position keywords to percentages', () => {
    const style = resolveStyle({ shapeOutside: 'circle(20 at right bottom)' });

    expect(style.shapeOutside).toEqual({
      type: 'circle',
      cx: '100%',
      cy: '100%',
      r: 20,
    });
  });

  test('should reorder vertical-first keyword position', () => {
    const style = resolveStyle({ shapeOutside: 'circle(20 at top left)' });

    expect(style.shapeOutside).toEqual({
      type: 'circle',
      cx: '0%',
      cy: '0%',
      r: 20,
    });
  });

  test('should parse ellipse radii', () => {
    const style = resolveStyle({ shapeOutside: 'ellipse(40 20%)' });

    expect(style.shapeOutside).toEqual({
      type: 'ellipse',
      cx: '50%',
      cy: '50%',
      rx: 40,
      ry: '20%',
    });
  });

  test('should default ellipse radii to closest-side', () => {
    const style = resolveStyle({ shapeOutside: 'ellipse(at 20 30)' });

    expect(style.shapeOutside).toEqual({
      type: 'ellipse',
      cx: 20,
      cy: 30,
      rx: 'closest-side',
      ry: 'closest-side',
    });
  });

  test('should parse polygon points with units', () => {
    const style = resolveStyle({
      shapeOutside: 'polygon(0 0, 1in 0, 50% 100%)',
    });

    expect(style.shapeOutside).toEqual({
      type: 'polygon',
      points: [
        { x: 0, y: 0 },
        { x: 72, y: 0 },
        { x: '50%', y: '100%' },
      ],
    });
  });

  test('should ignore polygon fill-rule', () => {
    const style = resolveStyle({
      shapeOutside: 'polygon(evenodd, 0 0, 100 0, 50 80)',
    });

    expect(style.shapeOutside).toMatchObject({ type: 'polygon' });
    expect((style.shapeOutside as any).points).toHaveLength(3);
  });

  test('should drop polygon with fewer than three points', () => {
    const style = resolveStyle({ shapeOutside: 'polygon(0 0, 100 0)' });

    expect(style.shapeOutside).toBeUndefined();
  });

  test('should expand inset with one value', () => {
    const style = resolveStyle({ shapeOutside: 'inset(10)' });

    expect(style.shapeOutside).toEqual({
      type: 'inset',
      top: 10,
      right: 10,
      bottom: 10,
      left: 10,
    });
  });

  test('should expand inset with two values', () => {
    const style = resolveStyle({ shapeOutside: 'inset(10 20%)' });

    expect(style.shapeOutside).toEqual({
      type: 'inset',
      top: 10,
      right: '20%',
      bottom: 10,
      left: '20%',
    });
  });

  test('should parse inset with four values ignoring round radii', () => {
    const style = resolveStyle({ shapeOutside: 'inset(5 10 15 20 round 5)' });

    expect(style.shapeOutside).toEqual({
      type: 'inset',
      top: 5,
      right: 10,
      bottom: 15,
      left: 20,
    });
  });

  test('should drop unsupported url values', () => {
    const style = resolveStyle({ shapeOutside: 'url(image.png)' });

    expect(style.shapeOutside).toBeUndefined();
  });

  test('should drop malformed values', () => {
    expect(
      resolveStyle({ shapeOutside: 'margin-box' }).shapeOutside,
    ).toBeUndefined();
    expect(resolveStyle({ shapeOutside: '' }).shapeOutside).toBeUndefined();
  });

  test('should pass through already parsed shapes', () => {
    const shape = { type: 'circle' as const, cx: 10, cy: 10, r: 5 };
    const style = resolveStyle({ shapeOutside: shape });

    expect(style.shapeOutside).toEqual(shape);
  });
});
