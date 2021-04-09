import resolve from '../../src/indices/resolve';

describe('indices resolve operator', () => {
  test('should return empty array from empty array', () => {
    const result = resolve('', []);
    expect(result).toEqual([]);
  });

  test('should return same indices from simple chars', () => {
    const result = resolve('lorem', [0, 1, 2, 3, 4]);
    expect(result).toEqual([0, 1, 2, 3, 4]);
  });

  test('should return correct glyph indices when starting with ligature', () => {
    const result = resolve('firem', [0, 2, 3, 4]);
    expect(result).toEqual([0, 0, 1, 2, 3]);
  });

  test('should return correct glyph indices when contain ligature', () => {
    const result = resolve('lofim', [0, 1, 2, 4]);
    expect(result).toEqual([0, 1, 2, 2, 3]);
  });

  test('should return correct glyph indices when ending in ligature', () => {
    const result = resolve('lorfi', [0, 1, 2, 3]);
    expect(result).toEqual([0, 1, 2, 3, 3]);
  });

  test('should return correct glyph indices when starting with long ligature', () => {
    const result = resolve('ffirem', [0, 3, 4, 5]);
    expect(result).toEqual([0, 0, 0, 1, 2, 3]);
  });

  test('should return correct glyph indices when contain long ligature', () => {
    const result = resolve('loffim', [0, 1, 2, 5]);
    expect(result).toEqual([0, 1, 2, 2, 2, 3]);
  });

  test('should return correct glyph indices when ending in long ligature', () => {
    const result = resolve('lorffi', [0, 1, 2, 3]);
    expect(result).toEqual([0, 1, 2, 3, 3, 3]);
  });

  test('should fill undefined index at start', () => {
    const result = resolve('lorem', [undefined, 0, 1, 2, 3]);
    expect(result).toEqual([0, 1, 2, 3, 4]);
  });

  test('should fill undefined index at middle', () => {
    const result = resolve('lorem', [0, 1, undefined, 3, 4]);
    expect(result).toEqual([0, 1, 2, 3, 4]);
  });

  test('should fill undefined index at end', () => {
    const result = resolve('lorem', [0, 1, 2, 3, undefined]);
    expect(result).toEqual([0, 1, 2, 3, 4]);
  });
});
