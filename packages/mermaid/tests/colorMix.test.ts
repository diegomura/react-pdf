import { describe, expect, test } from 'vitest';
import { colorMix } from '../src/colorMix';

describe('colorMix', () => {
  test('100% first color returns first color', () => {
    expect(colorMix('#ff0000', 100, '#0000ff')).toBe('#ff0000');
  });

  test('0% first color returns second color', () => {
    expect(colorMix('#ff0000', 0, '#0000ff')).toBe('#0000ff');
  });

  test('50% mix of black and white returns gray', () => {
    expect(colorMix('#000000', 50, '#ffffff')).toBe('#808080');
  });

  test('handles 3-digit hex colors', () => {
    expect(colorMix('#f00', 100, '#00f')).toBe('#ff0000');
  });

  test('mixes red and blue at 50%', () => {
    const result = colorMix('#ff0000', 50, '#0000ff');
    expect(result).toBe('#800080');
  });

  test('3% black in white produces very light gray', () => {
    const result = colorMix('#000000', 3, '#ffffff');
    // 3% of 0 + 97% of 255 ≈ 247
    expect(result).toBe('#f7f7f7');
  });
});
