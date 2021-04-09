import font from '../internal/font';
import getFont from '../../src/run/getFont';

describe('run getFont glyph operator', () => {
  test('should return null if run does not have attributes', () => {
    const run = { start: 0, end: 5 };
    expect(getFont(run)).toBeNull();
  });

  test('should return null if run does not have font', () => {
    const run = { start: 0, end: 5, attributes: {} };
    expect(getFont(run)).toBeNull();
  });

  test('should return font when present', () => {
    const run = { start: 0, end: 5, attributes: { font } };
    expect(getFont(run)).toBe(font);
  });
});
