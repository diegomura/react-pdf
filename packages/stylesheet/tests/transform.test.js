/* eslint-disable no-restricted-syntax */
import { parseTransform, normalizeTransformOperation } from '../src/transform';

describe('parse transform', () => {
  const cases = [
    // scale
    ['scale(1)', [{ operation: 'scale', value: ['1'] }]],
    ['scale(3, 2)', [{ operation: 'scale', value: ['3', '2'] }]],
    ['scale(0.1, -10)', [{ operation: 'scale', value: ['0.1', '-10'] }]],
    ['scale(10, 0.9)', [{ operation: 'scale', value: ['10', '0.9'] }]],
    ['scaleX(10)', [{ operation: 'scaleX', value: ['10'] }]],
    ['scaleY(-0.9)', [{ operation: 'scaleY', value: ['-0.9'] }]],

    // translate
    [
      'translate(10px, 20px)',
      [{ operation: 'translate', value: ['10px', '20px'] }],
    ],
    [
      'translate(110px, -0.29px)',
      [{ operation: 'translate', value: ['110px', '-0.29px'] }],
    ],
    ['translateX(10px)', [{ operation: 'translateX', value: ['10px'] }]],
    ['translateY(-10px)', [{ operation: 'translateY', value: ['-10px'] }]],

    // rotate
    ['rotate(120)', [{ operation: 'rotate', value: ['120'] }]],
    ['rotate(2deg)', [{ operation: 'rotate', value: ['2deg'] }]],
    ['rotate(0.1)', [{ operation: 'rotate', value: ['0.1'] }]],
    ['rotate(-10deg)', [{ operation: 'rotate', value: ['-10deg'] }]],

    // matrix
    [
      'matrix(-1, -0.1, 0, 0.1, 1, 10)',
      [{ operation: 'matrix', value: ['-1', '-0.1', '0', '0.1', '1', '10'] }],
    ],

    // combined
    [
      'translate(10px, 20px) scale(0.1, -10) matrix(-1, -0.1, 0, 0.1, 1, 10)',
      [
        { operation: 'translate', value: ['10px', '20px'] },
        { operation: 'scale', value: ['0.1', '-10'] },
        { operation: 'matrix', value: ['-1', '-0.1', '0', '0.1', '1', '10'] },
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
    [
      { operation: 'scale', value: ['1'] },
      { operation: 'scale', value: [1, 1] },
    ],
    [
      { operation: 'scale', value: ['1', '10'] },
      { operation: 'scale', value: [1, 10] },
    ],
    [
      { operation: 'scaleX', value: ['0.12'] },
      { operation: 'scale', value: [0.12, 1] },
    ],
    [
      { operation: 'scaleY', value: ['-0.99'] },
      { operation: 'scale', value: [1, -0.99] },
    ],

    // translate
    [
      { operation: 'translate', value: ['10px', '20px'] },
      { operation: 'translate', value: [10, 20] },
    ],
    [
      { operation: 'translateX', value: ['10px'] },
      { operation: 'translate', value: [10, 0] },
    ],
    [
      { operation: 'translateY', value: ['-100px'] },
      { operation: 'translate', value: [0, -100] },
    ],

    // rotate
    [
      { operation: 'rotate', value: ['120'] },
      { operation: 'rotate', value: [120] },
    ],
    [
      { operation: 'rotate', value: ['10deg'] },
      { operation: 'rotate', value: [10] },
    ],
    [
      { operation: 'rotate', value: ['3.1416rad'] },
      { operation: 'rotate', value: [180.0004209182994] },
    ],

    // matrix
    [
      { operation: 'matrix', value: ['-1', '-0.1', '0', '0.1', '1', '10'] },
      { operation: 'matrix', value: [-1, -0.1, 0, 0.1, 1, 10] },
    ],
  ];

  test('should normalize all operations and values', () => {
    for (const [operation, result] of cases) {
      const normalized = normalizeTransformOperation(operation);

      expect(normalized).toEqual(result);
    }
  });
});
