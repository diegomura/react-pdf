import { describe, expect, test } from 'vitest';

import measureSvg from '../../src/svg/measureSvg';
import { MeasureMode } from '../../src/taffy/measure';
import { SafePageNode, SafeSvgNode } from '../../src/types';

const page = { type: 'PAGE', props: {}, style: {} } as SafePageNode;

const svg = {
  type: 'SVG',
  props: { viewBox: { minX: 0, minY: 0, maxX: 300, maxY: 150 } },
  style: {},
  children: [],
} as unknown as SafeSvgNode;

describe('measureSvg', () => {
  test('should scale height from the given width', () => {
    const size = measureSvg(page, svg)(
      100,
      MeasureMode.AtMost,
      Infinity,
      MeasureMode.Undefined,
    );

    expect(size).toEqual({ width: 100, height: 50 });
  });

  test('should use the viewBox size when width is unconstrained', () => {
    const size = measureSvg(page, svg)(
      Infinity,
      MeasureMode.Undefined,
      Infinity,
      MeasureMode.Undefined,
    );

    expect(size).toEqual({ width: 300, height: 150 });
  });

  test('should be empty without a viewBox', () => {
    const node = { ...svg, props: {} } as SafeSvgNode;
    const size = measureSvg(page, node)(
      Infinity,
      MeasureMode.Undefined,
      Infinity,
      MeasureMode.Undefined,
    );

    expect(size).toEqual({});
  });
});
