import * as P from '@govind-react-pdf/primitives';

import createCTX from '../ctx';
import save from '../../src/operations/save';

describe('operations save', () => {
  test('should call save method to passed context', () => {
    const ctx = createCTX();
    const doc = { type: P.Document };

    save(ctx, doc);

    expect(ctx.save.mock.calls).toHaveLength(1);
  });

  test('should return passed node', () => {
    const ctx = createCTX();
    const doc = { type: P.Document };

    expect(save(ctx, doc)).toBe(doc);
  });
});
