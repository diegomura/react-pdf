import { describe, expect, test } from 'vitest';

import * as P from '@react-pdf/primitives';
import { Box, SafeNode } from '@react-pdf/layout';

import createCTX from '../ctx';
import renderBorders from '../../src/primitives/renderBorders';

describe('primitive renderBorders', () => {
  test('should not render if node has no box', () => {
    const ctx = createCTX();
    const node: SafeNode = { type: P.View, props: {}, style: {} };

    renderBorders(ctx, node);

    expect(ctx.stroke.mock.calls).toHaveLength(0);
  });

  test('should not render if node has no border widths', () => {
    const ctx = createCTX();
    const box = { top: 20, left: 40, width: 140, height: 200 } as Box;
    const node: SafeNode = { type: P.View, props: {}, style: {}, box };

    renderBorders(ctx, node);

    expect(ctx.stroke.mock.calls).toHaveLength(0);
  });

  test('should render border with simple color', () => {
    const ctx = createCTX();
    const box = {
      top: 20,
      left: 40,
      width: 140,
      height: 200,
      borderTopWidth: 2,
    } as Box;
    const style = { borderTopColor: 'red' };
    const node: SafeNode = { type: P.View, style, props: {}, box };

    renderBorders(ctx, node);

    expect(ctx.strokeColor.mock.calls).toEqual([['#FF0000']]);
    expect(ctx.stroke.mock.calls).toHaveLength(1);
  });

  test('should render with opacity 1 by default', () => {
    const ctx = createCTX();
    const box = {
      top: 20,
      left: 40,
      width: 140,
      height: 200,
      borderTopWidth: 2,
    } as Box;
    const style = { borderTopColor: 'red' };
    const node: SafeNode = { type: P.View, style, props: {}, box };

    renderBorders(ctx, node);

    expect(ctx.strokeOpacity.mock.calls).toEqual([[1]]);
  });

  test('should apply RGBA color opacity correctly', () => {
    const ctx = createCTX();
    const box = {
      top: 20,
      left: 40,
      width: 140,
      height: 200,
      borderTopWidth: 2,
    } as Box;
    const style = { borderTopColor: 'rgba(60, 217, 48, 0.49)' };
    const node: SafeNode = { type: P.View, style, props: {}, box };

    renderBorders(ctx, node);

    expect(ctx.strokeColor.mock.calls).toEqual([['#3CD930']]);
    expect(ctx.strokeOpacity.mock.calls).toEqual([[0.49]]);
  });

  test('should apply 8-digit hex color opacity correctly', () => {
    const ctx = createCTX();
    const box = {
      top: 20,
      left: 40,
      width: 140,
      height: 200,
      borderTopWidth: 2,
    } as Box;
    const style = { borderTopColor: '#FF000080' };
    const node: SafeNode = { type: P.View, style, props: {}, box };

    renderBorders(ctx, node);

    expect(ctx.strokeColor.mock.calls).toEqual([['#FF0000']]);
    // 0x80 = 128, 128/255 ≈ 0.502
    expect(ctx.strokeOpacity.mock.calls[0][0]).toBeCloseTo(0.502, 2);
  });

  test('should handle fully transparent color (alpha=0)', () => {
    const ctx = createCTX();
    const box = {
      top: 20,
      left: 40,
      width: 140,
      height: 200,
      borderTopWidth: 2,
    } as Box;
    const style = { borderTopColor: 'rgba(255, 0, 0, 0)' };
    const node: SafeNode = { type: P.View, style, props: {}, box };

    renderBorders(ctx, node);

    expect(ctx.strokeOpacity.mock.calls).toEqual([[0]]);
  });

  test('should combine node opacity and border color opacity (Math.min)', () => {
    const ctx = createCTX();
    const box = {
      top: 20,
      left: 40,
      width: 140,
      height: 200,
      borderTopWidth: 2,
    } as Box;
    const style = { borderTopColor: 'rgba(255, 0, 0, 0.8)', opacity: 0.5 };
    const node: SafeNode = { type: P.View, style, props: {}, box };

    renderBorders(ctx, node);

    // Math.min(0.8, 0.5) = 0.5
    expect(ctx.strokeOpacity.mock.calls).toEqual([[0.5]]);
  });

  test('should use node opacity when border color has no alpha', () => {
    const ctx = createCTX();
    const box = {
      top: 20,
      left: 40,
      width: 140,
      height: 200,
      borderTopWidth: 2,
    } as Box;
    const style = { borderTopColor: 'red', opacity: 0.7 };
    const node: SafeNode = { type: P.View, style, props: {}, box };

    renderBorders(ctx, node);

    expect(ctx.strokeOpacity.mock.calls).toEqual([[0.7]]);
  });

  test('should apply different opacities for each border side', () => {
    const ctx = createCTX();
    const box = {
      top: 20,
      left: 40,
      width: 140,
      height: 200,
      borderTopWidth: 2,
      borderRightWidth: 2,
      borderBottomWidth: 2,
      borderLeftWidth: 2,
    } as Box;
    const style = {
      borderTopColor: 'rgba(255, 0, 0, 0.2)',
      borderRightColor: 'rgba(0, 255, 0, 0.4)',
      borderBottomColor: 'rgba(0, 0, 255, 0.6)',
      borderLeftColor: 'rgba(255, 255, 0, 0.8)',
    };
    const node: SafeNode = { type: P.View, style, props: {}, box };

    renderBorders(ctx, node);

    expect(ctx.strokeOpacity.mock.calls).toEqual([[0.2], [0.4], [0.6], [0.8]]);
    expect(ctx.strokeColor.mock.calls).toEqual([
      ['#FF0000'],
      ['#00FF00'],
      ['#0000FF'],
      ['#FFFF00'],
    ]);
  });

  test('should be scoped operation with save/restore', () => {
    const ctx = createCTX();
    const box = {
      top: 20,
      left: 40,
      width: 140,
      height: 200,
      borderTopWidth: 2,
    } as Box;
    const style = { borderTopColor: 'red' };
    const node: SafeNode = { type: P.View, style, box, props: {} };

    renderBorders(ctx, node);

    // One outer save/restore + one inner save/restore for each border side
    expect(ctx.save.mock.calls).toHaveLength(2);
    expect(ctx.restore.mock.calls).toHaveLength(2);
  });

  test('should handle hex color correctly', () => {
    const ctx = createCTX();
    const box = {
      top: 20,
      left: 40,
      width: 140,
      height: 200,
      borderTopWidth: 2,
    } as Box;
    const style = { borderTopColor: '#00FF00' };
    const node: SafeNode = { type: P.View, style, props: {}, box };

    renderBorders(ctx, node);

    expect(ctx.strokeColor.mock.calls).toEqual([['#00FF00']]);
    expect(ctx.strokeOpacity.mock.calls).toEqual([[1]]);
  });
});
