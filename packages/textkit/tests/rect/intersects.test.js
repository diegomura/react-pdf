import { describe, expect, test } from 'vitest';

import intersects from '../../src/rect/intersects';

describe('rect intersects operator', () => {
  test('should not intesect on top-left corner', () => {
    const a = { x: 50, y: 50, width: 90, height: 110 };
    const b = { x: 0, y: 0, width: 30, height: 30 };

    expect(intersects(a, b)).toEqual(false);
  });

  test('should intesect on top-left corner', () => {
    const a = { x: 50, y: 50, width: 90, height: 110 };
    const b = { x: 0, y: 0, width: 60, height: 60 };

    expect(intersects(a, b)).toEqual(true);
  });

  test('should not intesect on top edge', () => {
    const a = { x: 50, y: 50, width: 90, height: 110 };
    const b = { x: 50, y: 0, width: 30, height: 30 };

    expect(intersects(a, b)).toEqual(false);
  });

  test('should intesect on top edge', () => {
    const a = { x: 50, y: 50, width: 90, height: 110 };
    const b = { x: 50, y: 0, width: 30, height: 60 };

    expect(intersects(a, b)).toEqual(true);
  });

  test('should not intesect on top-right corner', () => {
    const a = { x: 50, y: 50, width: 90, height: 110 };
    const b = { x: 150, y: 0, width: 50, height: 50 };

    expect(intersects(a, b)).toEqual(false);
  });

  test('should intesect on top-right corner', () => {
    const a = { x: 50, y: 50, width: 90, height: 110 };
    const b = { x: 70, y: 0, width: 50, height: 50 };

    expect(intersects(a, b)).toEqual(true);
  });

  test('should not intesect on right edge', () => {
    const a = { x: 50, y: 50, width: 90, height: 110 };
    const b = { x: 150, y: 40, width: 30, height: 30 };

    expect(intersects(a, b)).toEqual(false);
  });

  test('should intesect on right edge', () => {
    const a = { x: 50, y: 50, width: 90, height: 110 };
    const b = { x: 130, y: 40, width: 30, height: 30 };

    expect(intersects(a, b)).toEqual(true);
  });

  test('should not intesect on bottom-right corner', () => {
    const a = { x: 50, y: 50, width: 90, height: 110 };
    const b = { x: 150, y: 170, width: 50, height: 50 };

    expect(intersects(a, b)).toEqual(false);
  });

  test('should intesect on bottom-right corner', () => {
    const a = { x: 50, y: 50, width: 90, height: 110 };
    const b = { x: 70, y: 120, width: 50, height: 50 };

    expect(intersects(a, b)).toEqual(true);
  });

  test('should not intesect on bottom edge', () => {
    const a = { x: 50, y: 50, width: 90, height: 110 };
    const b = { x: 70, y: 180, width: 30, height: 30 };

    expect(intersects(a, b)).toEqual(false);
  });

  test('should intesect on bottom edge', () => {
    const a = { x: 50, y: 50, width: 90, height: 110 };
    const b = { x: 70, y: 100, width: 30, height: 30 };

    expect(intersects(a, b)).toEqual(true);
  });

  test('should not intesect on bottom-left corner', () => {
    const a = { x: 50, y: 50, width: 90, height: 110 };
    const b = { x: 0, y: 170, width: 50, height: 50 };

    expect(intersects(a, b)).toEqual(false);
  });

  test('should intesect on bottom-left corner', () => {
    const a = { x: 50, y: 50, width: 90, height: 110 };
    const b = { x: 0, y: 120, width: 50, height: 50 };

    expect(intersects(a, b)).toEqual(true);
  });

  test('should not intesect on left edge', () => {
    const a = { x: 50, y: 50, width: 90, height: 110 };
    const b = { x: 0, y: 60, width: 30, height: 30 };

    expect(intersects(a, b)).toEqual(false);
  });

  test('should intesect on left edge', () => {
    const a = { x: 50, y: 50, width: 90, height: 110 };
    const b = { x: 30, y: 60, width: 30, height: 30 };

    expect(intersects(a, b)).toEqual(true);
  });
});
