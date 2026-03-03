import { describe, expect, test } from 'vitest';

import runAt from '../../src/attributedString/runAt';
import empty from '../../src/attributedString/empty';

const string = {
  string: 'hello world',
  runs: [
    { start: 0, end: 6, attributes: {} }, // 'hello '
    { start: 6, end: 12, attributes: {} }, // 'world'
  ],
};

const singleRunString = {
  string: 'hello',
  runs: [{ start: 0, end: 5, attributes: {} }],
};

const multiRunString = {
  string: 'hello world foo',
  runs: [
    { start: 0, end: 6, attributes: {} }, // 'hello '
    { start: 6, end: 12, attributes: {} }, // 'world '
    { start: 12, end: 15, attributes: {} }, // 'foo'
  ],
};

describe('attributeString runAt operator', () => {
  test('should get index at start of first run', () => {
    const result = runAt(0, string);
    expect(result).toBe(string.runs[0]);
  });

  test('should get index at end of first run', () => {
    const result = runAt(5, string);
    expect(result).toBe(string.runs[0]);
  });

  test('should get index at start of last run', () => {
    const result = runAt(6, string);
    expect(result).toBe(string.runs[1]);
  });

  test('should get index at end of last run', () => {
    const result = runAt(11, string);
    expect(result).toBe(string.runs[1]);
  });

  test('should get -1 at invalid index', () => {
    const result = runAt(12, string);
    expect(result).toBeFalsy();
  });

  test('should return undefined for empty string', () => {
    const result = runAt(0, empty());
    expect(result).toBeUndefined();
  });

  test('should return undefined for negative index', () => {
    const result = runAt(-1, string);
    expect(result).toBeUndefined();
  });

  test('should get run for single run string', () => {
    const result = runAt(2, singleRunString);
    expect(result).toBe(singleRunString.runs[0]);
  });

  test('should get middle run in multi-run string', () => {
    const result = runAt(8, multiRunString);
    expect(result).toBe(multiRunString.runs[1]);
  });

  test('should get last run in multi-run string', () => {
    const result = runAt(13, multiRunString);
    expect(result).toBe(multiRunString.runs[2]);
  });

  test('should get run at middle of first run', () => {
    const result = runAt(3, string);
    expect(result).toBe(string.runs[0]);
  });
});
