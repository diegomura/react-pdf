/* eslint-disable no-restricted-syntax */
import {
  parseTransform,
  normalizeTransform,
} from '../../src/operations/transform';

describe('parse transform', () => {
  const cases = [
    // scale
    ['scale(1)', [['scale', '1']]],
    ['scale(3, 2)', [['scale', ['3', '2']]]],
    ['scale(0.1, -10)', [['scale', ['0.1', '-10']]]],
    ['scale(10, 0.9)', [['scale', ['10', '0.9']]]],
    ['scaleX(10)', [['scaleX', '10']]],
    ['scaleY(-0.9)', [['scaleY', '-0.9']]],

    // translate
    ['translate(10px, 20px)', [['translate', ['10px', '20px']]]],
    ['translate(110px, -0.29px)', [['translate', ['110px', '-0.29px']]]],
    ['translateX(10px)', [['translateX', '10px']]],
    ['translateY(-10px)', [['translateY', '-10px']]],

    // rotate
    ['rotate(120)', [['rotate', '120']]],
    ['rotate(2deg)', [['rotate', '2deg']]],
    ['rotate(0.1)', [['rotate', '0.1']]],
    ['rotate(-10deg)', [['rotate', '-10deg']]],

    // matrix
    [
      'matrix(-1, -0.1, 0, 0.1, 1, 10)',
      [['matrix', ['-1', '-0.1', '0', '0.1', '1', '10']]],
    ],

    // combined
    [
      'translate(10px, 20px) scale(0.1, -10) matrix(-1, -0.1, 0, 0.1, 1, 10)',
      [
        ['translate', ['10px', '20px']],
        ['scale', ['0.1', '-10']],
        ['matrix', ['-1', '-0.1', '0', '0.1', '1', '10']],
      ],
    ],
  ];

  test('should parse all transform operations', () => {
    cases.forEach(testCase => {
      const [raw, result] = testCase;
      const transformations = parseTransform(raw);

      expect(transformations).toEqual(result);
    });
  });
});

describe('normalize transform', () => {
  const cases = [
    // scale
    { operations: [['scale', '1']], result: [['scale', [1, 1]]] },
    { operations: [['scale', ['1', '10']]], result: [['scale', [1, 10]]] },
    { operations: [['scaleX', '0.12']], result: [['scale', [0.12, 1]]] },
    { operations: [['scaleY', '-0.99']], result: [['scale', [1, -0.99]]] },

    // translate
    {
      operations: [['translate', ['10px', '20px']]],
      result: [['translate', [10, 20]]],
    },
    { operations: [['translateX', '10px']], result: [['translate', [10, 0]]] },
    {
      operations: [['translateY', '-100px']],
      result: [['translate', [0, -100]]],
    },

    // rotate
    { operations: [['rotate', '120']], result: [['rotate', 120]] },
    { operations: [['rotate', '10deg']], result: [['rotate', 10]] },
    {
      operations: [['rotate', '3.1416rad']],
      result: [['rotate', 180.0004209182994]],
    },

    // matrix
    {
      operations: [['matrix', ['-1', '-0.1', '0', '0.1', '1', '10']]],
      result: [['matrix', [-1, -0.1, 0, 0.1, 1, 10]]],
    },
  ];

  test('should normalize all operations and values', () => {
    for (const testCase of cases) {
      const { operations, result } = testCase;
      const normalized = normalizeTransform(operations);

      expect(normalized).toEqual(result);
    }
  });
});
