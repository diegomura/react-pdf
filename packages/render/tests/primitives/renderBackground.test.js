import * as P from '@govind-react-pdf/primitives';

import createCTX from '../ctx';
import renderBackground from '../../src/primitives/renderBackground';

describe('primitive renderBackground', () => {
  test('should not render if node has no background', () => {
    const ctx = createCTX();
    const node = { type: P.View };

    renderBackground(ctx, node);

    expect(ctx.fill.mock.calls).toHaveLength(0);
  });

  test('should not render if has background but no dimensions', () => {
    const ctx = createCTX();
    const node = { type: P.View, style: { backgroundColor: 'red' } };

    renderBackground(ctx, node);

    expect(ctx.fill.mock.calls).toHaveLength(0);
  });

  test('should render background correctly', () => {
    const ctx = createCTX();
    const box = { top: 20, left: 40, width: 140, height: 200 };
    const style = { backgroundColor: 'red' };
    const node = { type: P.View, style, box };

    renderBackground(ctx, node);

    expect(ctx.fillColor.mock.calls).toEqual([['#FF0000']]);
    expect(ctx.rect.mock.calls).toEqual([[40, 20, 140, 200]]);
    expect(ctx.fill.mock.calls).toEqual([[]]);
  });

  test('should be scoped operation', () => {
    const ctx = createCTX();
    const box = { top: 20, left: 40, width: 140, height: 200 };
    const style = { backgroundColor: 'red' };
    const node = { type: P.View, style, box };

    renderBackground(ctx, node);

    expect(ctx.save.mock.calls).toHaveLength(1);
    expect(ctx.restore.mock.calls).toHaveLength(1);
  });

  test('should render with opacity 1 by default', () => {
    const ctx = createCTX();
    const box = { top: 20, left: 40, width: 140, height: 200 };
    const style = { backgroundColor: 'red' };
    const node = { type: P.View, style, box };

    renderBackground(ctx, node);

    expect(ctx.fillOpacity.mock.calls).toEqual([[1]]);
  });

  test('should render background opacity', () => {
    const ctx = createCTX();
    const box = { top: 20, left: 40, width: 140, height: 200 };
    const style = { backgroundColor: 'red', opacity: 0.8 };
    const node = { type: P.View, style, box };

    renderBackground(ctx, node);

    expect(ctx.fillOpacity.mock.calls).toEqual([[0.8]]);
  });

  test('should render background opacity 0', () => {
    const ctx = createCTX();
    const box = { top: 20, left: 40, width: 140, height: 200 };
    const style = { backgroundColor: 'red', opacity: 0 };
    const node = { type: P.View, style, box };

    renderBackground(ctx, node);

    expect(ctx.fillOpacity.mock.calls).toEqual([[0]]);
  });
});
