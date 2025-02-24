import { beforeEach, describe, expect, test, vi } from 'vitest';
import setFlexBasis from '../../src/node/setFlexBasis';
import { SafeNode } from '../../src/types';

describe('node setFlexBasis', () => {
  const mock = vi.fn();
  const node = {
    type: 'VIEW',
    props: {},
    style: {},
    children: [],
    yogaNode: { setFlexBasis: mock },
  } as SafeNode;

  beforeEach(() => {
    mock.mockReset();
  });

  test('should return node if no yoga node available', () => {
    const emptyNode = {
      type: 'VIEW',
      props: {},
      style: {},
      children: [],
      box: { top: 0, right: 0, bottom: 0, left: 0, width: 10, height: 20 },
    } as SafeNode;

    const result = setFlexBasis(null)(emptyNode);

    expect(result).toBe(emptyNode);
  });

  test('Should set provided value', () => {
    const result = setFlexBasis(2)(node);

    expect(mock.mock.calls).toHaveLength(1);
    expect(mock.mock.calls[0][0]).toBe(2);
    expect(result).toBe(node);
  });
});
