import { describe, expect, test } from 'vitest';

import parseColor from '../../src/utils/parseColor';

describe('parse color util', () => {
  test(`should parse regular hex color`, () => {
    const color = parseColor('#FF00FF');
    expect(color.value).toBe('#FF00FF');
  });

  test(`should parse opacity as 1 if not provided`, () => {
    const color = parseColor('#FF00FF');
    expect(color.opacity).toBe(1);
  });

  test(`should parse opacity as 1 when provided`, () => {
    const color = parseColor('#FF00FFFF');
    expect(color.opacity).toBe(1);
  });

  test(`should parse opacity as 0 when provided`, () => {
    const color = parseColor('#FF00FF00');
    expect(color.opacity).toBe(0);
  });

  test(`should parse opacit provided`, () => {
    const color = parseColor('#FF00FF54');
    expect(color.opacity).toBe(0.32941176470588235);
  });

  test('should parse HSL color', () => {
    const color = parseColor('hsl(0, 100%, 50%)');
    expect(color.value).toBe('#FF0000');
    expect(color.opacity).toBe(1);
  });

  test('should parse HSLA color', () => {
    const color = parseColor('hsla(120, 100%, 50%, 0.6)');
    expect(color.value).toBe('#00FF00');
    expect(color.opacity).toBe(0.6);
  });

  test('should parse HWB color', () => {
    const color = parseColor('hwb(60, 3%, 60%)');
    expect(color.value).toBe('#666608');
    expect(color.opacity).toBe(1);
  });
});
