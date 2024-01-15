import { jest } from '@jest/globals';
import yogaModule from 'yoga-layout/sync';

import setPositionType from '../../src/node/setPositionType';

// yoga-layout sets default export using non-standard __esModule property, so we need to
// make an additional check in case it's used in a bundler that does not support it.
const Yoga = 'default' in yogaModule ? yogaModule.default : yogaModule;

describe('node setPositionType', () => {
  const mock = jest.fn();
  const node = { yogaNode: { setPositionType: mock } };

  beforeEach(() => {
    mock.mockReset();
  });

  test('should return node if no yoga node available', () => {
    const emptyNode = { box: { width: 10, height: 20 } };
    const result = setPositionType(null)(emptyNode);

    expect(result).toBe(emptyNode);
  });

  test('Should set relative', () => {
    const result = setPositionType('relative')(node);

    expect(mock.mock.calls).toHaveLength(1);
    expect(mock.mock.calls[0][0]).toBe(Yoga.POSITION_TYPE_RELATIVE);
    expect(result).toBe(node);
  });

  test('Should set absolute', () => {
    const result = setPositionType('absolute')(node);

    expect(mock.mock.calls).toHaveLength(1);
    expect(mock.mock.calls[0][0]).toBe(Yoga.POSITION_TYPE_ABSOLUTE);
    expect(result).toBe(node);
  });
});
