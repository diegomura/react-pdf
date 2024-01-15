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
});
