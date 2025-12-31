import { describe, expect, test } from 'vitest';

import runIndexAt from '../../src/attributedString/runIndexAt';
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

describe('attributeString runIndexAt operator', () => {
  test('should get index at start of first run', () => {
    const result = runIndexAt(0, string);
    expect(result).toBe(0);
  });

  test('should get index at end of first run', () => {
    const result = runIndexAt(5, string);
    expect(result).toBe(0);
  });

  test('should get index at start of last run', () => {
    const result = runIndexAt(6, string);
    expect(result).toBe(1);
  });

  test('should get index at end of last run', () => {
    const result = runIndexAt(11, string);
    expect(result).toBe(1);
  });

  test('should get -1 at invalid index', () => {
    const result = runIndexAt(12, string);
    expect(result).toBe(-1);
  });

  test('should return -1 for empty string', () => {
    const result = runIndexAt(0, empty());
    expect(result).toBe(-1);
  });

  test('should return -1 for negative index', () => {
    const result = runIndexAt(-1, string);
    expect(result).toBe(-1);
  });

  test('should get index for single run string', () => {
    const result = runIndexAt(2, singleRunString);
    expect(result).toBe(0);
  });

  test('should get middle run index in multi-run string', () => {
    const result = runIndexAt(8, multiRunString);
    expect(result).toBe(1);
  });

  test('should get last run index in multi-run string', () => {
    const result = runIndexAt(13, multiRunString);
    expect(result).toBe(2);
  });

  test('should get run index at middle of first run', () => {
    const result = runIndexAt(3, string);
    expect(result).toBe(0);
  });
});
