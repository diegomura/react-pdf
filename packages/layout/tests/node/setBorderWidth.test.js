import { beforeEach, describe, expect, jest, test } from '@jest/globals';

import * as Yoga from 'yoga-layout';

import setBorder, {
  setBorderTop,
  setBorderRight,
  setBorderBottom,
  setBorderLeft,
} from '../../src/node/setBorderWidth';

describe('node setBorderWidth', () => {
  const mock = jest.fn();
  const node = { yogaNode: { setBorder: mock } };

  beforeEach(() => {
    mock.mockReset();
  });

  describe('setBorderTop', () => {
    test('should return node if no yoga node available', () => {
      const emptyNode = { box: { width: 10, height: 20 } };
      const result = setBorderTop(null)(emptyNode);

      expect(result).toBe(emptyNode);
    });

    test('Should call appropiate yoga node method for numeric values', () => {
      const result = setBorderTop(50)(node);

      expect(mock.mock.calls).toHaveLength(1);
      expect(mock.mock.calls[0][0]).toBe(Yoga.Edge.Top);
      expect(mock.mock.calls[0][1]).toBe(50);
      expect(result).toBe(node);
    });

    test('Should throw error for percent values', () => {
      expect(() => setBorderTop('50%')(node)).toThrow();
    });
  });

  describe('setBorderRight', () => {
    test('should return node if no yoga node available', () => {
      const emptyNode = { box: { width: 10, height: 20 } };
      const result = setBorderRight(null)(emptyNode);

      expect(result).toBe(emptyNode);
    });

    test('Should call appropiate yoga node method for numeric values', () => {
      const result = setBorderRight(50)(node);

      expect(mock.mock.calls).toHaveLength(1);
      expect(mock.mock.calls[0][0]).toBe(Yoga.Edge.Right);
      expect(mock.mock.calls[0][1]).toBe(50);
      expect(result).toBe(node);
    });

    test('Should throw error for percent values', () => {
      expect(() => setBorderRight('50%')(node)).toThrow();
    });
  });

  describe('setBorderBottom', () => {
    test('should return node if no yoga node available', () => {
      const emptyNode = { box: { width: 10, height: 20 } };
      const result = setBorderBottom(null)(emptyNode);

      expect(result).toBe(emptyNode);
    });

    test('Should call appropiate yoga node method for numeric values', () => {
      const result = setBorderBottom(50)(node);

      expect(mock.mock.calls).toHaveLength(1);
      expect(mock.mock.calls[0][0]).toBe(Yoga.Edge.Bottom);
      expect(mock.mock.calls[0][1]).toBe(50);
      expect(result).toBe(node);
    });

    test('Should throw error for percent values', () => {
      expect(() => setBorderBottom('50%')(node)).toThrow();
    });
  });

  describe('setBorderLeft', () => {
    test('should return node if no yoga node available', () => {
      const emptyNode = { box: { width: 10, height: 20 } };
      const result = setBorderLeft(null)(emptyNode);

      expect(result).toBe(emptyNode);
    });

    test('Should call appropiate yoga node method for numeric values', () => {
      const result = setBorderLeft(50)(node);

      expect(mock.mock.calls).toHaveLength(1);
      expect(mock.mock.calls[0][0]).toBe(Yoga.Edge.Left);
      expect(mock.mock.calls[0][1]).toBe(50);
      expect(result).toBe(node);
    });

    test('Should throw error for percent values', () => {
      expect(() => setBorderLeft('50%')(node)).toThrow();
    });
  });

  describe('setBorder', () => {
    test('should return node if no yoga node available', () => {
      const emptyNode = { box: { width: 10, height: 20 } };
      const result = setBorder(null)(emptyNode);

      expect(result).toBe(emptyNode);
    });

    test('Should call appropiate yoga node method for numeric values', () => {
      const result = setBorder(50)(node);

      expect(mock.mock.calls).toHaveLength(4);
      expect(mock.mock.calls[0]).toEqual([Yoga.Edge.Top, 50]);
      expect(mock.mock.calls[1]).toEqual([Yoga.Edge.Right, 50]);
      expect(mock.mock.calls[2]).toEqual([Yoga.Edge.Bottom, 50]);
      expect(mock.mock.calls[3]).toEqual([Yoga.Edge.Left, 50]);
      expect(result).toBe(node);
    });

    test('Should throw error for percent values', () => {
      expect(() => setBorder('50%')(node)).toThrow();
    });
  });
});
