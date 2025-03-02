import { describe, expect, test } from 'vitest';

import * as P from '@react-pdf/primitives';
import { Box, SafeNode } from '@react-pdf/layout';

import createCTX from '../ctx';
import renderBackground from '../../src/primitives/renderBackground';

describe('primitive renderBackground', () => {
  test('should not render if node has no background', () => {
    const ctx = createCTX();
    const node: SafeNode = { type: P.View, props: {}, style: {} };

    renderBackground(ctx, node);

    expect(ctx.fill.mock.calls).toHaveLength(0);
  });

  test('should not render if has background but no dimensions', () => {
    const ctx = createCTX();
    const node: SafeNode = {
      type: P.View,
      props: {},
      style: { backgroundColor: 'red' },
    };

    renderBackground(ctx, node);

    expect(ctx.fill.mock.calls).toHaveLength(0);
  });

  test('should render background correctly', () => {
    const ctx = createCTX();
    const box = { top: 20, left: 40, width: 140, height: 200 } as Box;
    const style = { backgroundColor: 'red' };
    const node: SafeNode = { type: P.View, style, props: {}, box };

    renderBackground(ctx, node);

    expect(ctx.fillColor.mock.calls).toEqual([['#FF0000']]);
    expect(ctx.rect.mock.calls).toEqual([[40, 20, 140, 200]]);
    expect(ctx.fill.mock.calls).toEqual([[]]);
  });

  test('should be scoped operation', () => {
    const ctx = createCTX();
    const box = { top: 20, left: 40, width: 140, height: 200 } as Box;
    const style = { backgroundColor: 'red' };
    const node: SafeNode = { type: P.View, style, box, props: {} };

    renderBackground(ctx, node);

    expect(ctx.save.mock.calls).toHaveLength(1);
    expect(ctx.restore.mock.calls).toHaveLength(1);
  });

  test('should render with opacity 1 by default', () => {
    const ctx = createCTX();
    const box = { top: 20, left: 40, width: 140, height: 200 } as Box;
    const style = { backgroundColor: 'red' };
    const node: SafeNode = { type: P.View, style, box, props: {} };

    renderBackground(ctx, node);

    expect(ctx.fillOpacity.mock.calls).toEqual([[1]]);
  });

  test('should render background opacity', () => {
    const ctx = createCTX();
    const box = { top: 20, left: 40, width: 140, height: 200 } as Box;
    const style = { backgroundColor: 'red', opacity: 0.8 };
    const node: SafeNode = { type: P.View, style, box, props: {} };

    renderBackground(ctx, node);

    expect(ctx.fillOpacity.mock.calls).toEqual([[0.8]]);
  });

  test('should render background opacity 0', () => {
    const ctx = createCTX();
    const box = { top: 20, left: 40, width: 140, height: 200 } as Box;
    const style = { backgroundColor: 'red', opacity: 0 };
    const node: SafeNode = { type: P.View, style, box, props: {} };

    renderBackground(ctx, node);

    expect(ctx.fillOpacity.mock.calls).toEqual([[0]]);
  });

  test('should render background color opacity 0', () => {
    const ctx = createCTX();
    const box = { top: 20, left: 40, width: 140, height: 200 } as Box;
    const style = { backgroundColor: 'rgba(0, 0, 0, 0)', opacity: 1 };
    const node: SafeNode = { type: P.View, style, box, props: {} };

    renderBackground(ctx, node);

    expect(ctx.fillOpacity.mock.calls).toEqual([[0]]);
  });
});
