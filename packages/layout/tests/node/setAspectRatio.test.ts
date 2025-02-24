import { beforeEach, describe, expect, test, vi } from 'vitest';
import setAspectRatio from '../../src/node/setAspectRatio';
import { SafeNode } from '../../src/types';

describe('node setAspectRatio', () => {
  const mock = vi.fn();
  const node = {
    type: 'VIEW',
    props: {},
    style: {},
    children: [],
    yogaNode: { setAspectRatio: mock },
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
      box: { top: 0, right: 0, left: 0, bottom: 0, width: 10, height: 20 },
    } as SafeNode;
    const result = setAspectRatio(null)(emptyNode);

    expect(result).toBe(emptyNode);
  });

  test('Should call yoga node setter if provided', () => {
    const result = setAspectRatio(3)(node);

    expect(mock.mock.calls).toHaveLength(1);
    expect(mock.mock.calls[0][0]).toBe(3);
    expect(result).toBe(node);
  });
});
