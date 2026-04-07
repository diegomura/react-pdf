import { describe, expect, test } from 'vitest';

import parseFloat from '../src/parseFloat';

describe('parseFloat', () => {
  test('should return undefined for undefined', () => {
    expect(parseFloat(undefined!)).toBe(undefined);
  });

  test('should return null for null', () => {
    expect(parseFloat(null!)).toBe(null);
  });

  test('should parse integer', () => {
    expect(parseFloat(10)).toBe(10);
  });

  test('should parse float', () => {
    expect(parseFloat(10.1)).toBe(10.1);
  });

  test('should parse string integer', () => {
    expect(parseFloat('10')).toBe(10);
  });

  test('should parse string float', () => {
    expect(parseFloat('10.1')).toBe(10.1);
  });

  test('should parse negative numbers', () => {
    expect(parseFloat(-5)).toBe(-5);
    expect(parseFloat('-5.5')).toBe(-5.5);
  });

  test('should parse zero', () => {
    expect(parseFloat(0)).toBe(0);
    expect(parseFloat('0')).toBe(0);
  });

  test('should return NaN for invalid strings', () => {
    expect(parseFloat('abc')).toBeNaN();
    expect(parseFloat('')).toBeNaN();
  });

  test('should parse numbers from strings with trailing characters', () => {
    expect(parseFloat('10px')).toBe(10);
    expect(parseFloat('3.14rem')).toBe(3.14);
  });

  test('should parse strings with leading whitespace', () => {
    expect(parseFloat('  42')).toBe(42);
  });
});
