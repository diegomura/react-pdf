import { describe, expect, test } from 'vitest';

import empty from '../../src/attributedString/empty';
import trim from '../../src/attributedString/trim';

describe('attributeString trim operator', () => {
  test('should handle empty string', () => {
    const result = trim(empty());

    expect(result).toHaveProperty('string', '');
    expect(result.runs).toHaveLength(0);
  });

  test('should handle whitespace only string', () => {
    const string = {
      string: '   ',
      runs: [{ start: 0, end: 3, attributes: {} }],
    };
    const result = trim(string);

    expect(result).toHaveProperty('string', '');
    expect(result.runs).toHaveLength(0);
  });

  test('should trim tab characters', () => {
    const string = {
      string: '\t\thello world\t\t',
      runs: [{ start: 0, end: 15, attributes: {} }],
    };
    const result = trim(string);

    expect(result).toHaveProperty('string', 'hello world');
    expect(result.runs[0]).toHaveProperty('start', 0);
    expect(result.runs[0]).toHaveProperty('end', 11);
  });

  test('should trim newline characters', () => {
    const string = {
      string: '\n\nhello world\n\n',
      runs: [{ start: 0, end: 15, attributes: {} }],
    };
    const result = trim(string);

    expect(result).toHaveProperty('string', 'hello world');
    expect(result.runs[0]).toHaveProperty('start', 0);
    expect(result.runs[0]).toHaveProperty('end', 11);
  });

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
