import { jest } from '@jest/globals';
import * as Yoga from 'yoga-layout';

import setPadding, {
  setPaddingTop,
  setPaddingRight,
  setPaddingBottom,
  setPaddingLeft,
} from '../../src/node/setPadding';

describe('node setPadding', () => {
  const mock = jest.fn();
  const mockPercent = jest.fn();

  const node = {
    yogaNode: { setPadding: mock, setPaddingPercent: mockPercent },
  };

  beforeEach(() => {
    mock.mockReset();
    mockPercent.mockReset();
  });

  describe('setPaddingTop', () => {
    test('should return node if no yoga node available', () => {
      const emptyNode = { box: { width: 10, height: 20 } };
      const result = setPaddingTop(null)(emptyNode);

      expect(result).toBe(emptyNode);
    });

    test('Should call appropiate yoga node method for numeric values', () => {
      const result = setPaddingTop(50)(node);

      expect(mock.mock.calls).toHaveLength(1);
      expect(mock.mock.calls[0][0]).toBe(Yoga.Edge.Top);
      expect(mock.mock.calls[0][1]).toBe(50);
      expect(result).toBe(node);
    });

    test('Should call appropiate yoga node method for percent values', () => {
      const result = setPaddingTop('50%')(node);

      expect(mockPercent.mock.calls).toHaveLength(1);
      expect(mockPercent.mock.calls[0][0]).toBe(Yoga.Edge.Top);
      expect(mockPercent.mock.calls[0][1]).toBe(50);
      expect(result).toBe(node);
    });
  });

  describe('setPaddingRight', () => {
    test('should return node if no yoga node available', () => {
      const emptyNode = { box: { width: 10, height: 20 } };
      const result = setPaddingRight(null)(emptyNode);

      expect(result).toBe(emptyNode);
    });

    test('Should call appropiate yoga node method for numeric values', () => {
      const result = setPaddingRight(50)(node);

      expect(mock.mock.calls).toHaveLength(1);
      expect(mock.mock.calls[0][0]).toBe(Yoga.Edge.Right);
      expect(mock.mock.calls[0][1]).toBe(50);
      expect(result).toBe(node);
    });

    test('Should call appropiate yoga node method for percent values', () => {
      const result = setPaddingRight('50%')(node);

      expect(mockPercent.mock.calls).toHaveLength(1);
      expect(mockPercent.mock.calls[0][0]).toBe(Yoga.Edge.Right);
      expect(mockPercent.mock.calls[0][1]).toBe(50);
      expect(result).toBe(node);
    });
  });

  describe('setPaddingBottom', () => {
    test('should return node if no yoga node available', () => {
      const emptyNode = { box: { width: 10, height: 20 } };
      const result = setPaddingBottom(null)(emptyNode);

      expect(result).toBe(emptyNode);
    });

    test('Should call appropiate yoga node method for numeric values', () => {
      const result = setPaddingBottom(50)(node);

      expect(mock.mock.calls).toHaveLength(1);
      expect(mock.mock.calls[0][0]).toBe(Yoga.Edge.Bottom);
      expect(mock.mock.calls[0][1]).toBe(50);
      expect(result).toBe(node);
    });

    test('Should call appropiate yoga node method for percent values', () => {
      const result = setPaddingBottom('50%')(node);

      expect(mockPercent.mock.calls).toHaveLength(1);
      expect(mockPercent.mock.calls[0][0]).toBe(Yoga.Edge.Bottom);
      expect(mockPercent.mock.calls[0][1]).toBe(50);
      expect(result).toBe(node);
    });
  });

  describe('setPaddingLeft', () => {
    test('should return node if no yoga node available', () => {
      const emptyNode = { box: { width: 10, height: 20 } };
      const result = setPaddingLeft(null)(emptyNode);

      expect(result).toBe(emptyNode);
    });

    test('Should call appropiate yoga node method for numeric values', () => {
      const result = setPaddingLeft(50)(node);

      expect(mock.mock.calls).toHaveLength(1);
      expect(mock.mock.calls[0][0]).toBe(Yoga.Edge.Left);
      expect(mock.mock.calls[0][1]).toBe(50);
      expect(result).toBe(node);
    });

    test('Should call appropiate yoga node method for percent values', () => {
      const result = setPaddingLeft('50%')(node);

      expect(mockPercent.mock.calls).toHaveLength(1);
      expect(mockPercent.mock.calls[0][0]).toBe(Yoga.Edge.Left);
      expect(mockPercent.mock.calls[0][1]).toBe(50);
      expect(result).toBe(node);
    });
  });

  describe('setPadding', () => {
    test('should return node if no yoga node available', () => {
      const emptyNode = { box: { width: 10, height: 20 } };
      const result = setPadding(null)(emptyNode);

      expect(result).toBe(emptyNode);
    });

    test('Should call appropiate yoga node method for numeric values', () => {
      const result = setPadding(50)(node);

      expect(mock.mock.calls).toHaveLength(4);
      expect(mock.mock.calls[0]).toEqual([Yoga.Edge.Top, 50]);
      expect(mock.mock.calls[1]).toEqual([Yoga.Edge.Right, 50]);
      expect(mock.mock.calls[2]).toEqual([Yoga.Edge.Bottom, 50]);
      expect(mock.mock.calls[3]).toEqual([Yoga.Edge.Left, 50]);
      expect(result).toBe(node);
    });

    test('Should call appropiate yoga node method for percent values', () => {
      const result = setPadding('50%')(node);

      expect(mockPercent.mock.calls).toHaveLength(4);
      expect(mockPercent.mock.calls[0]).toEqual([Yoga.Edge.Top, 50]);
      expect(mockPercent.mock.calls[1]).toEqual([Yoga.Edge.Right, 50]);
      expect(mockPercent.mock.calls[2]).toEqual([Yoga.Edge.Bottom, 50]);
      expect(mockPercent.mock.calls[3]).toEqual([Yoga.Edge.Left, 50]);
      expect(result).toBe(node);
    });
  });
});
