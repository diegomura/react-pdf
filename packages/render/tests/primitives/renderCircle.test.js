import * as P from '@nutshelllabs/primitives';

import createCTX from '../ctx';
import renderCircle from '../../src/primitives/renderCircle';

const round = num => Math.round(num * 100) / 100;

describe('primitive renderCircle', () => {
  test('should render circle correctly', () => {
    const ctx = createCTX();
    const props = { cx: 50, cy: 80, r: 20 };
    const node = { type: P.Circle, props };

    renderCircle(ctx, node);

    const bezierCalls = ctx.bezierCurveTo.mock.calls.map(c => c.map(round));

    expect(bezierCalls).toHaveLength(4);
    expect(ctx.moveTo.mock.calls).toEqual([[30, 80]]);
    expect(bezierCalls[0]).toEqual([30, 68.95, 38.95, 60, 50, 60]);
    expect(bezierCalls[1]).toEqual([61.05, 60, 70, 68.95, 70, 80]);
    expect(bezierCalls[2]).toEqual([70, 91.05, 61.05, 100, 50, 100]);
    expect(bezierCalls[3]).toEqual([38.95, 100, 30, 91.05, 30, 80]);
    expect(ctx.closePath.mock.calls).toHaveLength(1);
  });
});
