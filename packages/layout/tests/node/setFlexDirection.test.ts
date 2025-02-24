import { beforeEach, describe, expect, test, vi } from 'vitest';

import * as Yoga from 'yoga-layout/load';

import setFlexDirection from '../../src/node/setFlexDirection';
import { SafeNode } from '../../src/types';

describe('node setFlexDirection', () => {
  const mock = vi.fn();
  const node = {
    type: 'VIEW',
    props: {},
    style: {},
    children: [],
    yogaNode: { setFlexDirection: mock },
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

    const result = setFlexDirection(null)(emptyNode);

    expect(result).toBe(emptyNode);
  });

  test('Should set column by default', () => {
    const result = setFlexDirection(null)(node);

    expect(mock.mock.calls).toHaveLength(1);
    expect(mock.mock.calls[0][0]).toBe(Yoga.FlexDirection.Column);
    expect(result).toBe(node);
  });

  test('Should set column', () => {
    const result = setFlexDirection('column')(node);

    expect(mock.mock.calls).toHaveLength(1);
    expect(mock.mock.calls[0][0]).toBe(Yoga.FlexDirection.Column);
    expect(result).toBe(node);
  });

  test('Should set row', () => {
    const result = setFlexDirection('row')(node);

    expect(mock.mock.calls).toHaveLength(1);
    expect(mock.mock.calls[0][0]).toBe(Yoga.FlexDirection.Row);
    expect(result).toBe(node);
  });

  test('Should set row-reverse', () => {
    const result = setFlexDirection('row-reverse')(node);

    expect(mock.mock.calls).toHaveLength(1);
    expect(mock.mock.calls[0][0]).toBe(Yoga.FlexDirection.RowReverse);
    expect(result).toBe(node);
  });

  test('Should set column-reverse', () => {
    const result = setFlexDirection('column-reverse')(node);

    expect(mock.mock.calls).toHaveLength(1);
    expect(mock.mock.calls[0][0]).toBe(Yoga.FlexDirection.ColumnReverse);
    expect(result).toBe(node);
  });
});
