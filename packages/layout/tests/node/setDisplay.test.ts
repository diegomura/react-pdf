import { beforeEach, describe, expect, test, vi } from 'vitest';

import * as Yoga from 'yoga-layout/load';

import setDisplay from '../../src/node/setDisplay';
import { SafeNode } from '../../src/types';

describe('node setDisplay', () => {
  const mock = vi.fn();
  const node = {
    type: 'VIEW',
    props: {},
    style: {},
    children: [],
    yogaNode: { setDisplay: mock },
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

    const result = setDisplay(null)(emptyNode);

    expect(result).toBe(emptyNode);
  });

  test('Should set flex by default', () => {
    const result = setDisplay(null)(node);

    expect(mock.mock.calls).toHaveLength(1);
    expect(mock.mock.calls[0][0]).toBe(Yoga.Display.Flex);
    expect(result).toBe(node);
  });

  test('Should set flex', () => {
    const result = setDisplay('flex')(node);

    expect(mock.mock.calls).toHaveLength(1);
    expect(mock.mock.calls[0][0]).toBe(Yoga.Display.Flex);
    expect(result).toBe(node);
  });

  test('Should set none', () => {
    const result = setDisplay('none')(node);

    expect(mock.mock.calls).toHaveLength(1);
    expect(mock.mock.calls[0][0]).toBe(Yoga.Display.None);
    expect(result).toBe(node);
  });
});
