import { jest } from '@jest/globals';
import * as Yoga from 'yoga-layout';

import setAlignItems from '../../src/node/setAlignItems';

describe('node setAlignItems', () => {
  const mock = jest.fn();
  const node = { yogaNode: { setAlignItems: mock } };

  beforeEach(() => {
    mock.mockReset();
  });

  test('should return node if no yoga node available', () => {
    const emptyNode = { box: { width: 10, height: 20 } };
    const result = setAlignItems(null)(emptyNode);

    expect(result).toBe(emptyNode);
  });

  test('Should set align auto by stretch', () => {
    const result = setAlignItems(null)(node);

    expect(mock.mock.calls).toHaveLength(1);
    expect(mock.mock.calls[0][0]).toBe(Yoga.Align.Stretch);
    expect(result).toBe(node);
  });

  test('Should set flex-start', () => {
    const result = setAlignItems('flex-start')(node);

    expect(mock.mock.calls).toHaveLength(1);
    expect(mock.mock.calls[0][0]).toBe(Yoga.Align.FlexStart);
    expect(result).toBe(node);
  });

  test('Should set center', () => {
    const result = setAlignItems('center')(node);

    expect(mock.mock.calls).toHaveLength(1);
    expect(mock.mock.calls[0][0]).toBe(Yoga.Align.Center);
    expect(result).toBe(node);
  });

  test('Should set flex-end', () => {
    const result = setAlignItems('flex-end')(node);

    expect(mock.mock.calls).toHaveLength(1);
    expect(mock.mock.calls[0][0]).toBe(Yoga.Align.FlexEnd);
    expect(result).toBe(node);
  });

  test('Should set stretch', () => {
    const result = setAlignItems('stretch')(node);

    expect(mock.mock.calls).toHaveLength(1);
    expect(mock.mock.calls[0][0]).toBe(Yoga.Align.Stretch);
    expect(result).toBe(node);
  });

  test('Should set baseline', () => {
    const result = setAlignItems('baseline')(node);

    expect(mock.mock.calls).toHaveLength(1);
    expect(mock.mock.calls[0][0]).toBe(Yoga.Align.Baseline);
    expect(result).toBe(node);
  });

  test('Should set space-between', () => {
    const result = setAlignItems('space-between')(node);

    expect(mock.mock.calls).toHaveLength(1);
    expect(mock.mock.calls[0][0]).toBe(Yoga.Align.SpaceBetween);
    expect(result).toBe(node);
  });

  test('Should set space-around', () => {
    const result = setAlignItems('space-around')(node);

    expect(mock.mock.calls).toHaveLength(1);
    expect(mock.mock.calls[0][0]).toBe(Yoga.Align.SpaceAround);
    expect(result).toBe(node);
  });
});
