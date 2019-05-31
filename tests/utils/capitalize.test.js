import capitalize from '../../src/utils/capitalize';

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

  test('should return string with first char capitalized', () => {
    expect(capitalize('reactpdf')).toBe('Reactpdf');
  });
});
