import * as P from '@nutshelllabs/primitives';

import createCTX from '../ctx';
import setDestination from '../../src/operations/setDestination';

describe('operations setDestination', () => {
  test('should call addNamedDestination method to passed context if id present', () => {
    const ctx = createCTX();
    const box = { top: 20 };
    const props = { id: 'test' };
    const doc = { type: P.View, props, box };

    setDestination(ctx, doc);

    expect(ctx.addNamedDestination.mock.calls).toHaveLength(1);
    expect(ctx.addNamedDestination.mock.calls[0][0]).toBe('test');
    expect(ctx.addNamedDestination.mock.calls[0][3]).toBe(20);
  });

  test('should not call addNamedDestination method to passed context if id missed', () => {
    const ctx = createCTX();
    const doc = { type: P.View };

    setDestination(ctx, doc);

    expect(ctx.addNamedDestination.mock.calls).toHaveLength(0);
  });
});
