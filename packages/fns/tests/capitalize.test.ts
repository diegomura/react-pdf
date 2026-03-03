import { describe, expect, test } from 'vitest';

import capitalize from '../src/capitalize';

describe('capitalize', () => {
  test('should return undefined for undefined', () => {
    expect(capitalize(undefined)).toBe(undefined);
  });

  test('should return null for null', () => {
    expect(capitalize(null)).toBe(null);
  });

  test('should return empty string when empty string', () => {
    expect(capitalize('')).toBe('');
  });

  test('should return single word string capitalized', () => {
    expect(capitalize('reactpdf')).toBe('Reactpdf');
  });

  test('should return multiple word string capitalized', () => {
    expect(capitalize('lorem ipsum')).toBe('Lorem Ipsum');
  });

  test('should handle multiple spaces between words', () => {
    expect(capitalize('lorem   ipsum')).toBe('Lorem   Ipsum');
  });

  test('should handle leading whitespace', () => {
    expect(capitalize(' hello world')).toBe(' Hello World');
  });

  test('should handle trailing whitespace', () => {
    expect(capitalize('hello world ')).toBe('Hello World ');
  });

  test('should handle tabs as word separators', () => {
    expect(capitalize('hello\tworld')).toBe('Hello\tWorld');
  });

  test('should handle already capitalized string', () => {
    expect(capitalize('Hello World')).toBe('Hello World');
  });

  test('should capitalize single character', () => {
    expect(capitalize('a')).toBe('A');
  });

  test('should handle newlines as word separators', () => {
    expect(capitalize('hello\nworld')).toBe('Hello\nWorld');
  });
});
