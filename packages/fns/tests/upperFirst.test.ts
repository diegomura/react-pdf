import { describe, expect, test } from 'vitest';

import upperFirst from '../src/upperFirst';

describe('upperFirst', () => {
  test('should return undefined for undefined', () => {
    expect(upperFirst(undefined)).toBe(undefined);
  });

  test('should return null for null', () => {
    expect(upperFirst(null)).toBe(null);
  });

  test('should return empty string when empty string', () => {
    expect(upperFirst('')).toBe('');
  });

  test('should return string with first char upperFirstd', () => {
    expect(upperFirst('reactpdf')).toBe('Reactpdf');
  });

  test('should keep already capitalized strings unchanged', () => {
    expect(upperFirst('Reactpdf')).toBe('Reactpdf');
  });

  test('should only capitalize first character', () => {
    expect(upperFirst('HELLO')).toBe('HELLO');
    expect(upperFirst('hELLO')).toBe('HELLO');
  });

  test('should handle single character strings', () => {
    expect(upperFirst('a')).toBe('A');
    expect(upperFirst('A')).toBe('A');
  });

  test('should handle strings starting with numbers', () => {
    expect(upperFirst('123abc')).toBe('123abc');
  });

  test('should handle strings with spaces', () => {
    expect(upperFirst('hello world')).toBe('Hello world');
  });
});
