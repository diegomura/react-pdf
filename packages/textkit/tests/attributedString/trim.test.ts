import { describe, expect, test } from 'vitest';

import trim from '../../src/attributedString/trim';

// const runs = [{ start: 0, end  }]

describe('attributeString trim operator', () => {
  test('should remove left strips', () => {
    const string = {
      string: '  hello world',
      runs: [{ start: 0, end: 13, attributes: {} }],
    };
    const result = trim(string);

    expect(result).not.toBe(string);
    expect(result).toHaveProperty('string', 'hello world');
    expect(result.runs[0]).toHaveProperty('start', 0);
    expect(result.runs[0]).toHaveProperty('end', 11);
  });

  test('should remove right strips', () => {
    const string = {
      string: 'hello world  ',
      runs: [{ start: 0, end: 13, attributes: {} }],
    };
    const result = trim(string);

    expect(result).not.toBe(string);
    expect(result).toHaveProperty('string', 'hello world');
    expect(result.runs[0]).toHaveProperty('start', 0);
    expect(result.runs[0]).toHaveProperty('end', 11);
  });

  test('should remove both sides strips', () => {
    const string = {
      string: '  hello world  ',
      runs: [{ start: 0, end: 15, attributes: {} }],
    };
    const result = trim(string);

    expect(result).not.toBe(string);
    expect(result).toHaveProperty('string', 'hello world');
    expect(result.runs[0]).toHaveProperty('start', 0);
    expect(result.runs[0]).toHaveProperty('end', 11);
  });

  test('should not change trimmed string', () => {
    const string = {
      string: 'hello world',
      runs: [{ start: 0, end: 11, attributes: {} }],
    };
    const result = trim(string);

    expect(result).not.toBe(string);
    expect(result).toHaveProperty('string', 'hello world');
    expect(result.runs[0]).toHaveProperty('start', 0);
    expect(result.runs[0]).toHaveProperty('end', 11);
  });

  test('should trim multipe runs', () => {
    const string = {
      string: '  hello world  ',
      runs: [
        { start: 0, end: 8, attributes: {} },
        { start: 8, end: 15, attributes: {} },
      ],
    };
    const result = trim(string);

    expect(result).not.toBe(string);
    expect(result).toHaveProperty('string', 'hello world');
    expect(result.runs[0]).toHaveProperty('start', 0);
    expect(result.runs[0]).toHaveProperty('end', 6);
    expect(result.runs[1]).toHaveProperty('start', 6);
    expect(result.runs[1]).toHaveProperty('end', 11);
  });
});
