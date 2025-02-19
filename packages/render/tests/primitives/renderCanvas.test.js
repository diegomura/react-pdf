import { describe, expect, test, vi } from 'vitest';

import * as P from '@react-pdf/primitives';

import createCTX from '../ctx';
import renderCanvas from '../../src/primitives/renderCanvas';

describe('primitive renderCanvas', () => {
  test('should be scoped operation', () => {
    const ctx = createCTX();
    const box = { top: 20, left: 40, width: 140, height: 200 };
    const node = { type: P.Canvas, box, props: {} };

    renderCanvas(ctx, node);

    expect(ctx.save.mock.calls).toHaveLength(1);
    expect(ctx.restore.mock.calls).toHaveLength(1);
  });

  test('should call paint method with ctx', () => {
    const ctx = createCTX();
    const box = { top: 20, left: 40, width: 140, height: 200 };
    const paint = (p) => expect(p).toBeTruthy();
    const node = { type: P.Canvas, box, props: { paint } };

    renderCanvas(ctx, node);
  });

  test('should remove dangerous methods from passed ctx', () => {
    const ctx = createCTX();
    const box = { top: 20, left: 40, width: 140, height: 200 };
    const paint = (p) => expect(p.registerFont).toBeFalsy();
    const node = { type: P.Canvas, box, props: { paint } };

    renderCanvas(ctx, node);
  });

  test('should get correct available width and height', () => {
    const ctx = createCTX();
    const box = { top: 20, left: 40, width: 140, height: 200 };
    const paint = (_, width, height) => {
      expect(width).toBe(140);
      expect(height).toBe(200);
    };
    const node = { type: P.Canvas, box, props: { paint } };

    renderCanvas(ctx, node);
  });

  test('should get correct available width and height with paddings', () => {
    const ctx = createCTX();
    const box = {
      top: 20,
      left: 40,
      width: 140,
      height: 200,
      paddingTop: 10,
      paddingLeft: 20,
      paddingBottom: 30,
      paddingRight: 40,
    };
    const paint = (_, width, height) => {
      expect(width).toBe(80);
      expect(height).toBe(160);
    };
    const node = { type: P.Canvas, box, props: { paint } };

    renderCanvas(ctx, node);
  });
  test('should execute gradient.stop method correctly', () => {
    const ctx = createCTX();
    const stopSpy = vi.spyOn(ctx, 'stop');
    const gradient = ctx.radialGradient(1, 2, 3, 4, 5, 6);
    gradient.stop(0, 'red', 1);
    gradient.stop(0, 'blue', 1);
    expect(stopSpy).toHaveBeenCalledTimes(2);
    expect(stopSpy).toHaveBeenCalledWith(0, 'red', 1);
    expect(stopSpy).toHaveBeenCalledWith(0, 'blue', 1);
  });
});
