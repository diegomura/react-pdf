import * as P from '@govind-react-pdf/primitives';

import createCTX from '../ctx';
import restore from '../../src/operations/restore';

describe('operations restore', () => {
  test('should call restore method to passed context', () => {
    const ctx = createCTX();
    const doc = { type: P.Document };

    restore(ctx, doc);

    expect(ctx.restore.mock.calls).toHaveLength(1);
  });

  test('should return passed node', () => {
    const ctx = createCTX();
    const doc = { type: P.Document };

    expect(restore(ctx, doc)).toBe(doc);
  });
});
