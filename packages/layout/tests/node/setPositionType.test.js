import { beforeEach, describe, expect, jest, test } from '@jest/globals';

import Yoga from '../../yoga';

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
