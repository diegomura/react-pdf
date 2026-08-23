import { describe, expect, test } from 'vitest';

import generateLineRects from '../../src/layout/generateLineRects';

const container = { x: 0, y: 0, width: 100, height: 100 };

describe('generateLineRects', () => {
  test('should return container when no exclusions', () => {
    expect(generateLineRects(container, 10)).toEqual([container]);
    expect(generateLineRects({ ...container, exclusions: [] }, 10)).toEqual([
      container,
    ]);
  });

  test('should split lines around rect exclusion', () => {
    const exclusions = [{ x: 40, y: 0, width: 20, height: 10 }];
    const rects = generateLineRects({ ...container, exclusions }, 10);

    expect(rects).toEqual([
      { x: 0, y: 0, width: 40, height: 10 },
      { x: 60, y: 0, width: 40, height: 10 },
      { x: 0, y: 10, width: 100, height: 90 },
    ]);
  });

  test('should extend rect exclusion to the left line edge', () => {
    const exclusions = [
      { x: 40, y: 0, width: 20, height: 10, extend: 'left' as const },
    ];
    const rects = generateLineRects({ ...container, exclusions }, 10);

    expect(rects).toEqual([
      { x: 60, y: 0, width: 40, height: 10 },
      { x: 0, y: 10, width: 100, height: 90 },
    ]);
  });

  test('should extend rect exclusion to the right line edge', () => {
    const exclusions = [
      { x: 40, y: 0, width: 20, height: 10, extend: 'right' as const },
    ];
    const rects = generateLineRects({ ...container, exclusions }, 10);

    expect(rects).toEqual([
      { x: 0, y: 0, width: 40, height: 10 },
      { x: 0, y: 10, width: 100, height: 90 },
    ]);
  });

  test('should widen lines following ellipse contour', () => {
    const exclusions = [
      { type: 'ellipse' as const, cx: 0, cy: 20, rx: 40, ry: 20 },
    ];
    const rects = generateLineRects({ ...container, exclusions }, 10);

    expect(rects.length).toBe(5);

    // bands touching the center y get the full rx, outer bands are narrower
    const edgeHalfWidth = 40 * Math.sqrt(0.75);

    expect(rects[0].x).toBeCloseTo(edgeHalfWidth);
    expect(rects[0].width).toBeCloseTo(100 - edgeHalfWidth);
    expect(rects[1].x).toBeCloseTo(40);
    expect(rects[1].width).toBeCloseTo(60);
    expect(rects[2].x).toBeCloseTo(40);
    expect(rects[3].x).toBeCloseTo(edgeHalfWidth);

    expect(rects[4]).toEqual({ x: 0, y: 40, width: 100, height: 60 });
  });

  test('should flow text around polygon exclusion', () => {
    const exclusions = [
      {
        type: 'polygon' as const,
        points: [
          { x: 100, y: 0 },
          { x: 100, y: 30 },
          { x: 70, y: 0 },
        ],
        extend: 'right' as const,
      },
    ];
    const rects = generateLineRects({ ...container, exclusions }, 10);

    expect(rects).toEqual([
      { x: 0, y: 0, width: 70, height: 10 },
      { x: 0, y: 10, width: 80, height: 10 },
      { x: 0, y: 20, width: 90, height: 10 },
      { x: 0, y: 30, width: 100, height: 70 },
    ]);
  });
});
