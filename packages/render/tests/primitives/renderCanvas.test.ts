import { describe, expect, test } from 'vitest';

import * as P from '@react-pdf/primitives';

import createCTX from '../ctx';
import renderCanvas from '../../src/primitives/renderCanvas';
import { Box, SafeCanvasNode } from '@react-pdf/layout';

describe('primitive renderCanvas', () => {
  test('should be scoped operation', () => {
    const ctx = createCTX();
    const box = { top: 20, left: 40, width: 140, height: 200 };
    const node = { type: P.Canvas, box, props: {} } as SafeCanvasNode;

    renderCanvas(ctx, node);

    expect(ctx.save.mock.calls).toHaveLength(1);
    expect(ctx.restore.mock.calls).toHaveLength(1);
  });

  test('should call paint method with ctx', () => {
    const ctx = createCTX();
    const box = { top: 20, left: 40, width: 140, height: 200 } as Box;
    const paint = (p) => expect(p).toBeTruthy();
    const node: SafeCanvasNode = {
      type: P.Canvas,
      box,
      props: { paint },
    } as SafeCanvasNode;

    renderCanvas(ctx, node);
  });

  test('should remove dangerous methods from passed ctx', () => {
    const ctx = createCTX();
    const box = { top: 20, left: 40, width: 140, height: 200 };
    const paint = (p) => expect(p.registerFont).toBeFalsy();
    const node = { type: P.Canvas, box, props: { paint } } as SafeCanvasNode;

    renderCanvas(ctx, node);
  });

  test('should get correct available width and height', () => {
    const ctx = createCTX();
    const box = { top: 20, left: 40, width: 140, height: 200 };
    const paint = (_, width, height) => {
      expect(width).toBe(140);
      expect(height).toBe(200);
    };
    const node = { type: P.Canvas, box, props: { paint } } as SafeCanvasNode;

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
    const node = { type: P.Canvas, box, props: { paint } } as SafeCanvasNode;

    renderCanvas(ctx, node);
  });
});
