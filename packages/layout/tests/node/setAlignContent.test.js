import { beforeEach, describe, expect, test, vi } from 'vitest';

import * as Yoga from 'yoga-layout/load';

import setAlignContent from '../../src/node/setAlignContent';

describe('node setAlignContent', () => {
  const mock = vi.fn();
  const node = { yogaNode: { setAlignContent: mock } };

  beforeEach(() => {
    mock.mockReset();
  });

  test('should return node if no yoga node available', () => {
    const emptyNode = { box: { width: 10, height: 20 } };
    const result = setAlignContent(null)(emptyNode);

    expect(result).toBe(emptyNode);
  });

  test('Should set align auto by default', () => {
    const result = setAlignContent(null)(node);

    expect(mock.mock.calls).toHaveLength(1);
    expect(mock.mock.calls[0][0]).toBe(Yoga.Align.Auto);
    expect(result).toBe(node);
  });

  test('Should set flex-start', () => {
    const result = setAlignContent('flex-start')(node);

    expect(mock.mock.calls).toHaveLength(1);
    expect(mock.mock.calls[0][0]).toBe(Yoga.Align.FlexStart);
    expect(result).toBe(node);
  });

  test('Should set center', () => {
    const result = setAlignContent('center')(node);

    expect(mock.mock.calls).toHaveLength(1);
    expect(mock.mock.calls[0][0]).toBe(Yoga.Align.Center);
    expect(result).toBe(node);
  });

  test('Should set flex-end', () => {
    const result = setAlignContent('flex-end')(node);

    expect(mock.mock.calls).toHaveLength(1);
    expect(mock.mock.calls[0][0]).toBe(Yoga.Align.FlexEnd);
    expect(result).toBe(node);
  });

  test('Should set stretch', () => {
    const result = setAlignContent('stretch')(node);

    expect(mock.mock.calls).toHaveLength(1);
    expect(mock.mock.calls[0][0]).toBe(Yoga.Align.Stretch);
    expect(result).toBe(node);
  });

  test('Should set baseline', () => {
    const result = setAlignContent('baseline')(node);

    expect(mock.mock.calls).toHaveLength(1);
    expect(mock.mock.calls[0][0]).toBe(Yoga.Align.Baseline);
    expect(result).toBe(node);
  });

  test('Should set space-between', () => {
    const result = setAlignContent('space-between')(node);

    expect(mock.mock.calls).toHaveLength(1);
    expect(mock.mock.calls[0][0]).toBe(Yoga.Align.SpaceBetween);
    expect(result).toBe(node);
  });

  test('Should set space-around', () => {
    const result = setAlignContent('space-around')(node);

    expect(mock.mock.calls).toHaveLength(1);
    expect(mock.mock.calls[0][0]).toBe(Yoga.Align.SpaceAround);
    expect(result).toBe(node);
  });

  test('Should set space-evenly', () => {
    const result = setAlignContent('space-evenly')(node);

    expect(mock.mock.calls).toHaveLength(1);
    expect(mock.mock.calls[0][0]).toBe(Yoga.Align.SpaceEvenly);
    expect(result).toBe(node);
  });
});
