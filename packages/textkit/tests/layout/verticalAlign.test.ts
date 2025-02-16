import { describe, expect, test } from 'vitest';

import verticalAlignment from '../../src/layout/verticalAlign';

describe('verticalAlign', () => {
  test('should apply vertical alignment "super" to string', () => {
    const instance = verticalAlignment();
    const text = {
      string: 'Lorem',
      runs: [
        {
          start: 0,
          end: 5,
          attributes: { fontSize: 12, color: 'red', verticalAlign: 'super' },
        },
      ],
    };

    const result = instance(text);

    expect(result.runs[0].attributes).toHaveProperty('yOffset', 0.4);
  });
  test('should apply vertical alignment "sub" to string', () => {
    const instance = verticalAlignment();
    const text = {
      string: 'Lorem',
      runs: [
        {
          start: 0,
          end: 5,
          attributes: { fontSize: 12, color: 'red', verticalAlign: 'sub' },
        },
      ],
    };

    const result = instance(text);

    expect(result.runs[0].attributes).toHaveProperty('yOffset', -0.2);
  });

  test('should ignore vertical alignment value if it is not "sub" or "super"', () => {
    const instance = verticalAlignment();
    const text = {
      string: 'Lorem',
      runs: [
        {
          start: 0,
          end: 5,
          attributes: { fontSize: 12, color: 'red', verticalAlign: 'center' },
        },
      ],
    };

    const result = instance(text);

    expect(result.runs[0].attributes).not.toHaveProperty('yOffset');
  });
});
