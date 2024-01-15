import { beforeEach, describe, expect, jest, test } from '@jest/globals';

import * as Yoga from 'yoga-layout';

import setAlignSelf from '../../src/node/setAlignSelf';

describe('node setAlignSelf', () => {
  const mock = jest.fn();
  const node = { yogaNode: { setAlignSelf: mock } };

  beforeEach(() => {
    mock.mockReset();
  });

  test('should return node if no yoga node available', () => {
    const emptyNode = { box: { width: 10, height: 20 } };
    const result = setAlignSelf(null)(emptyNode);

    expect(result).toBe(emptyNode);
  });

  test('Should set align auto by default', () => {
    const result = setAlignSelf(null)(node);

    expect(mock.mock.calls).toHaveLength(1);
    expect(mock.mock.calls[0][0]).toBe(Yoga.Align.Auto);
    expect(result).toBe(node);
  });

  test('Should set flex-start', () => {
    const result = setAlignSelf('flex-start')(node);

    expect(mock.mock.calls).toHaveLength(1);
    expect(mock.mock.calls[0][0]).toBe(Yoga.Align.FlexStart);
    expect(result).toBe(node);
  });

  test('Should set center', () => {
    const result = setAlignSelf('center')(node);

    expect(mock.mock.calls).toHaveLength(1);
    expect(mock.mock.calls[0][0]).toBe(Yoga.Align.Center);
    expect(result).toBe(node);
  });

  test('Should set flex-end', () => {
    const result = setAlignSelf('flex-end')(node);

    expect(mock.mock.calls).toHaveLength(1);
    expect(mock.mock.calls[0][0]).toBe(Yoga.Align.FlexEnd);
    expect(result).toBe(node);
  });

  test('Should set stretch', () => {
    const result = setAlignSelf('stretch')(node);

    expect(mock.mock.calls).toHaveLength(1);
    expect(mock.mock.calls[0][0]).toBe(Yoga.Align.Stretch);
    expect(result).toBe(node);
  });

  test('Should set baseline', () => {
    const result = setAlignSelf('baseline')(node);

    expect(mock.mock.calls).toHaveLength(1);
    expect(mock.mock.calls[0][0]).toBe(Yoga.Align.Baseline);
    expect(result).toBe(node);
  });

  test('Should set space-between', () => {
    const result = setAlignSelf('space-between')(node);

    expect(mock.mock.calls).toHaveLength(1);
    expect(mock.mock.calls[0][0]).toBe(Yoga.Align.SpaceBetween);
    expect(result).toBe(node);
  });

  test('Should set space-around', () => {
    const result = setAlignSelf('space-around')(node);

    expect(mock.mock.calls).toHaveLength(1);
    expect(mock.mock.calls[0][0]).toBe(Yoga.Align.SpaceAround);
    expect(result).toBe(node);
  });
});
