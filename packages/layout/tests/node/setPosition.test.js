import Yoga from 'yoga-layout/sync';

import setPosition, {
  setPositionTop,
  setPositionRight,
  setPositionBottom,
  setPositionLeft,
} from '../../src/node/setPosition';

describe('node setPosition', () => {
  const mock = jest.fn();
  const mockPercent = jest.fn();

  const node = {
    yogaNode: { setPosition: mock, setPositionPercent: mockPercent },
  };

  beforeEach(() => {
    mock.mockReset();
    mockPercent.mockReset();
  });

  describe('setPositionTop', () => {
    test('should return node if no yoga node available', () => {
      const emptyNode = { box: { width: 10, height: 20 } };
      const result = setPositionTop(null)(emptyNode);

      expect(result).toBe(emptyNode);
    });

    test('Should call appropiate yoga node method for numeric values', () => {
      const result = setPositionTop(50)(node);

      expect(mock.mock.calls).toHaveLength(1);
      expect(mock.mock.calls[0][0]).toBe(Yoga.EDGE_TOP);
      expect(mock.mock.calls[0][1]).toBe(50);
      expect(result).toBe(node);
    });

    test('Should call appropiate yoga node method for percent values', () => {
      const result = setPositionTop('50%')(node);

      expect(mockPercent.mock.calls).toHaveLength(1);
      expect(mockPercent.mock.calls[0][0]).toBe(Yoga.EDGE_TOP);
      expect(mockPercent.mock.calls[0][1]).toBe(50);
      expect(result).toBe(node);
    });
  });

  describe('setPositionRight', () => {
    test('should return node if no yoga node available', () => {
      const emptyNode = { box: { width: 10, height: 20 } };
      const result = setPositionRight(null)(emptyNode);

      expect(result).toBe(emptyNode);
    });

    test('Should call appropiate yoga node method for numeric values', () => {
      const result = setPositionRight(50)(node);

      expect(mock.mock.calls).toHaveLength(1);
      expect(mock.mock.calls[0][0]).toBe(Yoga.EDGE_RIGHT);
      expect(mock.mock.calls[0][1]).toBe(50);
      expect(result).toBe(node);
    });

    test('Should call appropiate yoga node method for percent values', () => {
      const result = setPositionRight('50%')(node);

      expect(mockPercent.mock.calls).toHaveLength(1);
      expect(mockPercent.mock.calls[0][0]).toBe(Yoga.EDGE_RIGHT);
      expect(mockPercent.mock.calls[0][1]).toBe(50);
      expect(result).toBe(node);
    });
  });

  describe('setPositionBottom', () => {
    test('should return node if no yoga node available', () => {
      const emptyNode = { box: { width: 10, height: 20 } };
      const result = setPositionBottom(null)(emptyNode);

      expect(result).toBe(emptyNode);
    });

    test('Should call appropiate yoga node method for numeric values', () => {
      const result = setPositionBottom(50)(node);

      expect(mock.mock.calls).toHaveLength(1);
      expect(mock.mock.calls[0][0]).toBe(Yoga.EDGE_BOTTOM);
      expect(mock.mock.calls[0][1]).toBe(50);
      expect(result).toBe(node);
    });

    test('Should call appropiate yoga node method for percent values', () => {
      const result = setPositionBottom('50%')(node);

      expect(mockPercent.mock.calls).toHaveLength(1);
      expect(mockPercent.mock.calls[0][0]).toBe(Yoga.EDGE_BOTTOM);
      expect(mockPercent.mock.calls[0][1]).toBe(50);
      expect(result).toBe(node);
    });
  });

  describe('setPositionLeft', () => {
    test('should return node if no yoga node available', () => {
      const emptyNode = { box: { width: 10, height: 20 } };
      const result = setPositionLeft(null)(emptyNode);

      expect(result).toBe(emptyNode);
    });

    test('Should call appropiate yoga node method for numeric values', () => {
      const result = setPositionLeft(50)(node);

      expect(mock.mock.calls).toHaveLength(1);
      expect(mock.mock.calls[0][0]).toBe(Yoga.EDGE_LEFT);
      expect(mock.mock.calls[0][1]).toBe(50);
      expect(result).toBe(node);
    });

    test('Should call appropiate yoga node method for percent values', () => {
      const result = setPositionLeft('50%')(node);

      expect(mockPercent.mock.calls).toHaveLength(1);
      expect(mockPercent.mock.calls[0][0]).toBe(Yoga.EDGE_LEFT);
      expect(mockPercent.mock.calls[0][1]).toBe(50);
      expect(result).toBe(node);
    });
  });

  describe('setPosition', () => {
    test('should return node if no yoga node available', () => {
      const emptyNode = { box: { width: 10, height: 20 } };
      const result = setPosition(null)(emptyNode);

      expect(result).toBe(emptyNode);
    });

    test('Should call appropiate yoga node method for numeric values', () => {
      const result = setPosition(50)(node);

      expect(mock.mock.calls).toHaveLength(4);
      expect(mock.mock.calls[0]).toEqual([Yoga.EDGE_TOP, 50]);
      expect(mock.mock.calls[1]).toEqual([Yoga.EDGE_RIGHT, 50]);
      expect(mock.mock.calls[2]).toEqual([Yoga.EDGE_BOTTOM, 50]);
      expect(mock.mock.calls[3]).toEqual([Yoga.EDGE_LEFT, 50]);
      expect(result).toBe(node);
    });

    test('Should call appropiate yoga node method for percent values', () => {
      const result = setPosition('50%')(node);

      expect(mockPercent.mock.calls).toHaveLength(4);
      expect(mockPercent.mock.calls[0]).toEqual([Yoga.EDGE_TOP, 50]);
      expect(mockPercent.mock.calls[1]).toEqual([Yoga.EDGE_RIGHT, 50]);
      expect(mockPercent.mock.calls[2]).toEqual([Yoga.EDGE_BOTTOM, 50]);
      expect(mockPercent.mock.calls[3]).toEqual([Yoga.EDGE_LEFT, 50]);
      expect(result).toBe(node);
    });
  });
});
