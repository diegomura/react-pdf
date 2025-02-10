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
});
