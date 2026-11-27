import { describe, expect, test } from 'vitest';

import * as P from '@react-pdf/primitives';

import createCTX from '../ctx';
import renderPath from '../../src/primitives/renderPath';
import { SafePathNode } from '@react-pdf/layout';

const render = (d: string) => {
  const ctx = createCTX();
  const node: SafePathNode = { type: P.Path, props: { d }, style: {} };

  renderPath(ctx, node);

  return ctx.path.mock.calls;
};

describe('primitive renderPath', () => {
  test('should not render empty path', () => {
    const calls = render('');
    expect(calls).toHaveLength(0);
  });

  test('should pass paths without smooth quadratics through untouched', () => {
    const d = 'M10 10L20 20Q30 30 40 40Z';
    expect(render(d)).toEqual([[d]]);
  });

  test('should expand chained T commands with reflected control points', () => {
    expect(render('M0 0Q10 20 20 0T40 0T60 0')).toEqual([
      ['M0 0Q10 20 20 0Q30 -20 40 0Q50 20 60 0'],
    ]);
  });

  test('should use current point as control when T does not follow Q', () => {
    expect(render('M0 0L10 10T30 10')).toEqual([['M0 0L10 10Q10 10 30 10']]);
  });

  test('should absolutize relative t commands', () => {
    expect(render('M0 0Q10 20 20 0t20 0')).toEqual([
      ['M0 0Q10 20 20 0Q30 -20 40 0'],
    ]);
  });

  test('should track current point through H, V and Z when expanding', () => {
    expect(render('M0 0H10V10ZT20 20')).toEqual([['M0 0H10V10ZQ0 0 20 20']]);
  });
});
