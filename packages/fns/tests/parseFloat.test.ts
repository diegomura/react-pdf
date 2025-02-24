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
});
