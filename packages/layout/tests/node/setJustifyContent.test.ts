import { beforeEach, describe, expect, test, vi } from 'vitest';

import * as Yoga from 'yoga-layout/load';

import setJustifyContent from '../../src/node/setJustifyContent';
import { SafeNode } from '../../src/types';

describe('node setJustifyContent', () => {
  const mock = vi.fn();
  const node = {
    type: 'VIEW',
    props: {},
    style: {},
    children: [],
    yogaNode: { setJustifyContent: mock },
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

    const result = setJustifyContent(null)(emptyNode);

    expect(result).toBe(emptyNode);
  });

  test('Should set center', () => {
    const result = setJustifyContent('center')(node);

    expect(mock.mock.calls).toHaveLength(1);
    expect(mock.mock.calls[0][0]).toBe(Yoga.Justify.Center);
    expect(result).toBe(node);
  });

  test('Should set flex-end', () => {
    const result = setJustifyContent('flex-end')(node);

    expect(mock.mock.calls).toHaveLength(1);
    expect(mock.mock.calls[0][0]).toBe(Yoga.Justify.FlexEnd);
    expect(result).toBe(node);
  });

  test('Should set flex-start', () => {
    const result = setJustifyContent('flex-start')(node);

    expect(mock.mock.calls).toHaveLength(1);
    expect(mock.mock.calls[0][0]).toBe(Yoga.Justify.FlexStart);
    expect(result).toBe(node);
  });

  test('Should set space-between', () => {
    const result = setJustifyContent('space-between')(node);

    expect(mock.mock.calls).toHaveLength(1);
    expect(mock.mock.calls[0][0]).toBe(Yoga.Justify.SpaceBetween);
    expect(result).toBe(node);
  });

  test('Should set space-around', () => {
    const result = setJustifyContent('space-around')(node);

    expect(mock.mock.calls).toHaveLength(1);
    expect(mock.mock.calls[0][0]).toBe(Yoga.Justify.SpaceAround);
    expect(result).toBe(node);
  });

  test('Should set space-evenly', () => {
    const result = setJustifyContent('space-evenly')(node);

    expect(mock.mock.calls).toHaveLength(1);
    expect(mock.mock.calls[0][0]).toBe(Yoga.Justify.SpaceEvenly);
    expect(result).toBe(node);
  });
});
