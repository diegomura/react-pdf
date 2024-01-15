import { describe, expect, test } from '@jest/globals';

import * as P from '@react-pdf/primitives';

import createCTX from '../ctx';
import renderEllipse from '../../src/primitives/renderEllipse';

const round = num => Math.round(num * 100) / 100;

describe('primitive renderEllipse', () => {
  test('should render ellipse correctly', () => {
    const ctx = createCTX();
    const props = { cx: 50, cy: 80, rx: 20, ry: 10 };
    const node = { type: P.Ellipse, props };

    renderEllipse(ctx, node);

    const bezierCalls = ctx.bezierCurveTo.mock.calls.map(c => c.map(round));

    expect(bezierCalls).toHaveLength(4);
    expect(ctx.moveTo.mock.calls).toEqual([[30, 80]]);
    expect(bezierCalls[0]).toEqual([30, 74.48, 38.95, 70, 50, 70]);
    expect(bezierCalls[1]).toEqual([61.05, 70, 70, 74.48, 70, 80]);
    expect(bezierCalls[2]).toEqual([70, 85.52, 61.05, 90, 50, 90]);
    expect(bezierCalls[3]).toEqual([38.95, 90, 30, 85.52, 30, 80]);
    expect(ctx.closePath.mock.calls).toHaveLength(1);
  });
});
