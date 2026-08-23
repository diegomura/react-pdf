import { describe, expect, test } from 'vitest';

import resolveFloats from '../../src/steps/resolveFloats';

const view = (style: object, box: object) => ({
  type: 'VIEW',
  box: { left: 0, top: 0, ...box },
  style,
  props: {},
});

const text = () => ({
  type: 'TEXT',
  box: { left: 0, top: 0, width: 300, height: 100 },
  style: {},
  props: {},
});

const parent = (children: object[]) => ({
  type: 'VIEW',
  box: { left: 0, top: 0, width: 300, height: 200 },
  style: {},
  props: {},
  children,
});

const resolve = (children: object[]) => resolveFloats(parent(children) as any);

const exclusionsOf = (result: any, index = 1) =>
  result.children[index].exclusions;

describe('resolveFloats', () => {
  test('should attach rect exclusion with folded margin for plain float', () => {
    const float = view(
      { float: 'left', marginRight: 8 },
      { width: 60, height: 60 },
    );

    const result = resolve([float, text()]);

    expect(exclusionsOf(result)).toEqual([
      { type: 'rect', x: 0, y: 0, width: 68, height: 60 },
    ]);
  });

  test('should position right float against parent right edge', () => {
    const float = view({ float: 'right' }, { width: 60, height: 60 });

    const result = resolve([float, text()]);

    expect(result.children[0].box.left).toBe(240);
    expect(exclusionsOf(result)).toEqual([
      { type: 'rect', x: 240, y: 0, width: 60, height: 60 },
    ]);
  });

  test('should resolve circle shape-outside to ellipse exclusion', () => {
    const float = view(
      {
        float: 'left',
        shapeOutside: { type: 'circle', cx: '50%', cy: '50%', r: 30 },
      },
      { width: 100, height: 100 },
    );

    const result = resolve([float, text()]);

    expect(exclusionsOf(result)).toEqual([
      { type: 'ellipse', cx: 50, cy: 50, rx: 30, ry: 30, extend: 'left' },
    ]);
  });

  test('should resolve circle closest-side radius against box sides', () => {
    const float = view(
      {
        float: 'left',
        shapeOutside: {
          type: 'circle',
          cx: '50%',
          cy: '50%',
          r: 'closest-side',
        },
      },
      { width: 100, height: 80 },
    );

    const result = resolve([float, text()]);

    expect(exclusionsOf(result)).toEqual([
      { type: 'ellipse', cx: 50, cy: 40, rx: 40, ry: 40, extend: 'left' },
    ]);
  });

  test('should resolve circle farthest-side radius against box sides', () => {
    const float = view(
      {
        float: 'left',
        shapeOutside: { type: 'circle', cx: 10, cy: 30, r: 'farthest-side' },
      },
      { width: 100, height: 80 },
    );

    const result = resolve([float, text()]);

    expect(exclusionsOf(result)).toEqual([
      { type: 'ellipse', cx: 10, cy: 30, rx: 90, ry: 90, extend: 'left' },
    ]);
  });

  test('should resolve circle percentage radius against diagonal reference', () => {
    const float = view(
      {
        float: 'left',
        shapeOutside: { type: 'circle', cx: '50%', cy: '50%', r: '50%' },
      },
      { width: 100, height: 80 },
    );

    const result = resolve([float, text()]);
    const [exclusion] = exclusionsOf(result);
    const reference = Math.hypot(100, 80) / Math.SQRT2;

    expect(exclusion).toMatchObject({ type: 'ellipse', cx: 50, cy: 40 });
    expect(exclusion.rx).toBeCloseTo(reference / 2);
  });

  test('should resolve ellipse closest-side radii per axis', () => {
    const float = view(
      {
        float: 'left',
        shapeOutside: {
          type: 'ellipse',
          cx: 20,
          cy: 30,
          rx: 'closest-side',
          ry: 'closest-side',
        },
      },
      { width: 100, height: 80 },
    );

    const result = resolve([float, text()]);

    expect(exclusionsOf(result)).toEqual([
      { type: 'ellipse', cx: 20, cy: 30, rx: 20, ry: 30, extend: 'left' },
    ]);
  });

  test('should translate polygon shape-outside on right float to page coordinates', () => {
    const float = view(
      {
        float: 'right',
        shapeOutside: {
          type: 'polygon',
          points: [
            { x: '100%', y: '0%' },
            { x: '100%', y: '100%' },
            { x: '0%', y: '100%' },
          ],
        },
      },
      { width: 100, height: 100 },
    );

    const result = resolve([float, text()]);

    expect(exclusionsOf(result)).toEqual([
      {
        type: 'polygon',
        points: [
          { x: 300, y: 0 },
          { x: 300, y: 100 },
          { x: 200, y: 100 },
        ],
        extend: 'right',
      },
    ]);
  });

  test('should resolve inset shape-outside to inset rect exclusion', () => {
    const float = view(
      {
        float: 'left',
        shapeOutside: {
          type: 'inset',
          top: 10,
          right: '10%',
          bottom: 10,
          left: 20,
        },
      },
      { width: 100, height: 100 },
    );

    const result = resolve([float, text()]);

    expect(exclusionsOf(result)).toEqual([
      { type: 'rect', x: 20, y: 10, width: 70, height: 80, extend: 'left' },
    ]);
  });

  test('should clear past the float box even when its shape ends higher', () => {
    const float = view(
      {
        float: 'left',
        shapeOutside: { type: 'circle', cx: '50%', cy: '50%', r: 10 },
      },
      { width: 100, height: 60 },
    );
    const cleared = view(
      { clear: 'left' },
      { top: 20, width: 300, height: 30 },
    );

    const result = resolve([float, cleared]);

    expect(result.children[1].box.top).toBe(60);
    expect(result.box.height).toBe(240);
  });
});
