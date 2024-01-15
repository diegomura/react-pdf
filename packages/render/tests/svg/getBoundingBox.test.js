import { describe, expect, test } from 'vitest';

import getBoundingBox from '../../src/svg/getBoundingBox';

describe('path getBoundingBox', () => {
  test('should return empty path bounding box', () => {
    const bbox = getBoundingBox({
      type: 'PATH',
    });

    expect(bbox).toEqual([0, 0, 0, 0]);
  });

  test('should return path bounding box', () => {
    const bbox = getBoundingBox({
      type: 'PATH',
      props: {
        d: 'M150 0 L75 200 L225 200 Z',
      },
    });

    expect(bbox).toEqual([75, 0, 225, 200]);
  });

  test('should return ellipse bounding box', () => {
    const bbox = getBoundingBox({
      type: 'ELLIPSE',
      props: {
        cx: 200,
        cy: 80,
        rx: 100,
        ry: 50,
      },
    });

    expect(bbox).toEqual([100, 30, 300, 130]);
  });

  test('should return circle bounding box', () => {
    const bbox = getBoundingBox({
      type: 'CIRCLE',
      props: { cx: 50, cy: 50, r: 40 },
    });

    expect(bbox).toEqual([10, 10, 90, 90]);
  });

  test('should return line bounding box', () => {
    const bbox = getBoundingBox({
      type: 'LINE',
      props: { x1: 10, y1: 15, x2: 200, y2: 180 },
    });

    expect(bbox).toEqual([10, 15, 200, 180]);
  });

  test('should return inverted line bounding box', () => {
    const bbox = getBoundingBox({
      type: 'LINE',
      props: { x1: 200, y1: 180, x2: 10, y2: 15 },
    });

    expect(bbox).toEqual([10, 15, 200, 180]);
  });

  test('should return rect bounding box', () => {
    const bbox = getBoundingBox({
      type: 'RECT',
      props: { x: 50, y: 20, width: 150, height: 150 },
    });

    expect(bbox).toEqual([50, 20, 200, 170]);
  });

  test('should return polygon bounding box', () => {
    const bbox = getBoundingBox({
      type: 'POLYGON',
      props: { points: '200,10 250,190 160,210' },
    });

    expect(bbox).toEqual([160, 10, 250, 210]);
  });

  test('should return polyline bounding box', () => {
    const bbox = getBoundingBox({
      type: 'POLYGON',
      props: { points: '20,20 40,25 60,40 80,120 120,140 200,180' },
    });

    expect(bbox).toEqual([20, 20, 200, 180]);
  });
});
