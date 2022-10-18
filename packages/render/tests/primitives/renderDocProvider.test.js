import * as P from '@react-pdf/primitives';

import createCTX from '../ctx';
import renderDocProvider from '../../src/primitives/renderDocProvider';

describe('primitive renderDocProvider', () => {
  test('should not render if node has no background', () => {
    const ctx = createCTX();
    let capture = null;
    const props = { fn: jest.fn() };
    const node = { type: P.DocProvider, props };

    renderDocProvider(ctx, node);

    expect(node.props.fn).toHaveBeenCalledWith(ctx);
  });
});
