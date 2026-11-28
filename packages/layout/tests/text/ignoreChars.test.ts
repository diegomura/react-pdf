import { describe, expect, test } from 'vitest';

import type { Font, Fragment } from '@react-pdf/textkit';

import ignoreChars from '../../src/text/ignoreChars';

const fontWithout = (codePoints: number[] = []): Font =>
  ({
    hasGlyphForCodePoint: (codePoint: number) => codePoints.includes(codePoint),
  }) as unknown as Font;

const fragment = (string: string, font: Font): Fragment =>
  ({ string, attributes: { font: [font] } }) as unknown as Fragment;

const run = (string: string, font: Font = fontWithout()): string =>
  ignoreChars([fragment(string, font)])[0].string;

describe('layout text ignoreChars', () => {
  test('strips bidi controls the font cannot render (LRE, PDF, RLM)', () => {
    expect(run('\u202aExample Name\u202c\u200f')).toBe('Example Name');
  });

  test('strips zero-width, word joiner, isolates and BOM', () => {
    expect(run('\uFEFF\u200bA\u200cB\u2060C\u2066D\u2069')).toBe('ABCD');
  });

  test('keeps the previously handled separators and word joiner', () => {
    expect(run('a\u2028b\u2029c\u2060d')).toBe('abcd');
  });

  test('leaves ordinary and accented text untouched', () => {
    expect(run('Æblegård Müller 日本語')).toBe('Æblegård Müller 日本語');
  });

  test('keeps a default-ignorable code point when the font provides a glyph', () => {
    // 0x2060 WORD JOINER present in the font -> not stripped.
    expect(run('a\u2060b', fontWithout([0x2060]))).toBe('a\u2060b');
  });

  test('returns the fragment unchanged when nothing is ignorable', () => {
    const font = fontWithout();
    const input = [fragment('plain', font)];
    expect(ignoreChars(input)[0]).toBe(input[0]);
  });
});
