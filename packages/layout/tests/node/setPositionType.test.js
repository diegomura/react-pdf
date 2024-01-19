import { jest } from '@jest/globals';
import * as Yoga from 'yoga-layout';

import setPositionType from '../../src/node/setPositionType';

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
    expect(mock.mock.calls[0][0]).toBe(Yoga.PositionType.Relative);
    expect(result).toBe(node);
  });

  test('Should set absolute', () => {
    const result = setPositionType('absolute')(node);

    expect(mock.mock.calls).toHaveLength(1);
    expect(mock.mock.calls[0][0]).toBe(Yoga.PositionType.Absolute);
    expect(result).toBe(node);
  });
});
