import { describe, expect, test } from 'vitest';

import measureImage from '../../src/image/measureImage';
import { MeasureMode } from '../../src/taffy/measure';
import { SafeImageNode, SafePageNode } from '../../src/types';

const page = {
  type: 'PAGE',
  props: {},
  style: {},
  box: { width: 500, height: 800, top: 0, left: 0, right: 0, bottom: 0 },
} as SafePageNode;

const image = {
  type: 'IMAGE',
  props: {},
  style: {},
  image: { data: Buffer.from(''), width: 200, height: 100 },
} as unknown as SafeImageNode;

describe('measureImage', () => {
  test('should scale height from an exact width', () => {
    const size = measureImage(page, image)(
      100,
      MeasureMode.Exactly,
      Infinity,
      MeasureMode.Undefined,
    );

    expect(size).toEqual({ height: 50 });
  });

  test('should use the intrinsic size when width is unconstrained', () => {
    const size = measureImage(page, image)(
      Infinity,
      MeasureMode.Undefined,
      Infinity,
      MeasureMode.Undefined,
    );

    expect(size).toEqual({ width: 200, height: 100 });
  });

  test('should clamp the intrinsic size to the available height', () => {
    const size = measureImage(page, image)(
      Infinity,
      MeasureMode.Undefined,
      50,
      MeasureMode.AtMost,
    );

    expect(size).toEqual({ width: 100, height: 50 });
  });

  test('should be empty at min-content', () => {
    const size = measureImage(page, image)(
      0,
      MeasureMode.Undefined,
      Infinity,
      MeasureMode.Undefined,
    );

    expect(size).toEqual({ width: 0, height: 0 });
  });
});
