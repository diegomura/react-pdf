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
});
